import { useEffect, useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../store/slices/authSlice';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await EncryptedStorage.getItem('access_token');
      const orgToken = await EncryptedStorage.getItem('org_token');
      
      if (token && orgToken) {
        dispatch(setAuthenticated(true));
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading };
}; 