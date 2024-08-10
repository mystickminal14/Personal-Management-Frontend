import { useContext, useState } from 'react';
import axios from '../utils/api-client';
import useHandleError from './useHandleError';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/ContextApp';

export const usePost = (url) => {
  const { setIsLoading ,    setRefreshData,refresh} = useContext(AppContext);
  const [data, setData] = useState(null);
  const handleError = useHandleError();
  const [path, setPath] = useState();
  const navigate = useNavigate();

  const post = async (body) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        url,
        body,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setData(response.data);
      const successMessage = response.data?.message || 'Request was successful!';
      setIsLoading(false);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successful!',
        text: successMessage,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setRefreshData(!refresh);
          navigate(path);

        }
      });
    } catch (error) {
      setIsLoading(false);
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, post, setPath };
};
