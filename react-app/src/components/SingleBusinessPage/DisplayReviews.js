import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReviews } from '../../store/review';
import './DisplayReviews.css';

const DisplayReviews = ({ businessId }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getReviews(businessId));
    }, [dispatch, businessId]);

    // if (!reviews || !user) {
    //     return <li>Be the first to post a review!</li>;
    // }

    const dateFormat = (date) => {
        const dateArray = date.split('-');
        return `${dateArray[0]}-${dateArray[1]}-${dateArray[2].slice(0,2)}`;
    }

    return (
        <>
            {reviews.length > 0 && reviews[0].User.firstName && reviews.map(review => (
                <li key={review.id} className='business-review'>
                    <h4>{review.User.firstName}</h4>
                    <div className="business-review-date">{dateFormat(review.createdAt)}</div>
                    <div className="business-review-review">{review.review}</div>
                    {user.id === review.userId && (
                        <button>DELETE</button>
                    )}
                </li>
            ))}
        </>
    );
}

export default DisplayReviews;
