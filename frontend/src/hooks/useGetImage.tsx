import { useState } from 'react';

interface UseImageReturn {
    imageFile: (fileName: string) => Promise<void>;
    error: string | null;
}

const useGetImage = (): UseImageReturn => {
    const [error, setError] = useState<string | null>(null);

    const imageFile = async (imageName: string): Promise<void> => {
        try {
            const response = await fetch('/api/image/getFile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageName }),
            });

            if (response.ok) {
                const blob = await response.blob()
                // ADD THE THINGY TO PUT IMAGE ON THE COMPONENTS
                setError(null);
            } else {
                const errorMsg = (await response.json()).message || 'Unknown error';
                throw new Error(errorMsg); 
            }
        } catch (e: any) {
            setError(e.message || 'Error opening file');
        }
    };

    return { imageFile, error }; // Return the function and error state
};

export default useGetImage;