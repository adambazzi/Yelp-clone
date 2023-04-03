from app.models import db, User, environment, SCHEMA, Review
from sqlalchemy.sql import text
from datetime import datetime
def seed_reviews():
    review1 = Review(
        user_id=1,
        business_id=1,
        stars=4,
        review="The food here was excellent, and the service was great too. Would definitely recommend!"
    )
    review2 = Review(
        user_id=2,
        business_id=1,
        stars=3,
        review="The food was good, but the service was a bit slow."
    )
    review3 = Review(
        user_id=3,
        business_id=2,
        stars=5,
        review="This place is amazing! The food is delicious and the service is top-notch."
    )
    review4 = Review(
        user_id=2,
        business_id=3,
        stars=2,
        review="I was really disappointed with my meal here. The food was bland and the service was terrible."
    )
    review5 = Review(
        user_id=1,
        business_id=3,
        stars=4,
        review="The atmosphere here is great, and the food is pretty good too. Service could be a bit better though."
    )
    review6 = Review(
        user_id=8,
        business_id=3,
        stars=1,
        review="I completely agree with the review left. I had a similarly terrible experience with bland food and terrible service. Definitely wouldn't recommend."
    )
    review7 = Review(
        user_id=7,
        business_id=2,
        stars=3,
        review= "I had a decent experience at this business, but I can see where anyone is coming from with their criticisms. I think it's hit or miss depending on the day and who's working."
    )
    review8 = Review(
        user_id=4,
        business_id=2,
        stars=5,
        review=  "I don't know what user 2 is talking about - I've been here several times and always had a great meal and service. Don't let one bad review discourage you."
    )
    review9 = Review(
        user_id=4,
        business_id=5,
        stars=5,
        review=  " The food was fine, but not exceptional, and the service was okay. It's not my top recommendation, but it's worth a try."
    )
    review10 = Review(
        user_id=6,
        business_id=2,
        stars=1,
        review=  "I had a pretty bad experience here too. The food was lackluster and the service was downright rude. Definitely won't be going back."
    )
    review11 = Review(
        user_id=8,
        business_id=5,
        stars=3,
        review=  "Sometimes the food is great, sometimes it's not. The service is usually decent, but could be better."
    )
    review12 = Review(
        user_id=6,
        business_id=3,
        stars=1,
        review=  "The food was inedible and the service was beyond slow. Would not recommend at all."
    )
    review13 = Review(
        user_id=7,
        business_id=5,
        stars=3,
        review=  "I had a great meal here, but the service was a bit slow. I'd definitely recommend it for the food, though!"
    )
    review14 = Review(
        user_id=2,
        business_id=1,
        stars=3,
        review=  "I had a great meal here, but the service was a bit slow. I'd definitely recommend it for the food, though!"
    )
    review15 = Review(
        user_id=5,
        business_id=4,
        stars=3,
        review=  "I had a great meal here, but the service was a bit slow. I'd definitely recommend it for the food, though!"
    )

    db.session.add_all([review1,review2,review3,review4,review5,review6,review7,review8,review9,review10,review11,review12,review13,review14,review15])
    db.session.commit()
def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
