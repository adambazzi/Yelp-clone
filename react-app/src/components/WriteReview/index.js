import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../store/review";
import { getSingleBusiness } from "../../store/business";
import DynamicStars from "./DynamicStars"
import './index.css'

function WriteReviewForm() {

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);

    const [validationErrors, setValidationErrors] = useState({
        stars: '',
        review: ''
    })

    const history = useHistory();
    const dispatch = useDispatch();
    // const userId = useSelector(state => state.session.user?.id);
    const business = useSelector(state => state.business.business);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getSingleBusiness(id))
    }, [dispatch, id])

    const onSubmit = async e => {
        e.preventDefault();

        const newReview = {
            stars,
            review
        }

        const errors = {};

        if (stars <= 0 || stars > 5) errors.stars = 'Reviews must have 1 to 5 stars';
        if (!review.length) errors.review = 'Review is required';


        if (!Object.values(errors).length) {
           let sendReview = await dispatch(postReview(id, newReview));

           if (sendReview) {
            return history.push(`/businesses/${id}`)
           }

        } else {
            setValidationErrors(errors);
        }

    };

    if (!Object.values(business)[0]) return null;

    return (
        <div className="review-form-container">
            <h1>Write a review for {business.name}</h1>
            <form
            className="write-review-form"
            onSubmit={onSubmit}
            >
                <DynamicStars class="class-dyn" stars={stars} setStars={setStars}/>
                <span className="validationErrors">{validationErrors.stars}</span>
                <div>
                    <textarea id="review-text"
                    type='text'
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                    ></textarea>
                </div>
                    <span className="validationErrors">{validationErrors.review}</span>
                <div>
                    <input className="default-button rd-bg curs" type="submit" />
                </div>
            </form>
        </div>
    )

}

export default WriteReviewForm
