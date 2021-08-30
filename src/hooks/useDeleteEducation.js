import { useState, useCallback } from 'react'
import axios from "axios";
import { setAuth } from "../utils/setAuth"
export const useDeleteEducation = () => {

    const localToken = localStorage.getItem("token");

    const [result, setResult] = useState({
        success: null,
        loading: null,
        status: null,
        profile: null
    })
    const setDeleteEducation = useCallback(async ({ id }) => {
        setResult({ success: false, loading: true, status: null, profile: null });
        console.log(id)
        setAuth(localToken)
        try {
            const res = await axios.delete(`/api/profile/education/${id}`);
            setResult({ success: true, loading: false, status: res.status, profile: res.data });
        } catch (error) {
            setResult({ success: false, loading: false, status: error?.response, profile: null });

        }
    }, [])
    return [result, setDeleteEducation]

}

