import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { ReactElement, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { MovieInfo } from "./pages/MovieInfo";
import { NoPage } from "./pages/NoPage";
import { Profile } from "./pages/Profile";
import { Registration } from "./pages/Registration";
import { localStorageKeys, themeMode } from "./types/apps";
import { getBrovserTheme } from "./utils/getBrowserTheme";
import { useActions } from "./hooks/useAction";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App: React.FC = (): ReactElement => {
  const [theme, setTheme] = useLocalStorage<themeMode>(
    localStorageKeys.theme,
    getBrovserTheme()
  );

  const app = useTypedSelector((store) => store.app);
  const user = useTypedSelector((store) => store.user);
  const { changeTheme, setCurrentUser } = useActions();

  useEffect(() => {
    setCurrentUser();
    changeTheme(theme);
  }, []);

  useEffect(() => {
    setTheme(app.currTheme);
  }, [app.currTheme]);

  useEffect(() => {
    if (user.user) changeTheme(user.user.userSetting.theme);
  }, [user.user?.userSetting.theme]);

  useEffect(() => {
    if (user.user) {
      i18n.changeLanguage(user.user.userSetting.local);
    }
  }, [user.user?.userSetting.local]);

  const currtheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={currtheme}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="registration" element={<Registration />} />
              <Route path="movie/:movieId" element={<MovieInfo />} />
              <Route path="login" element={<Login />} />

              <Route
                path="profile"
                element={
                  <ProtectedRoute user={user.user} redirectPath="/login">
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NoPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;
