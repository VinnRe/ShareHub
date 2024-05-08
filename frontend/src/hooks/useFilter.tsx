import { useState } from "react";

interface FilteredProp {
    _id: string;
    title: string;
    details: string;
    media: File;
    creator: string;
    createdAt: Date;
    tags: string[];
    ownerName: string;
}

export const useFilter = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filteredItems, setFilteredItems] = useState<FilteredProp[]>([]);

    const filterItems = async (tags: string) => {
        setIsLoading(true);
        setError(null);

        const payload = {
            tags: tags
        };

        console.log("Request payload:", JSON.stringify(payload));

        try {
            const response = await fetch('/api/list/fetch/tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const json = await response.json();
            console.log("Response:", json);

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error || "An error occurred while fetching data");
            } else {
                setIsLoading(false);
                setFilteredItems(json);
            console.log("SEARCH RESULTS USL:", filteredItems)

            }
        } catch (error) {
            console.error("Error:", error);
            setIsLoading(false);
            setError("An error occurred while fetching data");
        }
    };

    return { filterItems, setIsLoading, error, filteredItems };
};