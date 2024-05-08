import { useState } from "react";

export const useFileUpload = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(false); 

    const uploadFile = async (file: File) => {
        setIsLoading(true);
        setError(null);

        const formData = new FormData(); 
        formData.append("file", file); 

        const response = await fetch('/api/image/upload', {
            method: 'POST',
            body: formData
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error); 
        } else {
            setIsLoading(false);
            setError(null); 
        }
    };

    return { uploadFile, isLoading, error };
};
