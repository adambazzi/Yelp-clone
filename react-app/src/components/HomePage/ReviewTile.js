
import { Link } from 'react-router-dom'
import './ReviewTile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import PreviewStars from '../AllBusinessPage/PreviewStars';

const ReviewTile = ({ review: { id, username, revImgUrl, name, businessId, businessName, stars, review } }) => {

    return (
        <div className="recent-review-tile" id={`review-${id}`}>
          <div className="reviewer-info">
            <FontAwesomeIcon className="reviewer-icon" icon={faUser} /><span className="reviewer-username"><div>{username}</div><div className="review-action">Wrote a review</div></span>
          </div>
          {revImgUrl ? (
            <div className="review-image">
              <img className="recent-review-image" src={revImgUrl} alt={name} />
            </div>
          ) : (
            <div className="review-image"></div>
          )}
          <Link className="business-name" to={`/businesses/${businessId}`}>{businessName}</Link>
          <div className="review-stars">
            <PreviewStars avg={stars} num={''}/>
            {/* {Array.from({ length: 5 }, (_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={index < stars ? fullStar : emptyStar}
              />
            ))} */}
          </div>
          <div className="review-content">{review}</div>
          <div><Link to={`/businesses/${businessId}`} className="review-keep-reading">Conitinue reading...</Link></div>
          <div className='review-border-container'><div className='review-border'></div></div>
          <div className="review-actions">
            <Link className="action-link"><FontAwesomeIcon icon={faLightbulb} className="action-link-icons" /></Link>
            <Link className="action-link"><FontAwesomeIcon icon={faFaceSmile} className="action-link-icons" /></Link>
            <Link className="action-link"><FontAwesomeIcon icon={faHeart} className="action-link-icons" /></Link>
          </div>
        </div>
      );
}

export default ReviewTile
