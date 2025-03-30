import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

interface Props {
  onPress?: () => void;
}

export const LogoutButton = ({ onPress }: Props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'OK',
          style: 'destructive',
          onPress: () => {
              dispatch(logout());
              onPress?.();
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { 
        cancelable: true,
        onDismiss: () => {
        }
      }
    );
  };

  return (
    <IconButton
      icon="logout"
      onPress={handleLogout}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
}); 