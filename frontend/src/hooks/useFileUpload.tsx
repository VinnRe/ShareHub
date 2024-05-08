import { useState } from "react";

export const useFileUpload = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 

    const uploadFile = async (file) => {
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData(); 
            formData.append("file", file); 

            const response = await fetch('/api/image/upload', {
                method: 'POST',
                body: formData
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error); 
            }
            
            setIsLoading(false);
            setError(null);
        } catch (error) {
            setIsLoading(false);
        }
    };

    return { uploadFile, isLoading, error };
};
