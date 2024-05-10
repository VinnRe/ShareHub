import './styles/Request.css'

interface ItemProps {
    itemID: string;
    title: string;
    details: string;
    media: File;
    borrowerName: string;
    borrowerEmail: string;
    creator: string;
    creatorEmail: string;
    createdAt: Date;
    tags: string[];
}

const Receipt: React.FC<ItemProps> = ({ itemID, title, details, media, borrowerName, borrowerEmail, creator, creatorEmail, createdAt, tags }) => {
    const createdAtString = createdAt ? new Date(createdAt).toLocaleDateString() : '';

    const imageSrc = `/src/assets/images/${media}`

    return (
        <div className="item-container">
            <div className="image-container">
                <div className="scrollable-images">
                    <img src={imageSrc} alt="" />
                </div>
            </div>
            <div className="item-info">
                <h3>{title}</h3>
                <p>Sharer: </p>
                <p>{creator}</p>
                <p>{creatorEmail}</p>
                <p className="item-details">{details}</p>
                <p>Borrowed by: </p>
                <p className="item-creator">{borrowerName}</p>
                <p className="item-creator">{borrowerEmail}</p>
                <p className="item-createdAt">{createdAtString}</p>
                <p className="item-tags">{tags}</p>
            </div>
        </div>
    )
}

export default Receipt