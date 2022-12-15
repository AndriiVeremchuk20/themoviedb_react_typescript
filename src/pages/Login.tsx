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
  CircularProgress,
  Alert,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useActions } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";


export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [login, setLogin] = useState<string>("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const { setUser } = useActions();
  const user = useTypedSelector((state) => state.user);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleResetClick = useCallback(() => {
    setPassword("");
    setLogin("");
  }, []);

  const handleLoginClick = () => {
    setUser(login, password);
  };

  useEffect(() => {
    if (user.user) {
      navigate("/");
    }
  }, [user.user]);

  return (
    <div style={styles.root}>
      <Paper elevation={3} style={styles.paper}>
        <Card>
          {user.error && <Alert severity="error">{user.error}</Alert>}
          <Form>
            <Typography variant="h4" sx={{ margin: "10px auto" }}>
              {t("login")}
            </Typography>
            <InputData
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
              }}
              autoComplete="off"
              autoFocus
              required
              type="email"
              label="Email"
              variant="outlined"
            />
            <InputData
              required
              value={password}
              label={t("password")}
              variant="outlined"
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
              <Button onClick={handleResetClick}>{t("reset")}</Button>
              <Button onClick={handleLoginClick}>
                {user.pending ? (
                  <CircularProgress color="primary" size={20} />
                ) : (
                  t("login")
                )}
              </Button>
            </ButtonGroup>
            <Typography
              sx={{
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "10px 0 10px 0",
              }}
            >
              <a href="/registration">{t("register")}</a>
              <a href="/">{t("homepage")}</a>
            </Typography>
          </Form>
        </Card>
      </Paper>
    </div>
  );
};


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

const InputData = styled(TextField)(({ theme }) => ({
  width: "95%",
  margin: theme.spacing(1),
}));

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: theme.spacing(1),
  "&>*": { margin: "10px" },
  [theme.breakpoints.down("md")]: {
    width: "95vw",
    height: "auto",
  },
  [theme.breakpoints.up("md")]: {
    width: "60vw",
  },
}));