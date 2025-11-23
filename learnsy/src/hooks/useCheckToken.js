import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { getProfile } from "../services/authService";

export function useCheckToken() {
  const token = useAuthStore((state) => state.token);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    async function loadUser() {
      const tokenLS = localStorage.getItem("token");

      if (!tokenLS) {
        logout();
        return;
      }

      try {
        const res = await getProfile();
        setUserInfo(res.data);
      } catch (err) {
        logout();
      }
    }

    loadUser();
  }, [token]);
}
