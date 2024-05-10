import './styles/ApprovalItem.css'
import { useState } from 'react';
import PopUp from './PopUp';

interface ItemProps {
    itemID: string;
    title: string;
    details: string;
    media: File;
    creator: string;
    createdAt: Date;
    tags: string[];
}

const ApprovalItem: React.FC<ItemProps> = ({ itemID, title, details, media, creator, createdAt, tags }) => {
    const createdAtString = createdAt ? createdAt.toLocaleDateString() : '';
    const [showPopup, setShowPopup] = useState(false)
    const [eventMessage, setEventMessage] = useState("")

    const handleApprove = async () => {
        try {
            const storedUserDataString = localStorage.getItem("user");
            if (!storedUserDataString) {
                console.error("No user data found in localStorage");
                return;
            }
                
            const storedUserData = JSON.parse(storedUserDataString);
            const token = storedUserData.token;

            const response = await fetch("/api/list/approve", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ listId: itemID })
            })
    
            if (response.ok) {
                setShowPopup(true)
                setEventMessage(`Successfully approved item ${title}`)
                setTimeout(() => {
                    setShowPopup(false)
                }, 5000)
                console.log("Successfully approved item: ", response)
            } else {
                setEventMessage(`Failed to approve ${title}`)
                setShowPopup(true)
                setTimeout(() => {
                    setShowPopup(false)
                }, 5000)
                console.error("Failed to approve item: ", response)
            }
        } catch (error) {
            setEventMessage(`Failed to approve ${title}`)
            setShowPopup(true)
            setTimeout(() => {
                setShowPopup(false)
            }, 5000)
            console.error("Failed to approve item: ", error)
        }
    }

    const handleReject = async () => {
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
                setEventMessage(`Successfully rejected ${title}`)
                setShowPopup(true)
                setTimeout(() => {
                    setShowPopup(false)
                }, 5000)
                console.log("Successfully reject item: ", response)
            } else {
                setEventMessage(`Failed to reject ${title}`)
                setShowPopup(true)
                setTimeout(() => {
                    setShowPopup(false)
                }, 5000)
                console.error("Failed to reject item: ", response)
            }
        } catch (error) {
            setEventMessage(`Failed to reject ${title}`)
            setShowPopup(true)
            setTimeout(() => {
                setShowPopup(false)
            }, 5000)
            console.error("Failed to reject item: ", error)
        }
    }

    const imageSrc = `/src/assets/images/${media}`

    return (
        <div className="item-container-approval">
            <div className="image-container-approval">
                <img src={imageSrc} alt="" />
            </div>
            <div className="item-info-approval">
                <h3>{title}</h3>
                <p className="item-creator-approval">Creator: {creator}</p>
                <p className="item-details-approval">{details}</p>
                <p className="item-date-approval">Date: {createdAtString}</p>
                <p className="item-tags-approval">Category: {tags}</p>
            </div>
            <div className="ar-btn-container">
                <button className='approve-btn' onClick={handleApprove}>Approve</button>
                <button className='reject-btn' onClick={handleReject}>Reject</button>
            </div>
            {showPopup && (
                <PopUp message={eventMessage} />
            )}
        </div>
    )
}

export default ApprovalItem