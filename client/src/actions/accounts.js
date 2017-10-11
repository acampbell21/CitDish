import axios from 'axios'
import { setFlash } from './flash';
import { setHeaders } from './headers';

export const updateAccount = (name, phone, password, email, company_name) => {
  return (dispatch) => {
    axios.put('/api/auth', {name, phone, password, email, company_name})
      .then( res => {
        const { data: { data: user }, headers } = res;
        dispatch(setFlash('Successfully Updated Account!', 'green'));
        dispatch({ type: 'LOGIN', user, headers });
      })
      .catch( res => {
        dispatch(setFlash('Error Updating Account details', 'error'));
        dispatch(setHeaders(res.headers));
    });
  }
}

export const handleUpload = (image, callback) => {
  return(dispatch) => {
    let data = new FormData();
    data.append(image.name, image)
    axios.post('/api/images/user_image', data)
      .then( res => {
        const { data: image, headers } = res;
        dispatch(setFlash('Successfully Uploaded User Image!', 'green'));
        dispatch({type: 'SET_IMAGE', image, headers });
        callback();
      })
      .catch( res => {
        dispatch(setFlash('Error uploading file. Please try again!', 'error'));
        dispatch(setHeaders(res.headers));
    });
  }
}

export const uploadCompanyImage = (company_image, callback) => {
  return(dispatch) => {
    let data = new FormData();
    data.append(company_image.name, company_image)
    axios.post('/api/images/company_image', data)
      .then( res => {
        const { data: company_image, headers } = res;
        dispatch(setFlash('Successfully Uploaded Company Image!', 'green'));
        dispatch({type: 'SET_COMPANY_IMAGE', company_image, headers });
        callback();
      })
      .catch( res => {
        dispatch(setFlash('Error uploading file. Please try again!', 'error'));
        dispatch(setHeaders(res.headers));
    });
  }
}
