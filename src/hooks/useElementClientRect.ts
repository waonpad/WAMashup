import { useState, useEffect, useRef, MutableRefObject } from "react";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

export type ClientRect = {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
} | null;

export const useElementClientRect = (ref: MutableRefObject<HTMLElement | null>) => {
    const {width, height} = useWindowDimensions();
    const [domLoading, setDOMLoading] = useState<boolean>(true);
    const [clientRect, setClientRect] = useState<ClientRect>(null);

    const getClientRect = () => {
        if(ref.current !== null) {
            const clientRect = ref.current.getBoundingClientRect();
            setClientRect(clientRect);
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            getClientRect()
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [])

    useEffect(() => {
        getClientRect()
    }, [domLoading, ref, width, height])

    return {
        clientRect,
        setDOMLoading
    }
}