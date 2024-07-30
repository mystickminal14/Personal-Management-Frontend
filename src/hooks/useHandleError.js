import React, { useCallback } from 'react'
import Swal from 'sweetalert2';
const useHandleError = () => {
 const handleError=useCallback((error)=>{
    
    if (error.response) {
       
        const errorMessage = error.response.data?.message || 'Server Error!';
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Request Error!",
          text: errorMessage,
          showConfirmButton: true,
        });
      } else if (error.request) {
     
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Network Error!",
          text: "No response received from the server. Please check your network connection.",
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Request Setup Error!",
          text: error.message || "An error occurred while setting up the request.",
          showConfirmButton: true,
        });
      }
 },[])
 return handleError;
}

export default useHandleError
