import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { FullPost } from "./pages/FullPost";
import { Home } from "./pages/Home";
import { AddPost } from "./pages/AddPost";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserMe } from "redux/slice/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if ("token" in window.localStorage) {
      dispatch(fetchUserMe(window.localStorage.getItem("token")));
    }
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<FullPost />*/}
          {/*<AddPost />*/}
          <Route path="/login" element={<Login />} />

          {/*<Registration />*/}
        </Routes>
      </Container>
    </>
  );
}

export default App;
