import Swal from 'sweetalert2';

export const createError = (msg, target) => {
  return Swal.fire({
    title: 'Error!',
    text: msg,
    icon: 'error',
    target: document.getElementById(target),
  });
};
