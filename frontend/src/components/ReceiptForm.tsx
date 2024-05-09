import React, { useEffect, useState } from "react";
import "./styles/Receipt.css";
import { useAuthContext } from "../hooks/useAuthContext";
import Request from "./Request";

interface PostFormProps {
  onClose: () => void;
}

interface RequestProp {
    _id: string;
    userID: string;
    title: string;
    details: string;
    media: File;
    creator: string;
    createdAt: Date;
    tags: string[];
    ownerName: string;
}

const ReceiptForm: React.FC<PostFormProps> = ({ onClose }) => {
  const [requested, setRequested] = useState<any>(null)
  const { user } = useAuthContext()

  const requests = async () => {
        const storedUserDataString = localStorage.getItem("user");
          if (!storedUserDataString) {
              console.error("No user data found in localStorage");
              return;
          }
          
          const storedUserData = JSON.parse(storedUserDataString);
          const token = storedUserData.token;

          if (!token) {
              console.error("No token found in localStorage");
              return;
          }

          const payload = {
            userId: user.data._id
          }

          const response = await fetch("/api/list/fetch/request", {
              method: "POST",
              headers: {
                  "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify(payload)
          });
        const json = await response.json()
    
        console.log("JSON:", json)
        if (response.ok) {
          const requestData = json.map((item: any) => {
            console.log(item)
            return {
                ...item.requestData,
                ownerName: item.ownerInfo.name
            }
          })
          setRequested(requestData)
          console.log(requestData)
        }
  }

  useEffect(() => {
    requests()
  }, [])

  return (
    <div className="receipt-container active">
        <span className="close" onClick={onClose}>
            &times;
        </span>
        <div className="receipts">
          <div className="requests">
            <h1 className="requests-header">REQUESTS</h1>
            {/* {requested &&
              requested.map((request: RequestProp) => (
              <Request
                  key={request._id}
                  itemID={request._id}
                  userID={request.}
                  title={request.title}
                  creator={request.ownerName}
                  createdAt={new Date(request.createdAt)}
                  details={request.details}
                  media={request.media}
                  tags={request.tags}
              />
              ))}
            {!requested && <p>Loading resources...</p>} */}
          </div>
          <div className="accepted-receipt">
            <h1 className="receipt-header">RECEIPTS</h1>

          </div>
        </div>
    </div>
  );
};

export default ReceiptForm;