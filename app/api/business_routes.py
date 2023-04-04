from flask import Blueprint, jsonify, request, redirect
from app.models import Business, BusinessImage, User, Category, Review, db
from ..forms.review_form import ReviewForm
from ..forms.new_business_form import BusinessForm
from flask_login import login_required, current_user
from sqlalchemy import func

business_routes = Blueprint('businesses', __name__)

# Middleware verifies if business exists
def business_exists_middleware(view_func):
    def nested_func(id):
        if Business.query.get(id) is None:
            return jsonify({
                'message': 'Business not found',
                'statusCode': 404
            }), 404
        return view_func(id=id)
    return nested_func


@business_routes.route('')
def businesses():
    """
    Query for all businesses and return them in a list of business dictionaries.

    Query parameters:
    - city: filter businesses by city name
    - name: filter businesses by name
    - category: filter businesses by category (comma-separated list of category names)

    Returns:
    - JSON response containing a list of business dictionaries
    """
    # Start with a query that joins the Business and BusinessImage tables
    query = Business.query.join(BusinessImage)

    # Get query parameters from the request URL
    city = request.args.get('city')
    name = request.args.get('name')
    categories = request.args.getlist('category')

    # Add filters to the query based on the query parameters
    if city:
        query = query.filter(Business.city == city)
    if name:
        query = query.filter(Business.name == name)
    if categories:
        # Parse the comma-separated category names and get corresponding Category objects
        category_queries = [Category.query.filter_by(category_name=c).first() for c in categories if c]

        # Use the any() function to generate a single filter that checks if any of the categories are in the Business's categories relationship
        query = query.filter(Business.categories.any(Category.id.in_([c.id for c in category_queries])))

    # Execute the query and get a list of Business objects
    businesses = query.all()

    # Convert each Business object to a dictionary and append it to a list of business dictionaries
    business_dicts = [biz.to_dict() for biz in businesses]

    # Return a JSON response containing the list of business dictionaries
    return jsonify({'businesses': business_dicts})


@business_routes.route('', methods=["POST"])
def create_new_business():
    # create a form object
    form = BusinessForm()
    # add csrf token to form
    form["csrf_token"].data = request.cookies["csrf_token"]
    # check if form data is valid
    if form.validate_on_submit():
        # create a new Business object with form data
        business = Business(
            name=form.name.data,
            description=form.description.data,
            features=form.features.data,
            address=form.address.data,
            city=form.city.data,
            state=form.state.data,
            lng=form.lng.data,
            lat=form.lat.data,
            owner_id=current_user.id,
            price=form.price.data
        )
        # get the categories from form data and add them to the Business object
        categories = form.categories.data.split(",")
        for cat in categories:
            if cat:
                business.categories.append(Category.query.get(int(cat)))

        # add Business object to session and flush to get id value before committing
        db.session.add(business)
        db.session.flush()

        # create BusinessImage objects from form data and add them to session
        imagesList = []
        for i in range(1, 6):
            image_field = getattr(form, f"image{i}").data
            if image_field:
                image = BusinessImage(url=image_field, preview=i == 1, business_id = business.id)
                imagesList.append(image)
        db.session.add_all(imagesList)

        # commit session and return JSON response with new Business object data
        db.session.commit()
        return jsonify(business.to_dict())

    # return JSON response with errors if form data is invalid
    return jsonify({'errors': form.errors})



@business_routes.route('/<int:id>')
def single_business(id):
    # Query the Business object with the given id
    res = db.session.query(Business).filter_by(id=id).first()
    # Convert the Business object to a dictionary
    business = res.to_dict()
    # Get a list of all images associated with the Business and add them to the dictionary
    business['images'] = [img.to_dict() for img in db.session.query(
        BusinessImage).filter_by(business_id=id).all()]
    # Get a list of all categories associated with the Business and add them to the dictionary
    business['categories'] = [category.to_dict() for category in res.categories]
    # Get a list of all reviews associated with the Business, add information about the users who wrote the reviews,
    # and add them to the dictionary
    reviews = [rev.to_dict() for rev in res.reviews]
    for rev in reviews:
        # Get information about the user who wrote the review
        user = User.query.get(rev['user_id']).to_dict()
        # Get the number of reviews that the user has written and add it to the user dictionary
        user['numReviews'] = db.session.query(func.count(Review.id)).filter(Review.user_id == user['id']).scalar()
        # Add the user dictionary to the review dictionary
        rev["user"] = user
    # Add the list of reviews to the Business dictionary
    business['reviews'] = reviews

    # Return the Business dictionary as a JSON response
    return jsonify(business)


