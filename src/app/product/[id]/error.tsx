"use client";

import {useEffect} from "react";

export default function Error({error} : { error: Error}) {

    useEffect(() => {
        console.error(error.message);
    }, [error]);


    return <div>
        <h3>오류가 발생했습니다..</h3>
    </div>;
};