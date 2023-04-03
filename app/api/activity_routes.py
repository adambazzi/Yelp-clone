from flask import Blueprint, jsonify, request, redirect
from app.models import Business, BusinessImage, ReviewImage, User, Category, Review, db
from flask_login import login_required, current_user
from sqlalchemy import func

activity_routes = Blueprint('activites', __name__)

@activity_routes.get('/recent')
def recent_activity():

    #Getting 10 most recent business
    businesses = Business.query.order_by(Business.created_at.desc()).limit(10).all()
    business_dict = []
    for biz in businesses:
        dic = biz.to_dict()
        bizImg = BusinessImage.query.filter_by(business_id=dic['id'], preview=True).first()
        bizImg = bizImg.to_dict()
        dic['previewImageId'] = bizImg["id"]
        dic['previewImageUrl'] = bizImg["url"]
        dic['type'] = 'business'
        user = User.query.get(dic['ownerId'])
        dic['owner'] = user.username
        business_dict.append(dic)

    #Getting 10 most recent reviews
    reviews = Review.query \
    .join(User, Review.user_id == User.id) \
    .join(Business, Review.business_id == Business.id) \
    .outerjoin(ReviewImage, Review.id == ReviewImage.review_id) \
    .with_entities(
        Review.id,
        Review.stars,
        Review.review,
        Review.created_at,
        Review.updated_at,
        User.username,
        Business.id,
        Business.name,
        ReviewImage.url,
        ReviewImage.id
    ) \
    .order_by(Review.created_at.desc()) \
    .limit(10) \
    .all()
    reviews_dicts = []
    for rev in reviews:
        dic = {
            'id': rev[0],
            'stars': rev[1],
            'review': rev[2],
            'createdAt':rev[3],
            'updatedAt': rev[4],
            'username': rev[5],
            'businessId': rev[6],
            'businessName': rev[7],
            'revImgUrl': rev[8],
            'revImgId': rev[9],
            'type': 'review'
        }
        reviews_dicts.append(dic)

    #Getting 10 most recent business images
    # business_images = BusinessImage.query\
    # .join(Business, BusinessImage.business_id==Business.id)\
    # .with_entities(
    #     BusinessImage.id,
    #     BusinessImage.created_at,
    #     BusinessImage.updated_at,
    #     BusinessImage.url,
    #     Business.name,
    #     Business.id,
    # ).order_by(BusinessImage.created_at.desc()) \
    # .limit(10) \
    # .all()
    # business_image_dicts = []
    # for bizImg in business_images:
    #     dic = {
    #     'id': bizImg[0],
    #     'createdAt': bizImg[1],
    #     'updatedAt': bizImg[2],
    #     'url':bizImg[3],
    #     'businessName': bizImg[4],
    #     'type': 'businessImage'
    #     }
    #     business_image_dicts.append(dic)
    activities = business_dict+reviews_dicts
    activities.sort(key=lambda x: x['updatedAt'], reverse=True)

    return jsonify(activities[0:9])
