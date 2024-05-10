import { useEffect, useState } from "react";

export const useListedSearch = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoadingS, setIsLoadingS] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const searchListed = async (searchTerm: string) => {
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
        console.log("SEARCH TERM: ", searchTerm);
        const json = await response.json();
        console.log("Response JSON:", json);
        setSearchResults(json);
        console.log("SEARCH RESULTS USL:", searchResults)
        setIsLoadingS(false);

    }
    return { searchListed, searchResults, setIsLoadingS, error };
};