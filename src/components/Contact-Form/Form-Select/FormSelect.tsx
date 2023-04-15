import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import {
  Control,
  Controller,
  FieldValues,
  FieldError,
  Merge,
  FieldErrorsImpl,
} from "react-hook-form";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";

type FormSelectProps = {
  name: string;
  yupName: string;
  control: Control<FieldValues, any>;
  width: number;
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  capitalize: (str: string) => string;
  displaySelectItem: (type: "child age" | "year group") => JSX.Element[];
};

const FormSelect = ({
  name,
  control,
  yupName,
  width,
  errors,
  capitalize,
  displaySelectItem,
}: FormSelectProps): JSX.Element => {
  return (
    <div>
      <Controller
        control={control}
        name={yupName}
        render={({ field }) => (
          <FormControl
            className="flex w-fit"
            required
            sx={{ m: 1, minWidth: width }}
          >
            <InputLabel
              style={{ fontSize: "22px", color: "#3a54fb" }}
              id={`${yupName}-label`}
            >
              {capitalize(name)}
            </InputLabel>
            <Select
              labelId={`${yupName}-label`}
              autoWidth
              className="bg-white"
              label={capitalize(name)}
              input={
                <OutlinedInput
                  sx={{ fontSize: "20px" }}
                  label={capitalize(name)}
                />
              }
              error={errors ? true : false}
              {...field}
            >
              {displaySelectItem(`${name as "child age" | "year group"}`)}
            </Select>
          </FormControl>
        )}
      />
      <Typography variant="inherit" color="textSecondary">
        {errors?.message?.toString()}
      </Typography>
    </div>
  );
};

export default FormSelect;
