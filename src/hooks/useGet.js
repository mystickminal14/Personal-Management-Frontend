import React, { useContext, useEffect, useState, useCallback } from 'react';
import { AppContext } from '../context/ContextApp';
import useHandleError from './useHandleError';
import axios from '../utils/api-client';

const useGet = (url) => {
    const [data, setData] = useState(null);
    const { setIsLoading, refresh } = useContext(AppContext);
    const handleError = useHandleError();

    const handleData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    }, [url, setIsLoading, handleError]);

    useEffect(() => {
        handleData();
    }, [url, handleData]);

    useEffect(() => {
        if (refresh) {
            handleData();
        }
    }, [refresh, handleData]);

    return { data, refetch: handleData };
};

export default useGet;
