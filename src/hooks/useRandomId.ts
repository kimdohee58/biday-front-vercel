import {useEffect, useState} from "react";

export default function useRandomId(length:number): string  {
    const [randomId, setRandomId] = useState('');

    const generateRandomId = () => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        let result = "";

        for (let i = 0; i < length; i++) {
            const randomId = Math.floor(Math.random() * characters.length);
            result += characters[randomId];
        }

        return result;
    }

    useEffect(() => {
        setRandomId(generateRandomId());
    }, []);

    return randomId;
};