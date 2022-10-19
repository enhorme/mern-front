import React from "react";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectUserAuth, userLogout } from "redux/slice/userSlice";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const isAuth = useSelector(selectUserAuth);
  const dispatch = useDispatch();

  async function handleLogout() {
    await dispatch(userLogout());
    window.localStorage.removeItem("token");
  }

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <a className={styles.logo} href="/">
            <div>MERN FRONT</div>
          </a>
          <div className={styles.buttons}>
            {!isAuth ? (
              <>
                <NavLink to="/login">
                  <Button variant="outlined">Sign In</Button>
                </NavLink>
                <NavLink to="/register">
                  {" "}
                  <Button variant="contained">Register</Button>
                </NavLink>{" "}
              </>
            ) : (
              <>
                <NavLink to="/add_post">
                  <Button variant="contained">Add post</Button>
                </NavLink>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
