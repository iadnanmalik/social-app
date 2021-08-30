import { useState, useCallback } from 'react'
import axios from "axios";
export const useProfileId = () => {

    const [result, setResult] = useState({
        success: null,
        loading: null,
        status: null,
        profile: null
    })
    const setProfileId = useCallback(async (id) => {
        setResult({ success: false, loading: true, status: null, profile: null });
        try {
            const res = await axios.get(`/api/profile/user/${id}`);
            setResult({ success: true, loading: false, status: res.status, profile: res.data });
        } catch (error) {
            setResult({ success: false, loading: false, status: error?.response, profile: false });
        }
    }, [])
    return [result, setProfileId];
}

