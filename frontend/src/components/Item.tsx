import React from 'react';
import './styles/Item.css'
import { useAuthContext } from '../hooks/useAuthContext';

interface ItemProps {
    itemID: string
    title: string;
    details: string;
    media: File;
    creator: string;
    createdAt: Date;
    tags: string[];
}

const Item: React.FC<ItemProps> = ({ itemID, title, details, media, creator, createdAt, tags }) => {

    const createdAtString = createdAt ? createdAt.toLocaleDateString() : '';
    const { user } = useAuthContext()

    const handleDelete = async () => {
        try {
            const storedUserDataString = localStorage.getItem("user");
            if (!storedUserDataString) {
                console.error("No user data found in localStorage");
                return;
            }
            
            const storedUserData = JSON.parse(storedUserDataString);
            const token = storedUserData.token;
    
            const response = await fetch("/api/list/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ listId: itemID })
            })
    
            if (response.ok) {
                // Add Success popup
                console.log("Successfully approved item: ", response)
            } else {
                // add ERROR
                console.error("Failed to approve item: ", response)
            }
        } catch (error) {
            
            console.error("Failed to approve item: ", error)
        }
    }

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
            {user && user.data.role == "admin" && (
                <button className="remove-btn" onClick={handleDelete}>Remove</button>
            )}
        </div>
    )
}

export default Item