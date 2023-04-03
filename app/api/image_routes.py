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
    img=BusinessImage.query.get(id)
    db.session.delete(img)
    db.session.commit()
    return {"message":"successfully deleted"}


@image_routes.route('/business/<int:id>', methods=["PUT"])
@login_required
def update_business_image(id):
    img = BusinessImage.query.get(id)

    if not img:
        return jsonify({
            "message": "Business image couldn't be found",
            "statusCode": 404
        }), 404
    business= Business.query.get(img.business_id)
    if business.owner_id == current_user.id:
        req = request.json

        if req.get('url'):
            if (req.get('url').split('.')[-1]) in ALLOWWED_FORMATS:
                img.url=req.get('url')
            else:
                return jsonify({
                    "message": "Image format not supported",
                    "statusCode": 404
                }), 404
        if req.get('preview'):
            curpreviewimg=BusinessImage.query.filter_by(business_id=business.id, preview=True).first()
            curpreviewimg.preview=False
            #print("bxxbn∆bn∆bn∆xbn", ct)
            img.preview=True

        db.session.commit()
        return jsonify(img.to_dict()), 200

# @image_routes.route('/test',methods=['POST'])
# def some():

#     json_data=request.json
#     test =json_data.get('test')
#     print('disdichdihcdichdichdichj',test)
#     return test

@image_routes.route('/reviews/<int:id>', methods=["DELETE"])
@login_required
def delete_review_image(id):
    img = ReviewImage.query.get(id)
    db.session.delete(img)
    db.session.commit()
    return { "message": "successfully deleted" }


@image_routes.route('/reviews/<int:id>', methods=["PUT"])
@login_required
def update_review_image(id):
    img = ReviewImage.query.get(id)

    if not img:
        return jsonify({
            "message": "Review image couldn't be found",
            "statusCode": 404
        }), 404

    review = Review.query.get(img.review_id)
    if review.user_id == current_user.id:
        req = request.json

        if req.get('url'):
            if (req.get('url').split('.')[-1]) in ALLOWWED_FORMATS:
                img.url = req.get('url')
            else:
                return jsonify({
                    "message": "Image format not supported",
                    "statusCode": 404
                }), 404

        db.session.commit()
        return jsonify((img.to_dict())), 200
