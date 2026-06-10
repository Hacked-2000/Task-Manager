import { useEffect, useState } from "react";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import TaskFormDialog from "../components/TaskFormDialog";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { tasks, loading, error, fetchTasks } = useTasks();
  const [statusFilter, setStatusFilter] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks(statusFilter);
  }, [fetchTasks, statusFilter]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const openCreateDialog = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const openEditDialog = (task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingTask(null);
  };

  return (
    <Box className="dashboard-page">
      <AppBar position="sticky" elevation={0} color="transparent">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TaskAltIcon color="primary" />
            <Typography variant="h6">Task Manager</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {user?.name}
            </Typography>
            <Button
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              color="inherit"
              size="small"
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mb: 3,
            }}
          >
            <Typography variant="h4">Your Tasks</Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Filter</InputLabel>
                <Select
                  value={statusFilter}
                  label="Filter"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="todo">To Do</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={openCreateDialog}
              >
                Add Task
              </Button>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Grid container spacing={3}>
              {[1, 2, 3].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <Skeleton variant="rounded" height={220} />
                </Grid>
              ))}
            </Grid>
          ) : tasks.length === 0 ? (
            <Box className="empty-state">
              <TaskAltIcon sx={{ fontSize: 64, opacity: 0.3, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No tasks yet
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {statusFilter
                  ? "Nothing matches this filter. Try another status."
                  : "Create your first task to get started."}
              </Typography>
              {!statusFilter && (
                <Button variant="outlined" onClick={openCreateDialog}>
                  Create Task
                </Button>
              )}
            </Box>
          ) : (
            <Grid container spacing={3}>
              <AnimatePresence>
                {tasks.map((task) => (
                  <Grid item xs={12} sm={6} md={4} key={task._id}>
                    <TaskCard task={task} onEdit={openEditDialog} />
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>
          )}
        </motion.div>
      </Container>

      <TaskFormDialog
        open={dialogOpen}
        onClose={closeDialog}
        task={editingTask}
      />
    </Box>
  );
};

export default Dashboard;
