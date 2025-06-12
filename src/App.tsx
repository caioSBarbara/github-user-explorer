import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "./styles/AppStyles";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import UserProfile from "./pages/UserProfile/UserProfile";
import Repository from "./pages/Repository/Repository";
import NotFound from "./pages/NotFound/NotFound";

const App: React.FC = () => {
  return (
    <Container>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/user/:username/:repository" element={<Repository />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Container>
  );
};

export default App;
