import Swal from 'sweetalert2';

export const createSuccess = () => {
  return Swal.fire({
    title: 'Success!',
    icon: 'success',
  });
};
