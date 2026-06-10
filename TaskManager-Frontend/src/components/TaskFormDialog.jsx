import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useTasks } from "../context/TaskContext";
import { validateTaskForm } from "../utils/validation";

const defaultForm = {
  title: "",
  description: "",
  status: "todo",
  dueDate: null,
};

const TaskFormDialog = ({ open, onClose, task }) => {
  const { createTask, updateTask } = useTasks();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isEdit = Boolean(task);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: dayjs(task.dueDate),
      });
    } else {
      setForm(defaultForm);
    }
    setErrors({});
    setApiError("");
  }, [task, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateTaskForm({
      title: form.title,
      description: form.description,
      dueDate: form.dueDate,
    });

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      dueDate: form.dueDate.toISOString(),
    };

    setSubmitting(true);
    const result = isEdit
      ? await updateTask(task._id, payload)
      : await createTask(payload);
    setSubmitting(false);

    if (result.success) {
      onClose();
    } else {
      setApiError(result.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Edit Task" : "New Task"}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          {apiError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {apiError}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            margin="normal"
            multiline
            rows={3}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={form.status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>
          <DatePicker
            label="Due Date"
            value={form.dueDate}
            onChange={(value) => {
              setForm((prev) => ({ ...prev, dueDate: value }));
              setErrors((prev) => ({ ...prev, dueDate: "" }));
            }}
            minDate={isEdit ? undefined : dayjs().add(1, "day")}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
                error: !!errors.dueDate,
                helperText: errors.dueDate,
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {isEdit ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default TaskFormDialog;
