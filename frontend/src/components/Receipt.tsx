import './styles/Receipt.css'

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
        <div className="item-container-rec">
            <div className="image-container-rec">
                <img src={imageSrc} alt="" />
            </div>
            <div className="item-info-rec">
                <h3>{title}</h3>
                <p>Sharer: </p>
                <p>{creator}</p>
                <p>{creatorEmail}</p>
                <p className="item-details-rec">{details}</p>
                <p>Borrowed by: </p>
                <p className="item-creator-rec">{borrowerName}</p>
                <p className="item-creator-rec">{borrowerEmail}</p>
                <p className="item-createdAt-rec">{createdAtString}</p>
                <p className="item-tags-rec">{tags}</p>
            </div>
        </div>
    )
}

export default Receipt