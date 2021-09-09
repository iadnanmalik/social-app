import React, { useCallback, useState } from 'react'
import { setAuth } from "../utils/setAuth"
import axios from 'axios'

export const useGetUser = () => {
    const localToken = localStorage.getItem("token");
    const [result, setResult] = useState({
        success: false,
        loadingHook: false,
        status: null,
        userData: null
    })
    const loadUser = useCallback(
        async () => {
            setAuth(localToken);
            try {
                const res = await axios.get(`/api/auth`);
                setResult({ success: true, loadingHook: true, status: res.status, userData: res.data });
            } catch (error) {
                console.log(error);
                setResult({ success: false, loadingHook: true, status: error.response.data, userData: null });
            }
        },
        []
    );
    return [result, loadUser];

}

