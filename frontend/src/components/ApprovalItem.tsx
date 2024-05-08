import './styles/ApprovalItem.css'

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
            <div className="item-info">
                <h3>{title}</h3>
                <p className="item-details">{details}</p>
                <p className="item-creator">{creator}</p>
                <p className="item-createdAt">{createdAtString}</p>
                <p className="item-tags">{tags}</p>
            </div>
            <div className="ar-btn-container">
                <button className='approve-btn' onClick={handleApprove}>Approve</button>
                <button className='reject-btn' onClick={handleReject}>Reject</button>
            </div>
        </div>
    )
}

export default ApprovalItem