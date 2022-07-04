import "@mui/material";
import "react-icons";
import "react-icons/bi";
import "react-icons/md";
import "react-icons/bs";
import "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./theme";

import ProfileView from "./components/views/ProfileView";
import LoginView from "./components/views/LoginView";
import SignupView from "./components/views/SignupView";
import ForgetPassword from "./components/views/ForgetPasswordView";
import MainView from "./components/views/MainView";
import StoryView from "./components/views/StoryView";
import SearchView from "./components/views/SearchView";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<MainView />} />
          <Route path='/story' element={<StoryView />} />
          <Route path='/search' element={<SearchView />} />
          <Route path='/users/:id' element={<ProfileView />} />
          <Route path='/login' element={<LoginView />} />
          <Route path='/signup' element={<SignupView />} />
          <Route path='/forgetPassword' element={<ForgetPassword />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
