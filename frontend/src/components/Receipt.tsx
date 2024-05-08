import React, { useState } from "react";
import "./styles/Receipt.css";

interface PostFormProps {
  onClose: () => void;
}

const Receipt: React.FC<PostFormProps> = ({ onClose }) => {
  return (
    <div className="receipt-container active">
        <span className="close" onClick={onClose}>
            &times;
        </span>
        <div className="receipts">
            <h1 className="receipt-header">RECEIPTS</h1>
        </div>
    </div>
  );
};

export default Receipt;