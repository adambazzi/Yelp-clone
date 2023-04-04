from flask import Blueprint, jsonify, request, redirect
from app.models import Business, BusinessImage, User, Category, Review, db
from ..forms.review_form import ReviewForm
from ..forms.new_business_form import BusinessForm
from flask_login import login_required, current_user
from sqlalchemy import func

category_routes = Blueprint('categories', __name__)


@category_routes.route('/<int:business_id>/categories', methods=['PUT'])
@login_required
def update_business_categories(business_id):
    # Retrieve the business by its id
    business = Business.query.get(business_id)

    # Error handler: Business not found
    if not business:
        return jsonify({'message': 'Business not found'}), 404

    # Get the list of categories from the request JSON and query the database for them
    category_ids = request.json.get('categories').split(',')
    categories = Category.query.filter(Category.id.in_(category_ids)).all()

    # Update the categories for the business
    business.categories = categories
    db.session.commit()

    # Return a successful response
    return jsonify({'message': 'Categories updated successfully'})
