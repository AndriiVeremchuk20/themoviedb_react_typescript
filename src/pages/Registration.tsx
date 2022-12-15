import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  styled,
  Card,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IUser } from "../types/user";
import { v4 as uuidv4 } from "uuid";
import { addUser, checkUniqueEmail, getCurrUser } from "../utils/users";
import useLocalStorage from "use-local-storage";
import { localStorageKeys, themeMode } from "../types/apps";
import { getBrovserTheme } from "../utils/getBrowserTheme";

const styles = {
  root: {
    width: "100%",
    height: "100vh",
  },
  paper: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    width: "100%",
    marginY: "10px",
  },
};

const regexp = {
  text: /[A-z,А-я-яєії]{2,15}$/,
  numberPhone: /0[0-9]{9}$/,
  email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
  password: /[0-9a-zA-Z]{6,}$/,
};

export const Registration = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [psw, setPsw] = useState<string>("");
  const [repPsw, setRepPsw] = useState<string>("");

  const [showDone, setShowDone] = useState<boolean>(false);

  const [theme, setTheme] = useLocalStorage<themeMode>(
    localStorageKeys.theme,
    getBrovserTheme()
  );

  const onResetClick = useCallback(() => {
    setName("");
    setSurname("");
    setEmail("");
    setTel("");
    setPsw("");
    setRepPsw("");
  }, []);

  const onRegisterClick = () => {
    if (!regexp.text.test(name)) {
      alert("invalid name");
    } else if (!regexp.text.test(surname)) {
      alert("invalid surname");
    } else if (!regexp.numberPhone.test(tel)) {
      alert("invalid phone");
    } else if (checkUniqueEmail(email)) {
      alert("email alredy exist");
    } else if (!regexp.email.test(email)) {
      alert("invalid email");
    } else if (!regexp.password.test(psw)) {
      alert("invalid password");
    } else if (psw !== repPsw) {
      alert("Passwords do not match");
    } else {
      const User: IUser = {
        id: uuidv4(),
        name: name,
        surname: surname,
        phone: tel,
        email: email,
        password: psw,
        favoriteMovies: [],
        userSetting: {
          local: i18n.language,
          theme: theme,
        },
      };

      addUser(User);

      setShowDone(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const handleInput = useCallback(
    (value: string, foo: (val: string) => void) => {
      if (value.length < 30) foo(value);
    },
    []
  );

  return (
    <div style={styles.root}>
      <Paper elevation={3} style={styles.paper}>
        <Card>
          <Typography variant="h4" sx={{ margin: "10px 0 10px 20px" }}>
            {t("register")}
          </Typography>
          {showDone ? (
            <Box
              p={1}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="30vh"
            >
              <Typography sx={{ margin: "0 20px 0 0" }} variant="h3">
                Registration completed successfully ✅{" "}
              </Typography>
              <CircularProgress
                sx={{ margin: "20px 0 0 0" }}
                size="100px"
                color="secondary"
              />
            </Box>
          ) : (
            <Form autoComplete="off">
              <InputData
                error={!regexp.text.test(name)}
                value={name}
                onChange={(e) => {
                  handleInput(e.target.value, setName);
                }}
                required
                type="text"
                label={t("name")}
                variant="outlined"
              />
              <InputData
                error={!regexp.text.test(surname)}
                onChange={(e) => {
                  handleInput(e.target.value, setSurname);
                }}
                value={surname}
                type="text"
                label={t("surname")}
                variant="outlined"
              />
              <InputData
                error={!regexp.numberPhone.test(tel)}
                onChange={(e) => {
                  handleInput(e.target.value, setTel);
                }}
                value={tel}
                required
                type="phone"
                label={t("phone") + "(099-999-99-99)"}
                variant="outlined"
              />
              <InputData
                error={!regexp.email.test(email)}
                value={email}
                onChange={(e) => {
                  handleInput(e.target.value, setEmail);
                }}
                required
                type="email"
                label={t("email")}
                variant="outlined"
              />
              <InputData
                error={!regexp.password.test(psw)}
                required
                label={t("password")}
                variant="outlined"
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  handleInput(e.target.value, setPsw);
                }}
                value={psw}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <InputData
                error={psw !== repPsw}
                required
                label={t("repeat_password")}
                variant="outlined"
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  handleInput(e.target.value, setRepPsw);
                }}
                value={repPsw}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <ButtonGroup sx={{ alignSelf: "center" }}>
                <Button onClick={onResetClick}>{t("reset")}</Button>
                <Button onClick={onRegisterClick}>{t("register")}</Button>
              </ButtonGroup>
              <Typography
                sx={{
                  alignSelf: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <a href="/login">{t("login")}</a>
                <a href="/">{t("homepage")}</a>
              </Typography>
            </Form>
          )}
        </Card>
      </Paper>
    </div>
  );
};


const InputData = styled(TextField)(({ theme }) => ({
  width: "95%",
  margin: theme.spacing(1),
}));

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  margin: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    width: "95vw",
    height: "auto",
  },
  [theme.breakpoints.up("md")]: {
    width: "60vw",
  },
}));
