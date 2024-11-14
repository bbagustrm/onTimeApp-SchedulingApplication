import { useCallback, useRef } from "react";

function useLongPress(callback, ms = 500) {
    const timerRef = useRef(null);

    const start = useCallback(() => {
        timerRef.current = setTimeout(callback, ms);
    }, [callback, ms]);

    const clear = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    return {
        onMouseDown: start,
        onTouchStart: start,
        onMouseUp: clear,
        onMouseLeave: clear,
        onTouchEnd: clear,
    };
}

export default useLongPress;
