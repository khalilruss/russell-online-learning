import { useState } from "react";
import emailjs from "@emailjs/browser";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import FormInputText from "./Form-Input-Text/Form-Input-Text";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormCheckbox from "./Form-Checkbox/Form-Checkbox";
import FormSelect from "./Form-Select/Form-Select";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const validationSchema = Yup.object().shape({
  contact_name: Yup.string().required("Name is required"),
  contact_email: Yup.string()
    .required("Email is required")
    .matches(emailRegex, "Email is invalid"),
  message: Yup.string().required("Please type a message"),
  subjects: Yup.object()
    .shape({
      maths: Yup.boolean(),
      english: Yup.boolean(),
    })
    .test("multiCheckbox", "Select at least one subject", (options) => {
      return options.maths || options.english;
    }),
  child_age: Yup.string().required("Select the child's age"),
  year_group: Yup.string().required("Select the child's year group"),
});

const defaultValues = {
  contact_name: "",
  contact_email: "",
  message: "",
};

const ContactForm = (): JSX.Element => {
  const [isDisabled, setIsDisabled] = useState(false);
  const Desktop = useMediaQuery("(min-width:43.75rem)");
  const wrapSelects = useMediaQuery("(min-width:29.6875rem)");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const sendEmail = (formData: FieldValues) => {
    setIsDisabled(true);
    formData.subjects = Object.keys(formData.subjects)
      .filter((k) => formData.subjects[k])
      .toString();
    console.log(formData);
    toast.promise(
      emailjs.send(
        "rol_contact_service",
        "rol_form_template",
        formData,
        "hC5XDG1CozhhJbH2F"
      ),
      {
        pending: {
          render() {
            return "Sending Message";
          },
        },
        success: {
          render() {
            reset(defaultValues);
            setIsDisabled(false);
            return "Message Sent";
          },
        },
        error: {
          render() {
            setIsDisabled(false);
            return "Something went wrong, Please try again";
          },
        },
      },
      {
        className: "bg-light-grey text-black",
        pauseOnHover: false,
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
      }
    );
  };

  const capitalize = (str: string): string => {
    const words = str.split(" ");
    return words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(" ");
  };

  return (
    <Card
      elevation={8}
      className={`bg-light-grey self-center ${wrapSelects ? "" : "w-screen"}`}
    >
      <CardHeader
        className="w-full bg-regal-blue text-white"
        title={
          <Typography
            className="whitespace-wrap font-medium"
            variant={Desktop ? "h2" : "h4"}
            component="h1"
          >
            Contact Me
          </Typography>
        }
        subheader={
          <Typography
            className="whitespace-wrap"
            variant={Desktop ? "h6" : "subtitle2"}
          >
            To book a session please send me a message using this contact form
            <br /> and I will aim to respond within 3 - 5 working days
          </Typography>
        }
      />
      <CardContent>
        <Grid className="flex flex-col" container spacing={3}>
          <Grid className="flex justify-evenly items-center m-0" item>
            <div
              className={`flex flex-row flex-1 ${
                wrapSelects ? "justify-evenly" : "flex-wrap justify-center"
              }`}
            >
              {["child age", "year group"].map((name) => {
                let width =
                  name === "child age"
                    ? Desktop
                      ? ("10.3125rem" as `${number}rem`)
                      : ("8.3125rem" as `${number}rem`)
                    : Desktop
                    ? ("10.3125rem" as `${number}rem`)
                    : ("8.3125rem" as `${number}rem`);
                let yupName = name.replace(" ", "_");
                return (
                  <FormSelect
                    key={name}
                    name={name}
                    yupName={yupName}
                    width={width}
                    errors={errors[`${yupName}`]}
                    control={control}
                    capitalize={capitalize}
                  />
                );
              })}
            </div>
            <FormControl
              className="flex-col m-0"
              sx={{ m: 3 }}
              component="fieldset"
              variant="standard"
              error={errors.subjects ? true : false}
            >
              <FormLabel
                style={{
                  fontSize: Desktop ? "1.5625rem" : "1.2625rem",
                  color: "#3a54fb",
                }}
                className="w-full"
                component="legend"
              >
                Subject
              </FormLabel>
              <FormGroup className="flex-row justify-center">
                {["maths", "english"].map((subject) => {
                  return (
                    <FormCheckbox
                      key={subject}
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
            let yupName =
              field === "name" || field === "email"
                ? `contact_${field}`
                : field;
            return (
              <FormInputText
                key={field}
                name={field}
                yupName={yupName}
                label={capitalize(field)}
                register={register}
                errors={errors[`${yupName}`]}
                multiline={field === "message" ? true : false}
              />
            );
          })}
          <Grid item>
            <Button
              variant="contained"
              className={`bg-regal-blue text-white ${
                Desktop ? "text-2xl" : "text-l"
              }`}
              size="large"
              onClick={handleSubmit(sendEmail)}
              disabled={isDisabled}
              component={motion.div}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <ToastContainer limit={1} />
    </Card>
  );
};

export default ContactForm;
