import { useState, useCallback } from 'react'
import axios from "axios";
import { setAuth } from "../utils/setAuth"
export const useCreatePost = () => {
    const localToken = localStorage.getItem("token");

    const [result, setResult] = useState({
        success: false,
        loading: true,
        status: null,
        post: null
    })

    const createPost = useCallback(async ({ values }) => {
        setResult({ success: false, loading: true, status: null, post: null });
        const body = JSON.stringify(values);
        console.log(body)
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }; setAuth(localToken)
        try {
            const res = await axios.post(`/api/posts`, body, config);
            setResult({ success: true, loading: false, status: res.status, post: res.data });
        } catch (error) {
            setResult({ success: false, loading: false, status: error?.response, post: null });

        }
    }, [])
    return [result, createPost];
}

