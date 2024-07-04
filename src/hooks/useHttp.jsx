import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();
    
    if(!response.ok) {
        throw new Error(resData.message || 'Error sending http request');
    }
    return resData;
}




export default function useHttp(url, config) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isError, setIsError] = useState();
    
    const sendRequest = useCallback(async function sendRequest(url, config) {
        setIsLoading(true);
        try{
            const resData = await sendHttpRequest(url, config);
            setData(resData);
        }
        catch(error) {
            setIsError(error.message || 'error sendRequest')
        }
        setIsLoading(false);
    })

    useEffect(()=>{
        if(config && (config.method === 'GET' || !config.method)) {
            sendRequest(url, config)
        }
    }, [sendRequest, config])

    return {
        isLoading,
        isError,
        data,
        sendRequest,
    }



}