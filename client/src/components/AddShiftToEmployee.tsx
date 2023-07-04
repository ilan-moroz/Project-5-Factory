import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { RootState } from "../redux/Store";
import { useSelector } from "react-redux";
import { fetchAddShiftToEmployee } from "../utils/fetchData";

type shiftProps = {
  employeeId: string;
};

export default function ShiftEmployeeFormDialog(props: shiftProps) {
  const [open, setOpen] = React.useState(false);

  const shifts = useSelector((state: RootState) => state.shifts.allShifts);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = async (data: any) => {
    const { employeeId } = props;
    try {
      const response = await fetchAddShiftToEmployee(data.shift, employeeId);
      console.log(response);
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function formatDate(dateString: string) {
    const dateParts = dateString.split("T")[0].split("-");
    const rearrangedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    return rearrangedDate;
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <AddIcon color="success" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Shift To Employee</DialogTitle>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <DialogContent>
            <DialogContentText>
              To add a new shift to the employee, please choose a shift from the
              list.
            </DialogContentText>
            <TextField
              sx={{ mt: 2 }}
              {...register("shift", { required: true })}
              id="shift"
              select
              label="Shift"
              fullWidth
              defaultValue=""
              error={errors.shift ? true : false}
              helperText={errors.shift && "Shift is required"}
            >
              {shifts.map((option: any) => (
                <MenuItem key={option._id} value={option._id}>
                  {formatDate(option.date)} : {option.startTime}-
                  {option.endTime}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}