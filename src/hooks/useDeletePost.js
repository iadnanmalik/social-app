import { useState, useCallback } from 'react'
import axios from "axios";
import { setAuth } from "../utils/setAuth"
export const useDeletePost = () => {

    const localToken = localStorage.getItem("token");
    const [result, setResult] = useState({
        success: null,
        loading: null,
        status: null,

    })

    const setDeletePost = useCallback(async (postId) => {
        setResult({ success: false, loading: true, status: null });
        console.log(postId)
        setAuth(localToken)
        try {
            const res = await axios.delete(`/api/posts/${postId}`);
            setResult({ success: true, loading: false, status: res.status });
        } catch (error) {
            setResult({ success: false, loading: false, status: error?.response });

        }
    }, [])
    return [result, setDeletePost]

}

