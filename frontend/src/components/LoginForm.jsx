import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
// import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
    // const { login } = useAuth();
    // const [credentials, setCredentials] = useState({ email: "", password: "" });
    // const [error, setError] = useState("");

    // const handleChange = (e) => {
    //     setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const success = await login(credentials);
    //     if (!success) {
    //         setError("Invalid email or password");
    //     }
    // };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" mb={2}>Login</Typography>
            {/* {error && <Typography color="error">{error}</Typography>} */}
            <form >
                <TextField id="input-with-icon-adornment" variant="filled" fullWidth name="Mobile" label="Email" margin="normal" />
                <TextField id="filled-basic" variant="filled" fullWidth name="password" label="Password" type="password" margin="normal" />
                <Button id="filled-basic" fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>Login</Button>
            </form>
        </Box>
    );
};

export default LoginForm;
