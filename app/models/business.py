from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
# from models import business_category
from .business_category import business_categories

class Business(db.Model):
    __tablename__ = 'businesses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(), nullable=False)
    features = db.Column(db.String())
    address = db.Column(db.String(150), nullable=False)
    city = db.Column(db.String(150), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    lng = db.Column(db.Float,nullable=False)
    lat = db.Column(db.Float,nullable=False)
    price = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )
    # category_id = db.Column(db.Integer, db.foreignKey('category.id'), nullable=False)

    owner = db.relationship("User", back_populates="businesses")
    categories = db.relationship("Category",secondary=business_categories, back_populates='businesses')
    images = db.relationship("BusinessImage", back_populates="business", cascade="all,delete")
    reviews = db.relationship(
        "Review", back_populates='business', cascade="all,delete")

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'name': self.name,
            'description': self.description,
            'features': self.features,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'lng': self.lng,
            'lat': self.lat,
            'price': self.price,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'avgRating': sum([review.stars for review in self.reviews])/len(self.reviews) if len(self.reviews) > 0 else 0,
            'numReviews': len(self.reviews),
            'previewImage': [img.to_dict() for img in self.images if img.preview == True],
            'categories':[category.to_dict() for category in self.categories],
            'images': [img.to_dict() for img in self.images]
        }
