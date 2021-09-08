import { useState, useCallback } from 'react'
import axios from "axios";
import { setAuth } from "../utils/setAuth"
export const useCreateProfile = () => {
    const localToken = localStorage.getItem("token");

    const [result, setResult] = useState({
        success: false,
        loading: true,
        status: null,
    })
    const createProfile = useCallback(async ({ values }) => {
        setResult({ success: false, loading: true, status: null });
        const body = JSON.stringify(values);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }; setAuth(localToken)
        try {
            const res = await axios.post(`/api/profile/me`, body, config);
            setResult({ success: true, loading: false, status: res.status });
        } catch (error) {
            setResult({ success: false, loading: false, status: error?.response.status });

        }
    }, [])
    return [result, createProfile];
}

