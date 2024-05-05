import { useState } from 'react';
import { useAuthContext } from './useAuthContext'; 



export const useAccountUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<UpdateError | null>(null);
  const { user } = useAuthContext(); 

  const updateAccount = async (updatedInfo: { name?: string; email?: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        ...updatedInfo,
        userId: user.data._id 
      };

      console.log("Request payload:", JSON.stringify(payload))
        console.log(user.token)

      const response = await fetch('/api/account/update/profile', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || 'Failed to update account');
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error updating account:', error);
      setIsLoading(false);
      setError({ message: error.message || 'Failed to update account' });
    }
  };

  return { updateAccount, isLoading, error };
};
