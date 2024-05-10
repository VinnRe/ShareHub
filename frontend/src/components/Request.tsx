import './styles/Request.css'
import { useAuthContext } from '../hooks/useAuthContext';
import PopUp from './PopUp';
import { useState } from 'react';

interface ItemProps {
    itemID: string;
    userID: string
    title: string;
    details: string;
    media: File;
    borrowerName: string;
    borrowerEmail: string;
    createdAt: Date;
    tags: string[];
}

const Request: React.FC<ItemProps> = ({ itemID, userID, title, details, media, borrowerName, borrowerEmail, createdAt, tags }) => {
    const createdAtString = createdAt ? new Date(createdAt).toLocaleDateString() : '';
    const [showPopup, setShowPopup] = useState(false)
    const [eventMessage, setEventMessage] = useState("")

    const { user } = useAuthContext()

    const handleApprove = async () => {
        try {
            const storedUserDataString = localStorage.getItem("user");
            if (!storedUserDataString) {
                console.error("No user data found in localStorage");
                return;
            }
                
            const storedUserData = JSON.parse(storedUserDataString);
            const token = storedUserData.token;

            const response = await fetch("/api/list/accept", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ requestId: itemID })
            })
    
            if (response.ok) {
                setShowPopup(true)
                setEventMessage(`Successfully approved item ${title}`)
                setTimeout(() => {
                    setShowPopup(false)
                }, 5000)
                console.log("Successfully approved item: ", response)
            } else {
                setShowPopup(true)
                setEventMessage(`Failed to approve item ${title}`)
                setTimeout(() => {
                    setShowPopup(false)
                }, 5000)
                console.error("Failed to approve item: ", response)
            }
        } catch (error) {
            setShowPopup(true)
            setEventMessage(`Failed to approve item ${title}`)
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
    
            console.log(itemID)
            const response = await fetch("/api/list/reject", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ requestId: itemID })
            })
    
            if (response.ok) {
                setShowPopup(true)
                setEventMessage(`Successfully rejected item ${title}`)
                setTimeout(() => {
                    setShowPopup(false)
                }, 5000)
                console.log("Successfully rejected item: ", response)
            } else {
                setShowPopup(true)
                setEventMessage(`Failed reject item ${title}`)
                setTimeout(() => {
                    setShowPopup(false)
                }, 5000)
                console.error("Failed to reject item: ", response)
            }
        } catch (error) {
            setShowPopup(true)
            setEventMessage(`Failed reject item ${title}`)
            setTimeout(() => {
                setShowPopup(false)
            }, 5000)
            console.error("Failed to reject item: ", error)
        }
    }

    const imageSrc = `/src/assets/images/${media}`

    return user && user.data._id === userID && (
        <div className="item-container">
            <div className="image-container">
                <div className="scrollable-images">
                        <img src={imageSrc} alt="" />
                </div>
            </div>
            <div className="item-info">
                <h3>{title}</h3>
                <p className="item-details">{details}</p>
                <p>Requesting to borrow: </p>
                <p className="item-creator">{borrowerName}</p>
                <p className="item-creator">{borrowerEmail}</p>
                <p className="item-createdAt">{createdAtString}</p>
                <p className="item-tags">{tags}</p>
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

export default Request