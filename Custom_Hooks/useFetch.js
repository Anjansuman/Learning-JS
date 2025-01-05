import { useState, useEffect } from "react";

export function useFetch() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("<YOUR_URL>");
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if(loading) {
        return <div>Loading...</div>
    }

    return <div>
        {data}
    </div>
}