import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/ContextApp';
import useHandleError from './useHandleError';
import axios from '../utils/api-client';

const useGet = (url) => {
    const [data,setData]=useState(null)
    const { setIsLoading, isLoading } = useContext(AppContext);
  const handleError = useHandleError()
  const handleData=async()=>{
    setIsLoading(true)
    try{
        const response=await axios.get(url)
        setData(response.data)
        setIsLoading(false)

    }catch(error){
        handleError(error)
        setIsLoading(false)
    }

  }
  useEffect(()=>{
    handleData()
  },[url])
  return {data,url}
}

export default useGet
