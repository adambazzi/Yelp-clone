import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getBusinesses, updateBusiness } from '../../store/business';
import { getSingleBusiness } from '../../store/business';

export default function UpdateBusiness(){
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const ownerId = useSelector((state) => state.session.user.id);


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

    // const business = useSelector((state) => state.business.business);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [price, setPrice] = useState(1);

    const [currentFeat,setCurrentFeat] = useState([])

        useEffect(() => {
            let someState = async () => {
                let business = await dispatch(getSingleBusiness(id))

                if(business.ownerId !== ownerId) return history.push('/')

                setName(business.name)
                setDescription(business.description)
                setFeatures(business.features)
                setAddress(business.address)
                setCity(business.city)
                setState(business.state)
                setLat(business.lat)
                setLng(business.lng)
                setPrice(business.price)
                setCurrentFeat(()=> business.features.split(","))
            }
            someState()

        }, [dispatch, id])

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        description: '',
        features: '',
        address: '',
        city: '',
        state: '',
        lng: '',
        lat: '',
        price: ''
    })


    const [selectedFeature, setSelectedFeature] = useState({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10:false });

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


    const onSubmit = async e => {
        e.preventDefault();

        const updatedBusiness = {
            name,
            description,
            features,
            address,
            city,
            state,
            lat,
            lng,
            price
        }

        const errors = {}
        if (!updatedBusiness.name.length) errors.name = 'Name is required';
        if (updatedBusiness.description.length < 30) errors.description = 'Description needs a minimum of 30 characters';
        if (!updatedBusiness.features.length) errors.features = 'Tag(s) is required';
        if (!updatedBusiness.address.length) errors.address = 'Address is required';
        if (!updatedBusiness.city.toString().length) errors.city = 'City is required';
        if (!updatedBusiness.state.toString().length) errors.state = 'State is required';
        if (!updatedBusiness.lng) errors.lng = 'Longitude is required';
        if (updatedBusiness.lng < -180 ) errors.lng = 'Longitude must be between -180 and 180';
        if (updatedBusiness.lng > 180) errors.lng = 'Longitude must be beetween -180 and 180';
        if (!updatedBusiness.lat) errors.lat = 'Latitude is required';
        if (updatedBusiness.lat < -90) errors.lat = 'Lattitude must be between -90 and 90';
        if (updatedBusiness.lat > 90) errors.lat = 'Lattitude must be beetween -90 and 90';
        if (!updatedBusiness.price) errors.price = 'Price is required';

        if (!Object.values(errors).length) {
            let updateBiz = await dispatch(updateBusiness(id,updatedBusiness));
            await dispatch(getBusinesses())

            if (updateBiz) {
                history.push(`/businesses/${updateBiz.id}`)
            }

        } else {
            setValidationErrors(errors)
        }

    }


    useEffect(()=>{
        let newFeaturedObj = {...selectedFeature}
        currentFeat.forEach(el=>{
            newFeaturedObj[feautureList.find(f=>f.feature===el).id] = true
        })
        setSelectedFeature(()=>newFeaturedObj)
    },[currentFeat])

    return (
        <>
            <h1 style={{paddingLeft:'400px'}} >Update your business </h1>
            <form
                className='create-business-form'
                onSubmit={onSubmit}
            >
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
                        Describe your business in a few lines.<span className='validationErrors'>{validationErrors.description}</span>
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
                                    checked={selectedFeature[id]}
                                    onChange={handleFeatureChange}
                                />
                                {feature}
                            </label>

                        </>
                    ))}
                </div>
                <div>
                    <label>
                        What street address is your business located at?<span className='validationErrors'>{validationErrors.address}</span>
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
                    <label for="state-dropdown">Select a state: <span className='validationErrors'>{validationErrors.state}</span>
                        <select id="state-dropdown" name="state" value={state} onChange={(e) => setState(e.target.value)}>
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
                        onChange={(e) => setLng(+e.target.value)}
                        value={lng}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Latitude? <span className='validationErrors'>{validationErrors.lat}</span>
                        <input
                        type='number'
                        onChange={(e) => setLat(+e.target.value)}
                        value={lat}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        What price range is your business? <span className='validationErrors'>{validationErrors.price}</span>
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
                {/* <div>
                    <label>
                        What are some miscellaneous categories you want to add to your business?
                        <div>
                            {catList.map(({id,category}) => (
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
                        <h3>Liven up your spot with photos</h3>
                        <p>
                            Competitive pricing can help your listing stand out and rank
                            higher in search results.
                        </p>
                        <input
                            type="text"
                            name="previewPhoto"
                            required
                            value={image}
                            placeholder="Preview Image URL"
                            onChange={(e) =>setImage(e.target.value)}
                        />
                    </label>
                </div> */}
                <div>
                    <input type="submit" />
                </div>
            </form>
        </>
    );


}
