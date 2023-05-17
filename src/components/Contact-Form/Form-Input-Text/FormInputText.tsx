import TextField from "@mui/material/TextField";
import {
  FieldValues,
  FieldError,
  Merge,
  FieldErrorsImpl,
  UseFormRegister,
} from "react-hook-form";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

type FormInputTextProps = {
  name: string;
  yupName: string;
  label: string;
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  multiline: boolean;
  register: UseFormRegister<FieldValues>;
};

const FormInputText = ({
  name,
  register,
  yupName,
  label,
  errors,
  multiline,
}: FormInputTextProps) => {
  return (
    <Grid item spacing={{ xs: 12 }}>
      <TextField
        className=" text-white bg-white"
        placeholder={`Enter your ${name}`}
        id={name}
        label={label}
        variant="outlined"
        fullWidth
        required
        multiline={multiline}
        rows={multiline ? 4 : 1}
        InputProps={{
          style: { fontSize: "22px" },
        }}
        InputLabelProps={{
          style: { fontSize: "24px", color: "#3a54fb" },
        }}
        {...register(yupName)}
        error={errors ? true : false}
        defaultValue=""
      />
      <Typography variant="inherit" color="textSecondary" className="text-left">
        {errors?.message?.toString()}
      </Typography>
    </Grid>
  );
};
export default FormInputText;
