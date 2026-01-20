import { useContext, useEffect } from "react";
import { userContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
  const { user, updateUser, cleanUser } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;
    let isMounted = true;
    const fetchUserInfo = async () => {
      try {
        const response = await api.get(API_PATHS.AUTH.GET_USER_INFO);
        if (isMounted && response.data) {
          updateUser(response.data?.data);
        }
      } catch (error) {
        console.error("Failed to fetch user information", error);
        if (isMounted) {
          cleanUser();
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [updateUser, cleanUser, navigate]);
};
