import { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { useTasks } from "../context/TaskContext";

const statusColors = {
  todo: "default",
  "in-progress": "warning",
  done: "success",
};

const statusLabels = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

const TaskCard = ({ task, onEdit }) => {
  const { updateTask, deleteTask } = useTasks();
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleStatusChange = async (e) => {
    setUpdating(true);
    await updateTask(task._id, { status: e.target.value });
    setUpdating(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await deleteTask(task._id);
    setDeleting(false);
  };

  const isOverdue =
    task.status !== "done" && dayjs(task.dueDate).isBefore(dayjs(), "day");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: isOverdue ? "1px solid" : "none",
          borderColor: isOverdue ? "error.main" : "transparent",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <Typography variant="h6" sx={{ pr: 1 }}>
              {task.title}
            </Typography>
            <Chip
              label={statusLabels[task.status]}
              color={statusColors[task.status]}
              size="small"
            />
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, minHeight: 40 }}
          >
            {task.description}
          </Typography>

          <Typography
            variant="caption"
            color={isOverdue ? "error.main" : "text.secondary"}
          >
            Due {dayjs(task.dueDate).format("MMM D, YYYY")}
            {isOverdue && " (overdue)"}
          </Typography>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2, justifyContent: "space-between" }}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={task.status}
              label="Status"
              onChange={handleStatusChange}
              disabled={updating}
            >
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>

          <Box>
            <Tooltip title="Edit">
              <IconButton onClick={() => onEdit(task)} size="small">
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={handleDelete}
                size="small"
                color="error"
                disabled={deleting}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default TaskCard;
