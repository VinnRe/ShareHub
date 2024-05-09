import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRequest = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState<any>(null)
    const { user } = useAuthContext()

    const requestItem = async ( itemID: string, date: Date) => {
        setIsLoading(true)
        setError(null)

        const payload = { 
            listId: itemID,
            date: date.toDateString,
            requesterId: {
                _id: user.data._id
            }
        }

        console.log("Request payload:", JSON.stringify(payload))
        
        const response = await fetch('/api/list/request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${user.token}` },
            body: JSON.stringify(payload)
        })

        const json = await response.json()

        console.log("Response:", response)

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {

            setIsLoading(false)
        }
    }
    return { requestItem, isLoading, error}
}

