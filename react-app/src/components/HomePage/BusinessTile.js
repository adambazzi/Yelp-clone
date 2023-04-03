import { Link } from 'react-router-dom'
import './BusinessTile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const BusinessTile = ({ business: { id, previewImageUrl, name, description, owner } }) => {

  return (
    <div className="business-tile" id={`business-${id}`}>
      <div className="business-info">
        <FontAwesomeIcon className="business-icon" icon={faUser} /><span className="business-username"><div>{owner}</div><div className="business-action">Opened a new business</div></span>
      </div>
      {previewImageUrl ? (
        <div className="business-image">
          <img className="recent-business-image" src={previewImageUrl} alt={name} />
        </div>
      ) : (
        <div className="business-image"></div>
      )}
      <Link className="business-name" to={`/businesses/${id}`}>{name}</Link>
      <div className="business-stars">
      </div>
      <div className="business-content">{description}</div>
      <div><Link to={`/businesses/${id}`} className="business-keep-reading">Check us out!</Link></div>
      <div className='business-border-container'><div className='business-border'></div></div>
      <div className="business-actions">
        <Link className="action-link"><FontAwesomeIcon icon={faLightbulb} className="action-link-icons" /></Link>
        <Link className="action-link"><FontAwesomeIcon icon={faFaceSmile} className="action-link-icons" /></Link>
        <Link className="action-link"><FontAwesomeIcon icon={faHeart} className="action-link-icons" /></Link>
      </div>
    </div>
  );
}

export default BusinessTile;
