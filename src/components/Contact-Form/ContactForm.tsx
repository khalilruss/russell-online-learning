import { useState } from "react";
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

import { useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormCheckbox from "./Form-Checkbox/FormCheckbox";
import FormSelect from "./Form-Select/FormSelect";
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
            {["child age", "year group"].map((name) => {
              let width = name === "child age" ? 165 : 175;
              let yupName = name.replace(" ", "_");
              return (
                <FormSelect
                  name={name}
                  yupName={yupName}
                  width={width}
                  errors={errors[`${yupName}`]}
                  control={control}
                  capitalize={capitalize}
                />
              );
            })}
            <FormControl
              className="flex-col m-0"
              sx={{ m: 3 }}
              component="fieldset"
              variant="standard"
              error={errors.subjects ? true : false}
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
            let yupName =
              field === "name" || field === "email"
                ? `contact_${field}`
                : field;
            return (
              <FormInputText
                name={field}
                yupName={yupName}
                label={capitalize(field)}
                register={register}
                errors={errors[`${yupName}`]}
                multiline={field === "message" ? true : false}
              />
            );
          })}
          <Grid item spacing={{ xs: 8 }}>
            <Button
              variant="contained"
              className="bg-regal-blue text-white text-[25px]"
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
