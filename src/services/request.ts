import Cookies from 'js-cookie';
import axios from 'axios';

export const request = axios.create({
  baseURL: '',
  withCredentials: true,
  headers: {
    Authorization: Cookies.get('Authorization')
  }
})

export const API_URL = process.env.API_DOMAIN || window.location.origin;