from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_categories():
    breakfast = Category(category_name='Breakfast')
    burger = Category(category_name='Burger')
    italian = Category(category_name='Italian')
    dessert = Category(category_name='Dessert')
    thai = Category(category_name="Thai")
    chinese = Category(category_name="Chinese")
    pizza = Category(category_name="Pizza")
    french = Category(category_name="French")
    vietnamese = Category(category_name="Vietnamese")
    cafe = Category(category_name="Cafe")

    db.session.add_all([breakfast, burger, italian, dessert, thai, chinese, pizza, french, vietnamese, cafe])
    db.session.commit()


def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
