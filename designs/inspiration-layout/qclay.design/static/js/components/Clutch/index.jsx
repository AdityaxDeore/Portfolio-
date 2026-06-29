import './clutch.scss';

const Clutch = () => {
    return (
        <div className='clutch'>
            <img 
                src="/images/clutch.svg"
                alt="clutch"
                className="clutch__icon"
            />

            <div className="clutch__block">
                <div className="clutch__stars">
                    <img src="/images/star.svg" alt="star" />
                    <img src="/images/star.svg" alt="star" />
                    <img src="/images/star.svg" alt="star" />
                    <img src="/images/star.svg" alt="star" />
                    <img src="/images/star.svg" alt="star" />
                </div>
 
                <p className="clutch__text">
                    Rating 5, 24 reviews
                </p>
            </div>
        </div>
    );
}

export default Clutch;