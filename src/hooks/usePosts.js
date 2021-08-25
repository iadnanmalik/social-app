import { useState, useCallback } from 'react'
import axios from "axios";
import { setAuth } from "../utils/setAuth"
export const usePosts = () => {

    const [result, setResult] = useState()
    const localToken = localStorage.getItem("token")
    const setAllPosts = useCallback(async (postsSet) => {
        console.log(postsSet)
        if (postsSet?.length > 0) {
            setResult({ success: true, loading: false, status: null, posts: postsSet });
        }
        else {
            setAuth(localToken)
            setResult({ success: true, loading: true, status: null, posts: null });
            try {
                const res = await axios.get(`/api/posts`);
                setResult({ success: true, loading: false, status: res.status, posts: res.data });
            } catch (error) {
                setResult({ success: false, loading: false, status: error?.response.status, posts: false });
            }
        }
    }, [])
    return [result, setAllPosts];
}

