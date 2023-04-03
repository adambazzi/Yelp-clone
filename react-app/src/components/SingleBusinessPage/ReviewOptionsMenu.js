import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import DeleteReviewModal from '../DeleteReviewModal';
import UpdateReviewForm from '../UpdateReview'
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import './ReviewOptionsMenu.css'
export default function ReviewOptionsMenu(review){

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory();

    const ulClassName = "drop-menu" + (showMenu ? "" : " hidden");

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = (e) => {
          if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const openMenu = e =>{
        if (showMenu) return;
        setShowMenu(true);
    }
    const closeMenu = () => setShowMenu(false);

    // const handleClick = () => history.push(`/businesses/${review.review.id}/reviews/edit`)

    return(
        <div className="button-container">
            <div className="options-button" onClick={openMenu}>
                <i class="fa-sharp fa-solid fa-bars"></i>
            </div>
            <div ref={ulRef} className={ulClassName} >
                <OpenModalButton
                buttonText="Delete Review"
                onItemClick={closeMenu}
                modalComponent={<DeleteReviewModal review={review.review}/>}
                />
                <OpenModalButton
                buttonText="Edit Review"
                onItemClick={closeMenu}
                modalComponent={<UpdateReviewForm oldReview={review.review} />}
                />
                {/* <button onClick={handleClick}>Edit Review</button> */}
            </div>
        </div>
    )
}
