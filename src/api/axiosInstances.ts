import { Platform, Alert } from 'react-native';
import axios from 'axios';
import { appConfig } from '../config/app.config';
import EncryptedStorage from 'react-native-encrypted-storage';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';
import qs from 'qs';

// Auth API instance
export const authAxios = axios.create({
  baseURL: appConfig.api.authBaseUrl,
  timeout: appConfig.api.timeout,
});

// Main API instance
export const mainAxios = axios.create({
  baseURL: appConfig.api.baseUrl,
  timeout: appConfig.api.timeout,
});

// Flag to prevent multiple refresh token calls
let isRefreshing = false;
let failedQueue: any[] = [];

// Add flag to track if popup is showing
let isShowingExpiredAlert = false;

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const refreshToken = async () => {
    throw new Error('refresh token error');
};

const handleLogout = () => {
  // Only show alert if not already showing
  if (!isShowingExpiredAlert) {
    isShowingExpiredAlert = true;
    Alert.alert(
      'Session Expired',
      'Your session has expired. Please login again.',
      [
        {
          text: 'OK',
          onPress: () => {
            store.dispatch(logout());
            isShowingExpiredAlert = false; // Reset flag after handling
          },
        },
      ],
      { 
        cancelable: false,
        onDismiss: () => {
          isShowingExpiredAlert = false; // Reset flag if alert is dismissed
        }
      }
    );
  }
};

// Add request interceptor for main API
mainAxios.interceptors.request.use(
  async (config) => {
    const token = await EncryptedStorage.getItem('access_token');
    const orgToken = await EncryptedStorage.getItem('org_token');
    
    // Add authorization headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (orgToken) {
      config.headers['org-token'] = orgToken;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for main API
mainAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is not 401 or request already retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // If token refresh is in progress, queue the request
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return mainAxios(originalRequest);
        })
        .catch(err => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newToken = await refreshToken();
      processQueue(null, newToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return mainAxios(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      handleLogout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
); 