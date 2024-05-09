import React, { useEffect, useState } from "react";
import "./styles/ReceiptForm.css";
import { useAuthContext } from "../hooks/useAuthContext";
import Request from "./Request";

interface PostFormProps {
  onClose: () => void;
}

interface RequestProp {
    _id: string;
    list: {
      creator: {
        name: string;
      };
    };
    listCreator: string;
    listInfo: {
      createdAt: string;
      details: string;
      media: File;
      tags: string[];
      title: string;
      _id: string;
    };
    requester: {
      name: string;
      email: string;
      _id: string;
    };
}

const ReceiptForm: React.FC<PostFormProps> = ({ onClose }) => {
  const [requested, setRequested] = useState<any>(null)
  const { user } = useAuthContext()

  const requests = async () => {
    try {
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
        };

        const response = await fetch("/api/list/fetch/request", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const json = await response.json();
        console.log("JSON:", json);

        const requestData = json.map((item: any) => ({
            ...item
        }));
        setRequested(requestData);
        console.log("Request Data: ", requestData)
    } catch (error) {
        console.error("Error fetching requests:", error);
    }
};


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
            {requested &&
              requested.map((request: RequestProp) => (
              <Request
                  key={request._id}
                  itemID={request.listInfo._id}
                  userID={request.listCreator}
                  title={request.listInfo.title}
                  creator={request.list.creator.name}
                  createdAt={new Date(request.listInfo.createdAt)}
                  details={request.listInfo.details}
                  media={request.listInfo.media}
                  tags={request.listInfo.tags}
              />
              ))}
            {!requested && <p>Loading resources...</p>}
          </div>
          <div className="accepted-receipt">
            <h1 className="receipt-header">RECEIPTS</h1>

          </div>
        </div>
    </div>
  );
};

export default ReceiptForm;