import { useState, useCallback } from 'react'
import axios from "axios";
import { setAuth } from "../utils/setAuth"
export const useLike = () => {

    const [resLikes, setResLikes] = useState()
    const localToken = localStorage.getItem("token")
    const setLike = useCallback(async (id) => {
        setAuth(localToken)
        setResLikes({ success: false, loading: true, status: null, likes: null });
        try {
            const res = await axios.put(`/api/posts/like/${id}`);
            setResLikes({ success: true, loading: false, status: res.status, likes: res.data });
        } catch (error) {
            setResLikes({ success: false, loading: false, status: error?.response, likes: false });
        }

    }, [])
    return [resLikes, setLike];
}

