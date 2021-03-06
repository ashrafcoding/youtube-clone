import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { RootState } from "../redux/store";

function SignIn() {
  const dispatch = useDispatch();
  const accessToken = useSelector<RootState>((state) => state.auth.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const handleLogin = () => {
    dispatch(login());
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      <Paper sx={{ width: 500, margin: "auto", py: 10, px: 5 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="./assets/google.svg"
            alt="google"
            style={{ width: "100px" }}
          />
          <Typography variant="h5">Sign in</Typography>
          <Typography sx={{ my: 3, fontWeight: 500 }}>
            to continue to YouTube
          </Typography>
        </Box>
        <TextField
          label="Email or Phone"
          variant="outlined"
          helperText={
            <Typography
              variant="caption"
              sx={{ color: "primary.main", fontWeight: 500 }}
            >
              Forgot email?
            </Typography>
          }
          sx={{ width: "100%", my: 4 }}
        />
        <Typography sx={{ textAlign: "left" }}>
          Not your computer? Use a Private Window to sign in.
        </Typography>
        <Typography sx={{ textAlign: "left", color: "primary.main" }}>
          Learn more
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            py: 3,
          }}
        >
          <Button variant="text">Create account </Button>
          <Button variant="contained" onClick={handleLogin}>
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default SignIn;
