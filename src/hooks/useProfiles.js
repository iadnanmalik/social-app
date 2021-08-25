import { useState, useCallback } from 'react'
import axios from "axios";
export const useProfiles = () => {

    const [result, setResult] = useState()
    const setAllProfiles = useCallback(async () => {
        setResult({ success: false, loading: true, status: null, profiles: null });
        try {
            const res = await axios.get(`/api/profile`);
            setResult({ success: true, loading: false, status: res.status, profiles: res.data });
        } catch (error) {
            setResult({ success: false, loading: false, status: error.response.status, profiles: false });
        }
    }, [])
    return [result, setAllProfiles];
}

