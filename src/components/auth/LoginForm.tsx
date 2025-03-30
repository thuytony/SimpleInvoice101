import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { login } from '../../store/slices/authSlice';
import { loginSchema } from '../../validations';

interface LoginFormData {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('onSubmit data', data);
    dispatch(login(data));
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="username"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
            <>
          <TextInput
            placeholder="Username"
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label={"Username"}
            testID='username'
          />
          <HelperText type="error" visible={!!errors.username}>
            {errors.username?.message}
          </HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
            <>
          <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label={"Password"}
            testID='password'
          />
          <HelperText type="error" visible={!!errors.password}>
            {errors.password?.message}
          </HelperText>
          </>
        )}
      />
      <Button mode="contained" onPress={handleSubmit(onSubmit)} testID='login_btn'>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});