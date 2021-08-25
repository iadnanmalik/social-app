import { useState, useCallback } from 'react'
import axios from "axios";
export const useDeleteComment = () => {

    const [result, setResult] = useState({
        success: false,
        loading: true,
        status: null,

    })
    const setDeleteComment = useCallback(async (postId, commentId) => {
        setResult({ success: false, loading: true, status: null, comments: null });
        console.log(postId, commentId);
        try {
            const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
            setResult({ success: true, loading: false, status: res.status, comments: res.data });
        } catch (error) {
            setResult({ success: false, loading: false, status: error?.response, comments: null });

        }
    }, [])
    return [result, setDeleteComment]

}

