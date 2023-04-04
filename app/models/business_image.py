from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class BusinessImage(db.Model):
    __tablename__ = "business_images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), nullable=False)
    url = db.Column(db.String)
    preview = db.Column(db.Boolean,default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    business = db.relationship("Business", back_populates="images")

    def to_dict(self):
        return {
            'id': self.id,
            'businessId': self.business_id,
            'url': self.url,
            'preview': self.preview,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
