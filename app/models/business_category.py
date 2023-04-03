from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
# # from .models import Business, Category
# from .business import Business
# from .category import Category


business_categories = db.Table(
    'business_categories',
    db.Model.metadata,
    db.Column('categories', db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id'))),
    db.Column('businesses', db.Integer, db.ForeignKey(add_prefix_for_prod('businesses.id'))),
)
if environment == "production":
    business_categories.schema = SCHEMA
