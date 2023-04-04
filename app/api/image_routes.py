from flask import Blueprint, jsonify, request, redirect
from app.models import Business, BusinessImage, User, Category, Review, ReviewImage, db
from ..forms.review_form import ReviewForm
from ..forms.new_business_form import BusinessForm
from flask_login import login_required, current_user
from sqlalchemy import func

ALLOWWED_FORMATS=['jpeg','jpg','png']
image_routes = Blueprint('images', __name__)

@image_routes.route('/business/<int:id>', methods=["DELETE"])
@login_required
def delete_image(id):
    # Find the image with the provided id and delete it from the database
    image = BusinessImage.query.get(id)
    db.session.delete(image)
    db.session.commit()

    # Return a success message
    return {"message": "Successfully deleted image"}



@image_routes.route('/business/<int:id>', methods=["PUT"])
@login_required
def update_business_image(id):
    # get the image object by id
    img = BusinessImage.query.get(id)

    # check if the image exists
    if not img:
        return jsonify({
            "message": "Business image couldn't be found",
            "statusCode": 404
        }), 404

    # check if the business belongs to the current user
    business = Business.query.get(img.business_id)
    if business.owner_id == current_user.id:
        req = request.json

        # update the url of the image
        if req.get('url'):
            if (req.get('url').split('.')[-1]) in ALLOWWED_FORMATS:
                img.url=req.get('url')
            else:
                return jsonify({
                    "message": "Image format not supported",
                    "statusCode": 404
                }), 404

        # update the preview status of the image
        if req.get('preview'):
            curpreviewimg=BusinessImage.query.filter_by(business_id=business.id, preview=True).first()
            curpreviewimg.preview=False
            img.preview=True

        db.session.commit()
        return jsonify(img.to_dict()), 200




@image_routes.route('/reviews/<int:id>', methods=["DELETE"])
@login_required
def delete_review_image(id):
    # Get the review image by id
    img = ReviewImage.query.get(id)

    # Delete the image from the database
    db.session.delete(img)
    db.session.commit()

    # Return a successful response
    return { "message": "successfully deleted" }


@image_routes.route('/reviews/<int:id>', methods=["PUT"])
@login_required
def update_review_image(id):
    # Get the review image by id
    img = ReviewImage.query.get(id)

    # Return an error response if the review image is not found
    if not img:
        return jsonify({
            "message": "Review image couldn't be found",
            "statusCode": 404
        }), 404

    # Get the review object for the review image
    review = Review.query.get(img.review_id)

    # Check if the current user is the owner of the review
    if review.user_id == current_user.id:
        # Get the updated image URL from the request data
        req = request.json
        if req.get('url'):
            # Check if the updated image URL is in an allowed format
            if (req.get('url').split('.')[-1]) in ALLOWWED_FORMATS:
                # Update the image URL in the database
                img.url = req.get('url')
            else:
                # Return an error response if the image format is not supported
                return jsonify({
                    "message": "Image format not supported",
                    "statusCode": 404
                }), 404

        # Commit the changes to the database
        db.session.commit()
        # Return a successful response
        return jsonify((img.to_dict())), 200
