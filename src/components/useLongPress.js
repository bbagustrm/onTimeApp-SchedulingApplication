import { useState, useEffect, useCallback } from "react";

const useLongPress = (callback, ms = 500) => {
    const [startLongPress, setStartLongPress] = useState(false);

    const start = useCallback(() => {
        setStartLongPress(true);
    }, []);

    const stop = useCallback(() => {
        setStartLongPress(false);
    }, []);

    useEffect(() => {
        let timerId;
        if (startLongPress) {
            timerId = setTimeout(callback, ms);
        } else {
            clearTimeout(timerId);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [startLongPress, callback, ms]);

    return {
        onMouseDown: start,
        onMouseUp: stop,
        onMouseLeave: stop,
        onTouchStart: start,
        onTouchEnd: stop,
    };
};

export default useLongPress;
