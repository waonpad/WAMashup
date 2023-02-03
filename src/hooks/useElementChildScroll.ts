import { useState, useEffect, MutableRefObject } from 'react';

function useElementChildScroll(ref: MutableRefObject<HTMLElement | null>) {
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        function handleScroll() {
            setScrollTop(node!.scrollTop);
        }

        node.addEventListener('scroll', handleScroll);
        node.addEventListener('resize', handleScroll);
        
        return () => {
            node.removeEventListener('scroll', handleScroll);
            node.removeEventListener('resize', handleScroll);
        };
    }, [ref]);

    return scrollTop;
}

export default useElementChildScroll;
