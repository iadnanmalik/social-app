import { useState } from 'react'
import axios from "axios";
export const useRegister = () => {

    const [result, setResult] = useState()
    const register = async ({ values }) => {
        const body = JSON.stringify(values);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.post(`/api/users`, body, config);
            setResult(res);
        } catch (error) {
            setResult(error);
        }
    }
    return [result, register];
}

