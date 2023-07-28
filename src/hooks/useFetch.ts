import { DependencyList, useEffect } from "react";

const useFetch = (url: string, onSuccess: (data: any) => any, deps?: DependencyList | undefined, skip = false) => {
    useEffect(() => {
        if (skip) return;
        fetch(url)
            .then((res) => res.json())
            .then(onSuccess)
            .catch((err) => alert(err));
    }, deps);
};

export default useFetch;
