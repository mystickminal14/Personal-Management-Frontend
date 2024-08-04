import { useContext, useState } from 'react';
import axios from '../utils/api-client';
import useHandleError from './useHandleError';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/ContextApp';

export const useLogin = (url, body) => {
  const [data, setData] = useState(null);
  const { setIsLoading, isLoading } = useContext(AppContext);
  const handleError = useHandleError();
  const navigate = useNavigate();

  const save = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(url, body);
      setData(response.data);
      setIsLoading(false);

      const successMessage = response.data?.message || 'Request was successful!';
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successful!',
        text: successMessage,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/app/dashboard');
        }
      });
    } catch (error) {
      setIsLoading(false);
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, save };
};
