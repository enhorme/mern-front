import React from "react";
import { Avatar, Button, Paper, TextField, Typography } from "@mui/material";

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegisterUser, selectUserAuth } from "redux/slice/userSlice";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const isAuth = useSelector(selectUserAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
    },
    mode: "onChange",
  });

  async function onSubmit(value) {
    try {
      const { payload } = await dispatch(fetchRegisterUser(value));
      if ("token" in payload) {
        window.localStorage.setItem("token", payload.token);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Полное имя"
          fullWidth
          error={!!errors.fullName?.message}
          helperText={!!errors.fullName?.message}
          {...register("fullName", { required: "Введите полное имя" })}
        />
        <TextField
          className={styles.field}
          type="email"
          label="E-Mail"
          fullWidth
          error={!!errors.email?.message}
          helperText={!!errors.email?.message}
          {...register("email", { required: "Введите корректный email" })}
        />
        <TextField
          className={styles.field}
          type="password"
          label="Пароль"
          fullWidth
          error={!!errors.email?.message}
          helperText={!!errors.email?.message}
          {...register("password", { required: "Введите пароль" })}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
