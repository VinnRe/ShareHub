import React, { useState } from "react"
import './styles/Popup.css'

interface PopupProps {
    message: string;
}

const PopUp: React.FC<PopupProps> = ( { message } ) => {
    
    return (
        <div className="popup-container">
            <div className="popup-inner">
                <h3>{message}</h3>
            </div>
        </div>
    )
}

export default PopUp