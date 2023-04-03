from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField,FloatField
from wtforms.validators import DataRequired, NumberRange,Length


class BusinessForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(
        max=150, message='from name data required')])
    description = TextAreaField('Description', validators=[
                                DataRequired(message='from description data required')])
    features = TextAreaField('Features')
    address = StringField('Address', validators=[
                          DataRequired(message='from address data required'), Length(max=150, message='from length address data required')])
    city = StringField('City', validators=[DataRequired(
        message='from city data required'), Length(max=150, message='from length city data required')])
    state = StringField('State', validators=[DataRequired(
        message='from state data required'), Length(max=2, message='from state length data required')])
    lng = FloatField('Longitude', validators=[
                     DataRequired(message='from lng data required')])
    lat = FloatField('Latitude', validators=[
                     DataRequired(message='from lat data required')])
    price = IntegerField('Price')
    categories=StringField("Categories")
    image1=StringField('Image1')
    image2=StringField('Image2')
    image3=StringField('Image3')
    image4=StringField('Image4')
    image5=StringField('Image5')
    image6=StringField('Image6')
