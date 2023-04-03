import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { getSingleBusiness } from '../../store/business';
import { deletereviewthunk } from '../../store/review';
import './index.css'

export default function DeleteReviewModal(id){
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const deleteReview = async e =>{
        await dispatch(deletereviewthunk(id.review.id))
        await dispatch(getSingleBusiness(id.review.business_id))
        closeModal()
    }

    return (
        <div className="delete-review-modal">
            {/* <h1>{id}</h1> */}
            <h2>Are you sure you want to delete this review?</h2>
            <div className="delete-keep">
                <button className='stndrd-btn' onClick={deleteReview}>Delete</button>
                <button className='stndrd-btn' onClick={closeModal}>Keep Review</button>
            </div>
        </div>
    )
}
