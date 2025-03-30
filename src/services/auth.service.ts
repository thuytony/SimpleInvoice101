import { authAxios, mainAxios } from '../api/axiosInstances';
import { appConfig } from '../config/app.config';
import { LoginCredentials, AuthResponse, UserProfile, UserProfileResponse } from '../types/auth.types';
import EncryptedStorage from 'react-native-encrypted-storage';
import qs from 'qs';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const params = {
        'client_id': appConfig.auth.clientId,
        'client_secret': appConfig.auth.clientSecret,
        'grant_type': appConfig.auth.grantType,
        'scope': appConfig.auth.scope,
        'username': credentials.username,
        'password': credentials.password,
      };

      const response = await authAxios.post('/oauth2/token', qs.stringify(params), {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // Check if response has the required data
      if (!response.data || !response.data.access_token) {
        throw new Error('Invalid response from auth server');
      }

      await EncryptedStorage.setItem('access_token', response.data.access_token);
      if (response.data.refresh_token) {
        await EncryptedStorage.setItem('refresh_token', response.data.refresh_token);
      }

      return response.data;
    } catch (error: any) {
      console.error('Login service error:', {
        message: error.message,
        response: error.response?.data,
      });
      throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }
  },

  getUserProfile: async (): Promise<UserProfile> => {
    const response = await mainAxios.get<UserProfileResponse>('/membership-service/1.0.0/users/me');
    const orgToken = response.data.data.memberships[0].token;
    await EncryptedStorage.setItem('org_token', orgToken);
    return response.data.data;
  },

  logout: async () => {
    await EncryptedStorage.clear();
  },
};