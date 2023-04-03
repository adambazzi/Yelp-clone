import { useEffect, useState } from 'react';
import PreviewStars from './PreviewStars';
import './BusinessReview.css'
import ReviewOptionsMenu from './ReviewOptionsMenu';
import { useSelector } from 'react-redux';
export default function BusinessReview(prop){
    const currUser = useSelector(state=>state.session.user)
    const review = prop.review
    const user = review.user

    return (
        <div className='single-review'>
            <div className="main-info">
            <div className='user-info-container'>

                <i className={`fa-solid fa-user user-avatar avatar-color${Math.floor(Math.random() * 5) + 1}`}></i>
                <div className="user-info-tags">
                    <h3>{user.username}</h3>
                    <h5>{user.email}</h5>
                    <div className='flex-row-cen'>
                        <i class="fa-solid fa-star small-star"></i><span>{user.numReviews}</span>
                    </div>
                </div>
            </div>
            <div className='starts-container'>
                <PreviewStars props={review} />
                <p>{review.updated_at.split(" ").slice(0,3).join(" ")}</p>
            </div>
            <p className='review-content'>{review.review}</p>
            </div>
            {currUser && currUser.id === user.id?<ReviewOptionsMenu review={review}/>:null}
            {/* {currUser && currUser.id === user.id?<ReviewOptionsMenu id={review.id}/>:null} */}
        </div>
    )
}
