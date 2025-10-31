import './Card.scss'

function Card({imgSrc, title, details}) {
    return (
        <div className="card-container">
            <img src={imgSrc} className='image' />
            <div className="details-container">
                <h3 className="title">{title}</h3>
                <p className="details">{details}</p>
            </div>
        </div>
    )
}

export default Card