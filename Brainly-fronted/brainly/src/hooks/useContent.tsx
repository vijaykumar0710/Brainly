import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
    // FIX: Init with empty array []
    const [contents, setContents] = useState([]);

    function refresh() {
        const token = localStorage.getItem("token");
        if(!token) return;
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: { "Authorization": token }
        }).then((response) => {
            setContents(response.data.content || []);
        }).catch((e) => console.log(e));
    }

    useEffect(() => {
        refresh();
        let interval = setInterval(() => { refresh() }, 10000);
        return () => clearInterval(interval);
    }, []);

    return { contents, refresh };
}