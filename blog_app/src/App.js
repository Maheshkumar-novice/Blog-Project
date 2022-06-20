import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header/>} />
        <Route index element={
          <>
            <div>hih</div>
          </>
        } />
        <Route path="login"
        element={
          <>
            <div>login</div>
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
