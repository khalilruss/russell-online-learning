import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

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
};

const FormSelect = ({
  name,
  control,
  yupName,
  width,
  errors,
  capitalize,
}: FormSelectProps): JSX.Element => {
  const displaySelectItem = (type: "child age" | "year group") => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <MenuItem
          style={{ fontSize: "20px" }}
          value={type === "child age" ? i + 6 : `Year ${i + 2}`}
        >
          {type === "child age" ? i + 6 : `Year ${i + 2}`}
        </MenuItem>
      ));
  };

  return (
    <div>
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
        <Controller
          control={control}
          name={yupName}
          defaultValue=""
          render={({ field }) => (
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
          )}
        />
      </FormControl>

      <Typography variant="inherit" color="textSecondary">
        {errors?.message?.toString()}
      </Typography>
    </div>
  );
};

export default FormSelect;
