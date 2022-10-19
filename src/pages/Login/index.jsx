import React from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRegisterUser,
  selectUserAuth,
  selectUserError,
} from 'redux/slice/userSlice';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import { fetchUser } from 'redux/slice/userSlice';
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const isAuth = useSelector(selectUserAuth);
  const isError = useSelector(selectUserError);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'test@test.test',
      password: '12345',
    },
    mode: 'onChange',
  });

  const onSubmit = async (value) => {
    const data = await dispatch(fetchUser(value));
    try {
      const { payload } = data;
      if ('token' in payload) {
        window.localStorage.setItem('token', payload.token);
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      {isError ? alert(isError) : null}
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          error={!!errors.email?.message}
          helperText={!!errors.email?.message}
          {...register('email', { required: 'введите емейл' })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          error={!!errors.password?.message}
          helperText={!!errors.password?.message}
          {...register('password', { required: 'введиет пароль' })}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
