import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useCreate = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState<any>(null)
    const { user } = useAuthContext()

    const createList = async (tags: string, title: string, details: string, media: string) => {
        setIsLoading(true)
        setError(null)

        //const tags = [selectedMaterialTopic, selectedMaterialType]

        const payload = { 
            title: title,
            details: details,
            tags: tags,
            media: media,
            user: {
                _id: user.data._id
            }
        }

        
        console.log("Request payload:", JSON.stringify(payload))
        console.log(user.token)
        
        const response = await fetch('/api/list/create', {
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
    return { createList, isLoading, error}
}