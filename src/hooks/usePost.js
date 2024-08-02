import {  useContext, useState } from 'react';
import axios from '../utils/api-client';
import useHandleError from './useHandleError';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/ContextApp';

export const usePost = (url) => {
  const {setIsloading}=useContext(AppContext)
  const [data, setData] = useState(null);
  const handleError = useHandleError();
 const [path,setPath]=useState()
 const navigate=useNavigate()
  const post = async (body) => {
    setIsloading(true);
    try {
      const response = await axios.post(url, JSON.stringify(body), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData(response.data);
      const successMessage = response.data?.message || 'Request was successful!';
      setIsloading(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successful!',
        text: successMessage,
        showConfirmButton: true,
      }).then((result)=>{
        if(result.isConfirmed){
          navigate(path)
        }
      })
    } catch (error) {
      setIsloading(false)
      handleError(error);
    } finally {
      setIsloading(false)
    }
  };

  return { data, post,setPath };
};
