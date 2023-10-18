import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Control, Controller, FieldValues } from "react-hook-form";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const Desktop = useMediaQuery("(min-width:43.75rem)");

  return (
    <FormControlLabel
      className="m-0"
      control={
        <Controller
          name={`subjects.${name}`}
          control={control}
          render={({ field: { value, ...field } }) => (
            <Checkbox
              size={Desktop ? "medium" : "small"}
              {...field}
              checked={!!value}
            />
          )}
        />
      }
      label={
        <Typography className="self-end" variant={Desktop ? "h5" : "subtitle1"}>
          {capitalize(name)}
        </Typography>
      }
      labelPlacement="end"
    />
  );
};

export default FormCheckbox;
