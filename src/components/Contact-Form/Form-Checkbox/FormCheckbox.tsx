import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Control, Controller, FieldValues } from "react-hook-form";
import Typography from "@mui/material/Typography";

export type FormCheckboxProps = {
  name: string;
  control: Control<FieldValues, any>;
  capitalize: (str: string) => string;
};

const FormCheckbox = ({
  name,
  control,
  capitalize,
}: FormCheckboxProps): JSX.Element => {
  return (
    <FormControlLabel
      control={
        <Controller
          name={`subjects.${name}`}
          control={control}
          render={({ field }) => <Checkbox {...field} />}
        />
      }
      label={
        <Typography className="self-end" variant="h5">
          {capitalize(name)}
        </Typography>
      }
      labelPlacement="end"
    />
  );
};

export default FormCheckbox;
