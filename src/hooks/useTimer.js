import { useEffect, useRef } from "react";

export default function useTimer(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export function useTimer2(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick(deltaMS) {
            savedCallback.current(deltaMS);
        }
        if (delay !== null) {
            let id = absoluteSetInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const absoluteSetInterval = (handler, delay) => {
    let baseTime = Date.now();
    const callHandler = () => {
        let timePassedSinceLastCall = Date.now() - baseTime;
        console.log('timePassedSinceLastCall: ',timePassedSinceLastCall)
        if (timePassedSinceLastCall > 1000) {
            baseTime = Date.now(); // must be set before calling handler to avoid time delay in executing it
            handler(timePassedSinceLastCall);
        }
    };
    return setInterval(callHandler, delay);
};
