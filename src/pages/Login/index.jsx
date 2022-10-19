import React from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAuth } from "redux/slice/userSlice";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { fetchUser } from "redux/slice/userSlice";
import { Navigate } from "react-router-dom";

export const Login = () => {
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
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (value) => {
    const { payload } = await dispatch(fetchUser(value));
    if ("token" in payload) {
      console.log("true");
      window.localStorage.setItem("token", payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
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
          {...register("email", { required: "введите емейл" })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          error={!!errors.password?.message}
          helperText={!!errors.password?.message}
          {...register("password", { required: "введиет пароль" })}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
