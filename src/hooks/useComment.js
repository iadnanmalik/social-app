import { useState, useCallback } from 'react'
import axios from "axios";
import { setAuth } from "../utils/setAuth"
export const useComment = () => {

    const [result, setResult] = useState({ success: null, loading: null, status: null, comments: null })
    const localToken = localStorage.getItem("token")
    const setCommentCustom = useCallback(async ({ id, text }) => {
        setAuth(localToken)
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ text });
        setResult({ success: false, loading: true, status: null, comments: null });
        try {

            console.log(id);
            const res = await axios.put(`/api/posts/comment/${id}`, body, config);
            console.log("From ")
            setResult({ success: true, loading: false, status: res.status, comments: res.data });

        } catch (error) {
            setResult({ success: false, loading: false, status: error?.response, comments: false });
        }

    }, [])
    return [result, setCommentCustom];
}

