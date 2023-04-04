from flask import Blueprint, jsonify, request, redirect
from app.models import Review, ReviewImage, db
from flask_login import login_required, current_user
from sqlalchemy import func

review_routes = Blueprint('reviews', __name__)

# Delete review route
@review_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_review(id):
    # Get the review by its ID
    review = Review.query.get(id)

    # Error handler: Review not found
    if not review:
        return jsonify({
            "message": "Review couldn't be found",
            "statusCode": 404
        }), 404

    # Check if the current user is the owner of the review
    if review.user_id == current_user.id:
        db.session.delete(review)
        db.session.commit()

        # Return a successful response
        return jsonify({
            "message": "Successfully deleted",
            "statusCode": 200
        }), 200

    # Error handler: User is not authorized to delete the review
    else:
        return jsonify({'message':'forbidden'}), 403



# Edit Review Route
@review_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_review(id):
    # Get the review with the given id
    review = Review.query.get(id)
    if not review:
        # Error handler: Review could not be found
        return jsonify({
            "message": "Review couldn't be found",
            "statusCode": 404
        }), 404

    # Check if the current user is the owner of the review
    if review.user_id==current_user.id:
        # Get the updated review data from the request body
        req = request.json

        # Update the stars if provided and within the valid range of 1-5
        if req.get('stars') or req.get('stars') == 0:
            if int(req.get('stars')) in range(1,6):
                review.stars = req.get('stars')
            else:
                # Error handler: Invalid stars value
                return jsonify({
                    "message": "Stars must be between 1-5",
                    "statusCode": 404
                })

        # Update the review text if provided and not empty
        if req.get('review'):
            if len(req.get('review')):
                review.review = req.get('review')
            else:
                # Error handler: Empty review text
                return jsonify({
                    "message": "Review must have text!",
                    "statusCode": 404
                })

        # Commit the changes to the database and return the updated review
        db.session.commit()
        return jsonify(review.to_dict()), 200

@review_routes.route('')
def reviews():
    return jsonify({review.to_dict()["id"]: review.to_dict() for review in Review.query.all()})

# Add image to review route
@review_routes.route('/<int:id>/images', methods=['POST'])
@login_required
def post_review_image(id):
    # get the review associated with the image
    review = Review.query.get(id)
    if not review:
        return jsonify(({
            "message": "Review couldn't be found",
            "statusCode": 404
        })), 404

    # check if the review belongs to the current user
    if not current_user.id == review.user_id:
        return jsonify({
            "message": "Review must belong to the current user",
            "statusCode": 403
        }), 403

    # check if the maximum number of images for this review was reached
    if len(ReviewImage.query.filter_by(review_id=id)) >= 3:
        return jsonify({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        }), 403

    # create the image and add it to the database
    json_data = request.json
    img = ReviewImage(review_id=json_data.get('review_id'), url=json_data.get('url'))
    db.session.add(img)
    db.session.commit()

    # return the image information
    return jsonify({
        "id": img['id'],
        "url": img['url']
    }), 200
