import { DependencyList, useEffect } from "react";

const useFetch = (url: string, onSuccess: (data: any) => any, deps?: DependencyList | undefined) => {
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then(onSuccess)
            .catch((err) => alert(err));
    }, deps);
};

export default useFetch;
