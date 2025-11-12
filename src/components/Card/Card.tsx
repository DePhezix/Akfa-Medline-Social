import './Card.scss'

type Props = {
    imgSrc: string,
    title: string,
    details: string,
}

function Card({imgSrc, title, details}: Props) {
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