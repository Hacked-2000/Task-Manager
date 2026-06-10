import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validation";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const validate = () => {
    const nextErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };
    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const result = await register(form);
    setSubmitting(false);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setApiError(result.message);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Start organizing your work">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {apiError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {apiError}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          margin="normal"
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          disabled={submitting}
          sx={{ mt: 2 }}
        >
          {submitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Sign Up"
          )}
        </Button>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2" component="span" color="text.secondary">
            Already registered?{" "}
          </Typography>
          <Link component={RouterLink} to="/login" underline="hover">
            Sign in
          </Link>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Register;
