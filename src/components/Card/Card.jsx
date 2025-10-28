import './Card.scss'

function Card({imgSrc, title, details}) {
    return (
        <div className="card-container">
            <img src={imgSrc} className='image' />
            <div className="details-container">
                <div className="title">{title}</div>
                <div className="details">{details}</div>
            </div>
        </div>
    )
}

export default Card