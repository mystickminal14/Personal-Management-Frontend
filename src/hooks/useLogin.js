import { useState } from 'react';
import axios from '../utils/api-client';
import useHandleError from './useHandleError';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const useLogin = (url, body) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleError = useHandleError();
const navigate=useNavigate()
  const save = async () => {
    setLoading(true);
    try {
      const response = await axios.post(url, JSON.stringify(body));
      setData(response.data);
      const successMessage = response.data?.message || 'Request was successful!';
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successful!',
        text: successMessage,
        showConfirmButton: true,
      }).then((result)=>{
        if (result.isConfirmed) {
          navigate('/dashboard');
        }
      })
      
    
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, save };
};
