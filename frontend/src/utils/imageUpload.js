import axios from 'axios';
import { toast } from 'react-toastify';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ig-clone');

  let first = true;

  try {
    toast.info('Upload in progress', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const { data } = await axios.post(
      process.env.REACT_APP_CLOUDINARY_URL,
      formData,
      {
        onUploadProgress: (p) => {
          const progress = p.loaded / p.total;

          console.log(typeof progress);
        },
      }
    );
    return data;
  } catch (err) {
    toast.error('❕ Failed to upload', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
