import { useState, useCallback } from 'react'
import axios from "axios";
import { setAuth } from "../utils/setAuth"
export const useDeleteExperience = () => {

    const localToken = localStorage.getItem("token");
    const [result, setResult] = useState({
        success: null,
        loading: null,
        status: null,
        profile: null
    })
    const setDeleteExperience = useCallback(async ({ id }) => {
        setResult({ success: false, loading: true, status: null, profile: null });
        console.log(id)
        setAuth(localToken)
        try {
            const res = await axios.delete(`/api/profile/experience/${id}`);
            setResult({ success: true, loading: false, status: res.status, profile: res.data });
        } catch (error) {
            setResult({ success: false, loading: false, status: error?.response, profile: null });

        }
    }, [])
    return [result, setDeleteExperience]

}

