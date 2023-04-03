from app import db
from app.models import Business, Category, SCHEMA, environment

# Seed the database with 5 businesses
def seed_businesses():
    # Retrieve the existing categories from the database
    categories = Category.query.all()

    # Create some businesses
    biz1 = Business(owner_id=1, name='Bob\'s Burgers',price=1, description='Classic burgers and fries.  Located in the heart of downtown, the restaurant features an open kitchen and a cozy, rustic atmosphere.', features="Outdoor seating,Delivery", address='123 Main St', city='New York', state='NY', lng=-73.985428, lat=40.748817)
    biz1.categories = categories[0:3]

    biz2 = Business(owner_id=2, name='Joe\'s Pub',price=3, description='Live music and drinks. The atmosphere is sleek and modern, with minimalist decor and soft lighting. The restaurant also has a selection of sake and Japanese beer.', features="Outdoor seating,Open All Day", address='456 Broadway', city='New York', state='NY', lng=-73.997706, lat=40.726442)
    biz2.categories = categories[3:6]

    biz3 = Business(owner_id=3, name='Pete\'s Pizza',price=2, description='Authentic Italian pizza. The menu changes seasonally, and highlights locally-sourced ingredients such as artisanal cheeses, grass-fed beef, and fresh, organic produce. The bar offers an extensive wine list, craft beers, and inventive cocktails.', features="Takeout,Delivery", address='789 7th Ave', city='New York', state='NY', lng=-73.975952, lat=40.761745)
    biz3.categories = categories[0:3]

    biz4 = Business(owner_id=2, name='Sally\'s Salon',price=4, description='Full-service hair salon. The restaurant has a casual, beachy vibe, with nautical decor and a laid-back atmosphere. The menu features classic seafood dishes such as clam chowder, fish and chips, and lobster rolls, as well as more inventive creations such as grilled octopus and lobster mac and cheese.', features="Open All Day", address='321 5th Ave', city='Brooklyn', state='NY', lng=-73.975952, lat=40.678178)
    biz4.categories = categories[6:9]

    biz5 = Business(owner_id=3, name='Moe\'s Deli',price=3, description='Fresh sandwiches and salads. The restaurant has a warm, cozy atmosphere, with red-checkered tablecloths and vintage Italian posters on the walls. The menu features favorites such as spaghetti and meatballs, chicken parmesan, and margherita pizza, as well as house-made desserts like tiramisu and cannoli.', address='654 Smith St', city='Brooklyn', state='NY', lng=-73.998606, lat=40.678701)
    biz5.categories = categories[0:5]

    biz6 = Business(owner_id=2, name='The Coffee Spot',price=1, description='The Coffee Spot is a small, independent coffee shop located in the heart of downtown. It serves a variety of specialty coffees, teas, and pastries, and is popular with students, professionals, and tourists alike.', features='Outdoor seating', address='700 Passion Ave', city='New York', state='NY', lng=-73.997507, lat=40.748300)
    biz6.categories = categories[6:9]

    biz7 = Business(owner_id=2, name='Big Mike\'s Burgers',price=3, description='Big Mike\'s Burgers is a classic American burger joint that has been serving up delicious burgers, fries, and shakes for over 50 years. The burgers are made with fresh, never-frozen beef, and are cooked to order.', features='Delivery', address='708 Vinyl Street', city='New York', state='NY', lng=-73.997402, lat=40.748606)
    biz7.categories = categories[0:3]

    biz8 = Business(owner_id=3, name='Soleil Yoga',price=2, description='Soleil Yoga is a yoga studio that offers a variety of classes for all levels, from beginners to advanced practitioners. The studio is bright and airy, with large windows that let in lots of natural light.', features='Takeout', address='78 Retreats Lane', city='Brooklyn', state='NY', lng=-73.9974912, lat=40.748951)
    biz8.categories = categories[0:5]

    biz9 = Business(owner_id=4, name='The Book Nook',price=2, description='The Book Nook is an independent bookstore that specializes in new and used books, as well as gifts, cards, and stationery. The store has a cozy, intimate atmosphere, with comfortable armchairs and shelves lined with books from floor to ceiling.', features='Outdoor seating', address='618 Knowledge Lane', city='New York', state='NY', lng=-73.9974523 , lat=40.748736)
    biz9.categories = categories[3:6]


    # Add the businesses to the database
    db.session.add_all([biz1, biz2, biz3, biz4, biz5, biz6, biz7, biz8, biz9])
    db.session.commit()


def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()
