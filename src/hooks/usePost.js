import { useState } from 'react';
import axios from '../utils/api-client';
import useHandleError from './useHandleError';
import Swal from 'sweetalert2';

export const usePost = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleError = useHandleError();

  const post = async (body) => {
    setLoading(true);
    try {
      const response = await axios.post(url, JSON.stringify(body), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData(response.data);
      const successMessage = response.data?.message || 'Request was successful!';
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successful!',
        text: successMessage,
        showConfirmButton: true,
      });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, post };
};
