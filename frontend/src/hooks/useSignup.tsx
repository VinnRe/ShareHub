import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState<any>(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const signup = async (firstName: string, lastName: string, username: string, email: string, password: string) => {
        setIsLoading(true)
        setError(null)

        const name = `${firstName} ${lastName}`

        console.log("Request payload:", JSON.stringify({name, username, email, password}))
        const response = await fetch('api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name, username, email, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})
            navigate("/home")

            setIsLoading(false)
        }
    }
    return { signup, isLoading, error}
}