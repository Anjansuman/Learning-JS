import { useState, useEffect } from "react";

export function useDebounce(text, delay) {
    const [value, setValue] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setValue(text);
        }, delay);

        return () => {
            clearTimeout(timer);
        }
    }, [text, delay]);

    return value;
}