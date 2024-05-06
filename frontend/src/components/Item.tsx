import React from 'react';
import './styles/Item.css'

interface ItemProps {
    title: string;
    details: string;
    media: File;
    creator: string;
    createdAt: Date;
    tags: string[];
}

const Item: React.FC<ItemProps> = ({ title, details, media, creator, createdAt, tags }) => {

    const createdAtString = createdAt ? createdAt.toLocaleDateString() : '';

    return (
        <div className="item-container">
            <div className="image-container">
                <div className="scrollable-images">
                    {/* PUT IMAGE/S HERE */}
                </div>
            </div>
            <div className="btn-container">
                <button className="prev-btn">&lt;</button>
                <button className="next-btn">&gt;</button>
            </div>
            {/* <h3>{listing.itemName}</h3>
            <p>₱ {listing.itemPrice}</p>
            <p className="item-details">{listing.itemDescription}</p> */}
            <div className="item-info">
                <h3>{title}</h3>
                <p className="item-details">{details}</p>
                <p className="item-creator">{creator}</p>
                <p className="item-createdAt">{createdAtString}</p>
                <p className="item-tags">{tags}</p>
            </div>
            <button className='get-btn'>Borrow</button>
        </div>
    )
}

export default Item