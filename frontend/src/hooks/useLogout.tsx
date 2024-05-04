import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch, user} = useAuthContext();

  const logout = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: {'Authorization' : `Bearer ${user.token}` },
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { logout };
};