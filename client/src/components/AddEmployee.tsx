import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, store } from "../redux/Store";
import { fetchAddEmployee } from "../utils/fetchData";
import { addEmployeeAction } from "../redux/EmployeeReducer";
import { FormDialogBase } from "./FormDialogBase";

export default function AddEmployee() {
  const onSubmit = async (data: any) => {
    const response = await fetchAddEmployee(data);
    store.dispatch(addEmployeeAction(response));
  };

  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );

  return (
    <FormDialogBase
      title="Add Employee"
      contentText="To add a new employee, please fill up all the fields."
      onSubmit={onSubmit}
    >
      {(register, errors) => (
        <>
          <TextField
            {...register("firstName", { required: true })}
            error={errors.firstName ? true : false}
            helperText={errors.firstName && "First Name is required"}
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="Text"
            fullWidth
            variant="standard"
          />
          <TextField
            {...register("lastName", { required: true })}
            error={errors.lastName ? true : false}
            helperText={errors.lastName && "Last Name is required"}
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
            type="Text"
            fullWidth
            variant="standard"
          />
          <TextField
            {...register("startWorkYear", { required: true })}
            error={errors.startWorkYear ? true : false}
            helperText={errors.startWorkYear && "Start work year is required"}
            autoFocus
            margin="dense"
            id="startWorkYear"
            label="Start Year of Employment"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            sx={{ mt: 2 }}
            {...register("departmentId", { required: true })}
            id="department"
            select
            label="Department"
            fullWidth
            defaultValue=""
            error={errors.departmentId ? true : false}
            helperText={errors.departmentId && "Department is required"}
          >
            {departments.map((option: any) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </>
      )}
    </FormDialogBase>
  );
}
