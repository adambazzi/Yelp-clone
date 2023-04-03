from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
# from models import business_category
from .business_category import business_categories

class Category(db.Model):
    __tablename__ = "categories"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(), nullable=False)

    businesses = db.relationship("Business",secondary=business_categories, back_populates='categories')

    def to_dict(self):
        return {
            'id': self.id,
            'categoryName': self.category_name
        }
