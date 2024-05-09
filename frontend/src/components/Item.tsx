import React from 'react';
import './styles/Item.css'
import { useAuthContext } from '../hooks/useAuthContext';
import { useRequest } from '../hooks/useRequest';

interface ItemProps {
    itemID: string
    title: string;
    details: string;
    media: File;
    creator: string;
    createdAt: Date;
    tags: string[];
    requesterID: string
}

const Item: React.FC<ItemProps> = ({ itemID, title, details, media, creator, createdAt, tags }) => {

    const createdAtString = createdAt ? createdAt.toLocaleDateString() : '';
    const { user } = useAuthContext()
    const { requestItem } = useRequest()

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
                console.log("Successfully deleted item: ", response)
            } else {
                // add ERROR
                console.error("Failed to delete item: ", response)
            }
        } catch (error) {
            
            console.error("Failed to delete item: ", error)
        }
    }

    const handleBorrow = async () => {
        await requestItem( itemID, createdAt )
    }

    return (
        <div className="item-container">
            <div className="image-container">
                <div className="scrollable-images">
                    {/* PUT IMAGE/S HERE */}
                </div>
            </div>
            <div className="item-info">
                <h3>{title}</h3>
                <p className="item-details">{details}</p>
                <p className="item-creator">{creator}</p>
                <p className="item-createdAt">{createdAtString}</p>
                <p className="item-tags">{tags}</p>
            </div>
            <button className='get-btn' onClick={handleBorrow}>Borrow</button>
            {user && user.data.role == "admin" && (
                <button className="remove-btn" onClick={handleDelete}>Remove</button>
            )}
        </div>
    )
}

export default Item