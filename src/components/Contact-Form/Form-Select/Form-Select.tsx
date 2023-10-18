import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";

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

export type FormSelectProps = {
  name: string;
  yupName: string;
  control: Control<FieldValues, any>;
  width: `${number}rem`;
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
  const Desktop = useMediaQuery("(min-width:43.75rem)");
  const wrapSelects = useMediaQuery("(min-width:29.6875rem)");

  const displaySelectItem = (type: "child age" | "year group") => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <MenuItem
          key={type === "child age" ? i + 6 : `Year ${i + 2}`}
          style={{ fontSize: Desktop ? "1.25rem" : "0.75rem" }}
          value={type === "child age" ? i + 6 : `Year ${i + 2}`}
        >
          {type === "child age" ? i + 6 : `Year ${i + 2}`}
        </MenuItem>
      ));
  };

  return (
    <div className="flex flex-col">
      <FormControl
        className={`flex w-fit ${
          name === "child age" ? (wrapSelects ? "" : "pb-3") : ""
        }`}
        required
        sx={{ minWidth: width }}
      >
        <InputLabel
          style={{
            fontSize: Desktop ? "1.375rem" : "0.975rem",
            color: "#3a54fb",
          }}
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
                  sx={{
                    fontSize: Desktop ? "1.25rem" : "0.75rem",
                  }}
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
