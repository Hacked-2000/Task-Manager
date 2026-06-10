import { Box, Container, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <Box className="auth-page">
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={8} sx={{ p: 4, mt: 8 }}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <TaskAltIcon sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
              <Typography variant="h4" gutterBottom>
                {title}
              </Typography>
              <Typography color="text.secondary">{subtitle}</Typography>
            </Box>
            {children}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AuthLayout;
