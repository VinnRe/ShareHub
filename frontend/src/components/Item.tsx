import React, { useState } from 'react';
import './styles/Item.css'
import { useAuthContext } from '../hooks/useAuthContext';
import { useRequest } from '../hooks/useRequest';
import PopUp from './PopUp';

interface ItemProps {
    itemID: string
    title: string;
    details: string;
    media: string;
    creator: string;
    createdAt: Date;
    tags: string[];
    requesterID: string
}

const Item: React.FC<ItemProps> = ({ itemID, title, details, media, creator, createdAt, tags }) => {

    const createdAtString = createdAt ? createdAt.toLocaleDateString() : '';
    const { user } = useAuthContext()
    const { requestItem } = useRequest()
    const [showPopup, setShowPopup] = useState(false)
    const [eventMessage, setEventMessage] = useState("")

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
                setShowPopup(true)
                setEventMessage(`Deleted ${title}`)
                setTimeout(() => {
                    setShowPopup(false)
                }, 5000)
            } else {
                setEventMessage(`Failed to delete ${title}`)
                setShowPopup(true)
                setTimeout(() => {
                    setShowPopup(false)
                }, 5000)
                console.error("Failed to delete item: ", response)
            }
        } catch (error) {
            setEventMessage(`Failed to delete ${title}`)
            setShowPopup(true)
            setTimeout(() => {
                setShowPopup(false)
            }, 5000)
            console.error("Failed to delete item: ", error)
        }
    }

    const handleBorrow = async () => {
        try {
            await requestItem( itemID, createdAt )
            setShowPopup(true)
            setEventMessage(`Borrowed ${title}`)
            setTimeout(() => {
                setShowPopup(false)
            }, 5000)
        } catch (error) {
            setEventMessage(`Failed to borrow ${title}`)
            setShowPopup(true)
            setTimeout(() => {
                setShowPopup(false)
            }, 5000)
        }
    }

    const imageSrc = `/src/assets/images/${media}`

    return (
        <div className="item-container-item">
            <div className="image-container-item">
                <img src={imageSrc} alt="" />
            </div>
            <div className="item-info-item">
                <h3>{title}</h3>
                <p className="item-creator-item">Creator: {creator}</p>
                <p className="item-details-item">{details}</p>
                <p className="item-date-item">Date: {createdAtString}</p> 
                <p className="item-tags-item">Category: {tags}</p>
            </div>
            <button className='get-btn' onClick={handleBorrow}>Borrow</button>
            {user && user.data.role == "admin" && (
                <button className="remove-btn" onClick={handleDelete}>Remove</button>
            )}

            {showPopup && (
                <PopUp message={eventMessage} />
            )}
        </div>
    )
}

export default Item