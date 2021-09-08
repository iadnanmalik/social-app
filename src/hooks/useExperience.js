import { useState, useCallback } from 'react'
import axios from "axios";
import { setAuth } from "../utils/setAuth"
export const useExperience = () => {

    const localToken = localStorage.getItem("token");
    const [result, setResult] = useState({
        success: false,
        loading: true,
        status: null,
    })
    const addExperience = useCallback(async ({ formData }) => {
        setResult({ success: false, loading: true, status: null });
        const body = JSON.stringify(formData);
        console.log(body)
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }; setAuth(localToken)
        try {
            const res = await axios.put(`/api/profile/experience`, body, config);
            setResult({ success: true, loading: false, status: res.status });
        } catch (error) {
            setResult({ success: false, loading: false, status: error.response.data });

        }
    }, [])
    return [result, addExperience];
}

