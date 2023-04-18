import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { createBusiness } from '../../store/business';
import './index.css'


export default function CreateBusinessForm() {
    const ownerId = useSelector((state) => state.session.user.id)
    let catList = [
        { id: 1, category: 'Breakfast' },
        { id: 2, category: 'Burger' },
        { id: 3, category: 'Italian' },
        { id: 4, category: 'Desert' },
        { id: 5, category: 'Thai' },
        { id: 6, category: 'Chinese' },
        { id: 7, category: 'Pizza' },
        { id: 8, category: 'French' },
        { id: 9, category: 'Vietnamese' },
        { id: 10, category: 'Cafe' },
    ]

    let startedObj = {}
    for (let cat in catList) {
        startedObj[cat.id] = false
    }

    let feautureList = [
        { id: 1, feature: 'Outdoor seating' },
        { id: 2, feature: 'Delivery' },
        { id: 3, feature: 'Open All Day' },
        { id: 4, feature: 'Takeout' },
        { id: 5, feature: '21+' },
        { id: 6, feature: 'Live Music' },
        { id: 7, feature: 'Vegan Friendly' },
        { id: 8, feature: 'Vegeterian Friendly' },
        { id: 9, feature: 'Pet Friendly' },
        { id: 10, feature: 'Family Owned' },
    ]

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lng, setLng] = useState(null);
    const [lat, setLat] = useState(null);
    const [price, setPrice] = useState(0);
    const [categories, setCategories] = useState('');
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [image5, setImage5] = useState('')
    const [image6, setImage6] = useState('')
    // seperate state for each category


    //Validation Errors set state
    const [validationErrors, setValidationErrors] = useState({
        name: '',
        description: '',
        features: '',
        address: '',
        city: '',
        state: '',
        lng: '',
        lat: '',
        price: '',
        categories: '',
        imageType: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        image5: '',
        image6: '',
    })

    // const [selectedCategory, setSelectedCategory] = useState({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9:false, 10:false});
    const [selectedCategory, setSelectedCategory] = useState(startedObj);
    const [selectedFeature, setSelectedFeature] = useState({ 1: false, 2: false, 3: false, 4: false, 5: false });

    function handleCategoryChange(e) {
        let categoryObj = {
            ...selectedCategory,
            [e.target.value]: !selectedCategory[e.target.value]
        }

        setSelectedCategory(categoryObj)
    }

    useEffect(() => {
        let togo = []
        for (let i = 1; i < 11; i++) {
            if (selectedCategory[i]) {
                togo.push(i)
            }
        }
        setCategories(togo.join())
    }, [selectedCategory])

    function handleFeatureChange(e) {
        let featureObj = {
            ...selectedFeature,
            [e.target.value]: !selectedFeature[e.target.value]
        }
        setSelectedFeature(featureObj)
    }

    useEffect(() => {
        let togofeature = []
        for (let i = 1; i < 11; i++) {
            if (selectedFeature[i]) {
                let some = feautureList.find(obj => obj.id == i)

                togofeature.push(some.feature)
            }
            setFeatures(togofeature.join())
        }
    }, [selectedFeature])

    const history = useHistory();
    const dispatch = useDispatch();

    // const preSub = e =>{
    //     if(features.length>0){
    //         let featuresArray = features.split(",")
    //         featuresArray = featuresArray.map(el=>el.trim())
    //         setFeatures(()=> featuresArray.join())
    //     }
    //     onSubmit()
    // }
    const onSubmit = async (e) => {
        e.preventDefault();

        const newBusiness = {
            name,
            description,
            features,
            address,
            city,
            state,
            lng: +lng,
            lat: +lat,
            price,
            categories,
            image1,
            image2,
            image3,
            image4,
            image5,
            image6
        }


        //Validates the form fields
        const errors = {}
        if (!newBusiness.name.length) errors.name = 'Name is required';
        if (newBusiness.description.length < 30) errors.description = 'Description needs a minimum of 30 characters';
        if (!newBusiness.features.length) errors.features = 'Tag(s) is required';
        if (!newBusiness.address.length) errors.address = 'Address is required';
        if (!newBusiness.city.toString().length) errors.city = 'City is required';
        if (!newBusiness.state.toString().length) errors.state = 'State is required';
        if (!newBusiness.lng) errors.lng = 'Longitude is required';
        if (newBusiness.lng < -180) errors.lng = 'Longitude must be between -180 and 180';
        if (newBusiness.lng > 180) errors.lng = 'Longitude must be beetween -180 and 180';
        if (!newBusiness.lat) errors.lat = 'Latitude is required';
        if (newBusiness.lat < -90) errors.lat = 'Lattitude must be between -90 and 90';
        if (newBusiness.lat > 90) errors.lat = 'Lattitude must be beetween -90 and 90';
        if (!newBusiness.categories.length) errors.categories = 'Pick at least one category';
        if (!newBusiness.price) errors.price = 'Price is required';

        //Validates the images
        if (!newBusiness.image1.length) errors.image1 = 'Preview image is required';
        for (let i = 2; i <= 6; i++) {
            const imageField = newBusiness[`image${i}`];
            if (imageField.length && !/\.(png|jpe?g)$/.test(imageField)) {
                errors[`image${i}`] = 'Image URL must end in .png, .jpg, or .jpeg';
            }
        }

        if (!Object.values(errors).length) {
            let newBiz = await dispatch(createBusiness(newBusiness));

            if (newBiz) {
                history.push(`/businesses/${newBiz.id}`)
            }

        } else {
            setValidationErrors(errors)
        }

    }

    return (
        <>
            <form
                className='create-business-form'
                onSubmit={onSubmit}
            >
                <div id="create-business-h1-container"><h1>Create a New Business on VGAN</h1></div>
                <div>
                    <label>
                        What is the name of your business? <span className='validationErrors'>{validationErrors.name}</span>
                        <input
                            type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Describe your business in a few lines. <span className='validationErrors'>{validationErrors.description}</span>
                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        ></textarea>
                    </label>
                </div>
                <div>

                    Give us a few tags for your business. <span className='validationErrors'>{validationErrors.features}</span>
                    {feautureList.map(({ id, feature }) => (
                        <>
                            <label key={feature}>

                                <input
                                    type="checkbox"
                                    name="feature"
                                    value={id}
                                    onChange={handleFeatureChange}
                                />
                                {feature}
                            </label>

                        </>
                    ))}

                </div>
                <div>
                    <label>
                        What street address is your business located at? <span className='validationErrors'>{validationErrors.address}</span>
                        <input
                            type='text'
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        What city? <span className='validationErrors'>{validationErrors.city}</span>
                        <input
                            type='text'
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                        />
                    </label>
                </div>
                <div>
                    <label for="state-dropdown">Select a state:
                        <select id="state-dropdown" name="state" onChange={(e) => setState(e.target.value)}>
                            <option value="">-- Select a state --</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Longitude? <span className='validationErrors'>{validationErrors.lng}</span>
                        <input
                            type='number'
                            onChange={(e) => setLng(e.target.value)}
                            value={lng}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Latitude? <span className='validationErrors'>{validationErrors.lat}</span>
                        <input
                            type='number'
                            onChange={(e) => setLat(e.target.value)}
                            value={lat}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        What price category does your business belong to? <span className='validationErrors'>{validationErrors.price}</span>
                        <select
                            onChange={(e) => setPrice(+e.target.value)}
                            value={price}
                        >
                            <option value={1}>$</option>
                            <option value={2}>$$</option>
                            <option value={3}>$$$</option>
                            <option value={4}>$$$$</option>
                        </select>

                    </label>
                </div>
                <div>
                    <label>
                        What are some miscellaneous categories you want to add to your business? <div className='validationErrors'>{validationErrors.categories}</div>
                        <div id='create-business-categories'>
                            {catList.map(({ id, category }) => (
                                <>
                                    <label key={category}>

                                        <input
                                            type="checkbox"
                                            name="category"
                                            value={id}
                                            onChange={handleCategoryChange}
                                        />
                                        {category}
                                    </label>

                                </>
                            ))}
                        </div>
                    </label>
                </div>
                <div>
                    <label>
                        <h3>Liven up your business with photos</h3>
                        <p>
                            Competitive pricing can help your listing stand out and rank
                            higher in search results.
                        </p>
                        <div className='validationErrors'>{validationErrors.image1}</div>
                        <div className='validationErrors'>{validationErrors.imageType}</div>
                        <input
                            type="text"
                            name="image1"
                            value={image1}
                            placeholder="Preview Image URL"
                            onChange={(e) => setImage1(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className='validationErrors'>{validationErrors.image2}</div>
                        <input
                            type="text"
                            name="image2"
                            value={image2}
                            placeholder="Image 1"
                            onChange={(e) => setImage2(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className='validationErrors'>{validationErrors.image3}</div>
                        <input
                            type="text"
                            name="image3"
                            value={image3}
                            placeholder="Image 2"
                            onChange={(e) => setImage3(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className='validationErrors'>{validationErrors.image4}</div>
                        <input
                            type="text"
                            name="image4"
                            value={image4}
                            placeholder="Image 3"
                            onChange={(e) => setImage4(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className='validationErrors'>{validationErrors.image5}</div>
                        <input
                            type="text"
                            name="image5"
                            value={image5}
                            placeholder="Image 4"
                            onChange={(e) => setImage5(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className='validationErrors'>{validationErrors.image6}</div>
                        <input
                            type="text"
                            name="image6"
                            value={image6}
                            placeholder="Image 5"
                            onChange={(e) => setImage6(e.target.value)}
                        />
                    </label>
                </div>
                <div id="create-business-submit">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    );

}