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
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const Desktop = useMediaQuery("(min-width:43.75rem)");

  return (
    <Grid item>
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
          style: { fontSize: Desktop ? "1.375rem" : "0.875rem" },
        }}
        InputLabelProps={{
          style: {
            fontSize: Desktop ? "1.5rem" : "1rem",
            color: "#3a54fb",
          },
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
