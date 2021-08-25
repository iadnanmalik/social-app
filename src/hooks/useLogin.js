import { useState } from 'react'
import axios from "axios";
export const useLogin = () => {

    const [result, setResult] = useState()
    const login = async ({ values }) => {
        const body = JSON.stringify(values);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.post(`/api/auth`, body, config);
            setResult(res);
        } catch (error) {
            setResult(error);
        }
    }
    return [result, login];
}

