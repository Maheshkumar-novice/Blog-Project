import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Notification from "./components/Notification";
import React, { useEffect, useState } from "react";
import Post from "./components/posts/Post";

export const userContext = React.createContext(null);

function App() {
  const [user, setUser] = useState({});

  return (
    <userContext.Provider value={{user: [user, setUser]}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Post path='explore'/>} />
            <Route path="login" element={<Login />}/>
            <Route path="register" element={<Register />} />
            <Route path="mypost" element={<Post path='mypost' />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
