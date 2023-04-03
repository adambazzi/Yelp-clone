import './BusinessImages.css'
const BusinessImages = ({ images }) => {
    if (!images || images.length === 0) {
        return null;
    }

    const previewImage = <img src={images[0].url} alt='house image' id='preview-image' />;
    const secondaryImages = images.slice(1, 6).map(image => (
        image ? <img src={image.url} alt='house image' className='secondary-image' key={image.id} /> : ''
    ));

    return (
        <div className='all-images'>
            <div className='preview-image'>{previewImage}</div>
            <div className='secondary-images'>
                {secondaryImages}
            </div>
        </div>
    );
};

export default BusinessImages;
