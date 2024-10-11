/*
import {createElement, ReactNode, useEffect, useState} from "react";
import {createPortal} from "react-dom";

interface PortalProps {
    children: ReactNode;
}

const Portal: React.FC<PortalProps> = ({children}) => {
    const [isClient, setIsClient] = useState<boolean>(false);
    const [domReady, setDomReady] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    const node = document.getElementById("modal-root") as Element;
    return isClient
        ? createPortal(createElement('div', null, children), node)
        : null;
}

export default Portal;*/
