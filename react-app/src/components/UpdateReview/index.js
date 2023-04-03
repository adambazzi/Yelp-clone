import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readASingleReview } from '../../store/review';
import { getSingleBusiness } from '../../store/business';
import { editReview } from '../../store/review';
import DynamicStars from '../UpdateReview/DynamicStars';
import { useModal } from '../../context/Modal';
import './index.css';

export default function UpdateReviewForm({ oldReview }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(oldReview.stars);

    const [validationErrors, setValidationErrors] = useState({
        stars: '',
        review: ''
    })

    useEffect(() => {
        let tofill = async() =>{

          setReview(oldReview.review)
          setStars(oldReview.stars)

        }
        tofill()
    }, [dispatch, id])

    const business = useSelector(state => state.business.business);
    const onSubmit= async (e) =>{
        e.preventDefault()
        const toedit ={
            review,
            stars
        }

        const errors = {};

        if (stars <= 0 || stars > 5) errors.stars = 'Reviews must have 1 to 5 stars';
        if (!review.length) errors.review = 'Review is required';

        if (!Object.values(errors).length) {
            const editedreview = await dispatch(editReview(oldReview.id, toedit))

            await dispatch(getSingleBusiness(oldReview.business_id))
            closeModal();
        } else {
            setValidationErrors(errors);
        }

    }

    return(
        <div className='update-review-form-container'>
            <h1>Update your review for {business.name}</h1>
            <form
                className="update-review-form"
                onSubmit={onSubmit}
            >
                <DynamicStars class="class-dyn" stars={stars} setStars={setStars} />
                <span className='validationErrors'>{validationErrors.stars}</span>

                <div>
                    <textarea
                        type='text'
                        id='update-review-text'
                        onChange={(e) => setReview(e.target.value)}
                        value={review}
                    ></textarea>
                </div>
                    <span className='validationErrors'>{validationErrors.review}</span>
                <div>
                    <input className='default-button rd-bg curs' type="submit" />
                </div>
            </form>
        </div>
    )
}
