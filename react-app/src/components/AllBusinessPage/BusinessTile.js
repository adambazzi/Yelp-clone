
import { Link } from 'react-router-dom'
import './BusinessTile.css'

const BusinessTile = ({ business }) => {

    const price = Number.parseFloat(business.price).toFixed(2)
    let avgRating = Number.parseFloat(business.avgRating).toFixed(1)
    if(avgRating === 0) avgRating = 'New'

    return (
        <Link className='bussiness-tile' key={business.id} to={`businesses/${business.id}`}>
            <img className='bussiness-tile-image' src={business.previewImage[0].url} alt={business.name}></img>
            <div className='bussiness-tile-preview-information'>
                <div className='bussiness-tile-city-state-stars'>
                    <div className='bussiness-tile-city-state'>{business.name}</div>
                    <div className="bussiness-tile-stars"><i className="fa-regular fa-star"></i>{avgRating}</div>
                </div>
                <div className="bussiness-tile-price">${price}</div>
            </div>
        </Link>
    )
}

export default BusinessTile
