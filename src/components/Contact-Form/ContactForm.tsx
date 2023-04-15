import { useRef, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import FormInputText from "./Form-Input-Text/FormInputText";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

import {
  useForm,
  FieldValues,
  Control,
  FieldErrors,
  Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { MenuItem, Select } from "@mui/material";
import FormCheckbox from "./Form-Checkbox/FormCheckbox";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  message: Yup.string().required("Please type a message"),
  subjects: Yup.object()
    .shape({
      maths: Yup.boolean(),
      english: Yup.boolean(),
    })
    .test("multiCheckbox", "Select at least one subject", (options) => {
      return options.maths || options.english;
    }),
  childAge: Yup.string().required("Select the child's age"),
  yearGroup: Yup.string().required("Select the child's year group"),
});
//subject

export type FormInputProps = {
  name: string;
  control: Control<FieldValues>;
  label: string;
  errors: FieldErrors<FieldValues>;
};

const ContactForm = (): JSX.Element => {
  const form = useRef<HTMLFormElement | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form.current as HTMLFormElement,
        "YOUR_PUBLIC_KEY"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const onSubmit = (data: FieldValues) => {
    console.log(JSON.stringify(data, null, 2));
  };

  const capitalize = (str: string): string => {
    const words = str.split(" ");
    return words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(" ");
  };

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
    // bg-light-grey
    // bg-regal-blue

    <Card elevation={8} className="bg-light-grey">
      <CardHeader
        className="w-full bg-regal-blue text-white"
        title={
          <Typography
            className="whitespace-nowrap font-medium"
            variant="h2"
            component="h1"
          >
            Contact Me
          </Typography>
        }
        subheader={
          <Typography className="whitespace-nowrap text-[25px]" variant="h6">
            To book a session please send me a message using this contact form
            <br /> and I will aim to respond within 3 - 5 working days
          </Typography>
        }
      />
      <CardContent>
        <Grid className="flex-col" container spacing={3}>
          <Grid className="flex justify-evenly items-center m-0" item>
            {["child age", "year group"].map((value) => {
              let width = value === "child age" ? 165 : 175;
              let name = value === "child age" ? "childAge" : "yearGroup";
              return (
                <div>
                  <Controller
                    control={control}
                    name={name}
                    render={({ field }) => (
                      <FormControl
                        className="flex w-fit"
                        required
                        sx={{ m: 1, minWidth: width }}
                      >
                        <InputLabel
                          style={{ fontSize: "22px", color: "#3a54fb" }}
                          id={`${name}-label`}
                        >
                          {capitalize(value)}
                        </InputLabel>
                        <Select
                          labelId={`${name}-label`}
                          autoWidth
                          className="bg-white"
                          label={capitalize(value)}
                          input={
                            <OutlinedInput
                              sx={{ fontSize: "20px" }}
                              label={capitalize(value)}
                            />
                          }
                          error={errors[`${name}`] ? true : false}
                          {...field}
                        >
                          {value === "child age"
                            ? displaySelectItem("child age")
                            : displaySelectItem("year group")}
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors[`${name}`]?.message?.toString()}
                  </Typography>
                </div>
              );
            })}
            <FormControl
              className="flex-col m-0"
              sx={{ m: 3 }}
              component="fieldset"
              variant="standard"
              error={errors.subject ? true : false}
            >
              <FormLabel
                style={{ fontSize: "25px", color: "#3a54fb" }}
                className="w-full"
                component="legend"
              >
                Subject
              </FormLabel>
              <FormGroup className="flex-row">
                {["maths", "english"].map((subject) => {
                  return (
                    <FormCheckbox
                      name={subject}
                      control={control}
                      capitalize={capitalize}
                    />
                  );
                })}
              </FormGroup>
              <Typography variant="inherit" color="textSecondary">
                {errors?.subjects?.message?.toString()}
              </Typography>
            </FormControl>
          </Grid>
          {["name", "email", "message"].map((field) => {
            return (
              <FormInputText
                name={field}
                label={capitalize(field)}
                register={register}
                errors={errors[`${field}`]}
                multiline={field === "message" ? true : false}
              />
            );
          })}
          <Grid item spacing={{ xs: 8 }}>
            <Button
              type="submit"
              variant="contained"
              className="bg-regal-blue text-white text-[25px]"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
