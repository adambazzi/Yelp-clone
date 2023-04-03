
import { Link } from 'react-router-dom'
import './NewBusinessTile.css'
import PreviewStars from './PreviewStars'

const NewBusinessTile = ({ business }) => {

    const price = Number.parseFloat(business.price).toFixed(2)
    let avgRating = Number.parseFloat(business.avgRating).toFixed(1)
    if(avgRating === 0) avgRating = 'New'
    if(!business) return null
    return (
        <Link className='bussiness-tile2' key={business.id} to={`businesses/${business.id}`}>
            <div className='business-tile2'>
            <img className='bussiness-tile-image2' src={business.previewImage? business.previewImage[0].url : ''} alt={business.name}></img>
            <div className='business_tile_info'>
                    <h3>{business.name}</h3>
                    <PreviewStars avg={business.avgRating} num={business.numReviews}/>
                    <div class="catagories_display">
                        {business.categories && business.categories.map(el=>(<span>{el.categoryName} </span>))}
                        <span style={{backgroundColor: 'white'}}>{'$'.repeat(price)}</span>
                    </div>
                    <div class="features_display">
                        {business.features && business.features.split(',').map(el=>(<span>{el} <i class="fa-solid fa-check green"></i></span>))}
                    </div>
            </div>
            </div>
        </Link>
    )
}

export default NewBusinessTile
