import { useState } from "react";

export const useResourceSearch = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoadingS, setIsLoadingS] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const searchResource = async (searchTerm: string) => {
        setIsLoadingS(true);
        setError(null);

        const payload = {
            searchTerm: searchTerm
        };

        const response = await fetch('/api/list/fetch/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorJson = await response.json();
            setError(errorJson.error || 'Error searching for resources');
            setIsLoadingS(false);
            return;
        }
        const json = await response.json();
        console.log("Response JSON:", json);
        setSearchResults(json);
        setIsLoadingS(false);
    };

    return { searchResource, searchResults, isLoadingS, error };
};
