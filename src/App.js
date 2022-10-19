import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import { Header } from "components/Header";
import { FullPost } from "pages/FullPost";
import { Home } from "pages/Home";
import { AddPost } from "pages/AddPost";
import { Login } from "pages/Login";
import { Registration } from "pages/Registration";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserMe } from "redux/slice/userSlice";
import { fetchTags } from "redux/slice/postSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserMe());
    dispatch(fetchTags());
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/add_post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
