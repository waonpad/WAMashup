import { useState, useEffect, MutableRefObject } from 'react';
import { useElementClientRect } from '@/hooks/useElementClientRect';
import useElementChildScroll from '@/hooks/useElementChildScroll';

function useElementChildPositions(parentRef: MutableRefObject<HTMLElement | null>, childRefs: MutableRefObject<{[key: string]: HTMLElement} | null>) {
    const {clientRect: parentRect} = useElementClientRect(parentRef);
    const scrollTop = useElementChildScroll(parentRef);
    const [childPositions, setChildPositions] = useState({});

    useEffect(() => {
        childRefs.current = (childRefs.current as NonNullable<typeof childRefs.current>);
        
        if (parentRect && parentRef.current && childRefs.current[Object.keys(childRefs.current)[0]]) {

            const handleMove = () => {
                // console.log(parentRect)
                childRefs.current = (childRefs.current as NonNullable<typeof childRefs.current>);

                const childPositions = Object.keys(childRefs.current).map((childRefKey) => {
                    const childRect =  childRefs.current![childRefKey].getBoundingClientRect();

                    // console.log({[childRefKey]: childRect});
                    return {
                        key: childRefKey,
                        x: childRect.left - parentRect!.left,
                        y: childRect.top - parentRect!.top
                    };
                })
                setChildPositions(childPositions);
            };

            handleMove();

            window.addEventListener('resize', handleMove);
            window.addEventListener("scroll", handleMove);
            
            return () => {
                window.removeEventListener('resize', handleMove);
                window.removeEventListener("scroll", handleMove);
            };
        }
    }, [parentRef, childRefs, parentRect, scrollTop]);

    return childPositions;
}

export default useElementChildPositions;