#Edit business of current user

@business_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_business(id):
    # get the business with the specified id
    business = Business.query.get(id)

    # check if the business exists
    if not business:
        return jsonify({'message': 'Business not found'}), 404

    # check if the user is the owner of the business
    if business.owner_id == current_user.id:
        # get the updated data from the request
        business_data=request.get_json()

        # update the business attributes with the new data
        business.name = business_data.get('name', business.name)
        business.description = business_data.get('description', business.description)
        business.features = business_data.get('features', business.features)
        business.address = business_data.get('address', business.address)
        business.city = business_data.get('city', business.city)
        business.state = business_data.get('state', business.state)
        business.lng = business_data.get('lng', business.lng)
        business.lat = business_data.get('lat', business.lat)
        business.price = business_data.get('price', business.price)

        # save the changes to the database
        db.session.commit()

        # return the updated business data
        return jsonify(business.to_dict()), 200
    else:
        # return an error message if the user is not the owner of the business
        return {"message":'forbidden'}



@business_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
@business_exists_middleware
def create_review(id):
    # Instantiate a new ReviewForm object
    form = ReviewForm()

    # Check if there is already a review from the current user for the business
    reviews = Review.query.filter_by(user_id=current_user.id, business_id=id).all()
    if reviews:
        return jsonify({
            "message": "User already has a review for this business",
            "statusCode": 403
        }), 403

    # Set the form's CSRF token from the request's cookies
    form["csrf_token"].data = request.cookies["csrf_token"]

    # Validate the form data
    if form.validate_on_submit():
        # Create a new Review object using the form data and current user's ID
        created_review = Review(
            review=form.review.data,
            stars=form.stars.data,
            user_id=current_user.id,
            business_id=id
        )
        # Add the new review to the database
        db.session.add(created_review)
        db.session.commit()

        # Return the created review as a dictionary
        return created_review.to_dict()

    # If form validation fails, return an error message
    return jsonify({'message': 'Validation failed'})



@business_routes.route('/<int:id>/reviews')
def business_reviews(id):
    # Check if the business exists
    business = Business.query.filter_by(id=id).first()
    if not business:
        return jsonify({
            "message": "Business not found",
            "statusCode": 404
        }), 404

    # Get all reviews for the business
    reviews = Review.query.filter_by(business_id=id).all()

    # Return a list of review dictionaries
    return jsonify([rev.to_dict() for rev in reviews])



@business_routes.route("/<int:id>/images", methods=["POST"])
def post_business_image(id):
    # Parse the JSON data from the request body
    json_data = request.json
    # Create a new BusinessImage object with the parsed data and the given business_id
    business_image = BusinessImage(
        business_id=id,
        url=json_data.get('url'),
        preview=json_data.get('preview')
    )
    # Add the new BusinessImage to the session and commit the transaction to the database
    db.session.add(business_image)
    db.session.commit()
    # Return the newly created BusinessImage as a JSON response
    return jsonify(business_image.to_dict())



#DELETE BUSINESS

@business_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_business(id):
    # Get the business by its ID
    business = Business.query.get(id)

    # Check if the user is the owner of the business
    if business.owner_id == current_user.id:
        # Delete the business from the database
        db.session.delete(business)
        db.session.commit()
        # Return a success message
        return {"message": "successfully deleted"}
    else:
        # Return a 403 Forbidden error if the user is not the owner of the business
        return {'message': 'forbidden'}





@business_routes.route('/test')
def tester():
    img=BusinessImage(
        business_id=6,
        url="siisih.jpg",
        preview=True
    )
    db.session.add(img)
    db.session.commit()
    return "Hello"
