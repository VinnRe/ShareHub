import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState<any>(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const login = async (emailOrUsername: string, password: string) => {
        setIsLoading(true)
        setError(null)

        const isEmail = emailOrUsername.includes('@');
        const payload = isEmail 
            ? { email: emailOrUsername, password } 
            : { username: emailOrUsername, password };
        
        console.log("Request payload:", JSON.stringify(payload))
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })

        const json = await response.json()

        if (!response) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})
            navigate("/job-board")
            setIsLoading(false)
        }
    }
    return { login, isLoading, error}
}