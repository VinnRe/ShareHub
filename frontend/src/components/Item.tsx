import React from 'react';
import './styles/Item.css'
import { useAuthContext } from '../hooks/useAuthContext';
import { useRequest } from '../hooks/useRequest';
import { useState, useEffect } from 'react';

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
        </div>
    )
}

export default Item