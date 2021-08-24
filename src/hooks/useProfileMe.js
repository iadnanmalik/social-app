import { useState, useCallback } from 'react'
import axios from "axios";
import { setAuth } from "../utils/setAuth"
export const useProfile = () => {
    const localToken = localStorage.getItem("token");

    const [result, setResult] = useState()
    const setProfile = useCallback(async () => {
        setResult({ success: false, loading: true, status: null, profile: null });

        setAuth(localToken)
        try {
            const res = await axios.get(`/api/profile/me`);
            setResult({ success: true, loading: false, status: 200, profile: res.data });
        } catch (error) {
            setResult({ success: false, loading: false, status: error.response.status, profile: false });
        }
    }, [])
    return [result, setProfile];
}

