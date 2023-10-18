import { render, fireEvent, renderHook } from "@testing-library/react";
import FormInputText, { FormInputTextProps } from "./Form-Input-Text";
import { useForm } from "react-hook-form";

const renderFormInputText = (props: Partial<FormInputTextProps> = {}) => {
  const { result } = renderHook(() => useForm({}));

  const defaultProps: FormInputTextProps = {
    name: "Test InputText",
    yupName: "test",
    label: "InputText Label",
    errors: result.current.formState.errors,
    multiline: false,
    register: result.current.register,
  };
  return render(<FormInputText {...defaultProps} {...props} />);
};

test("renders InputText and enters value", async () => {
  const { findByRole, getByLabelText, getByPlaceholderText } =
    renderFormInputText();

  const inputText = await findByRole("textbox");

  const placeholderText = await getByPlaceholderText(
    /^Enter your Test InputText/i
  );
  const label = await getByLabelText(/^InputText Label/i);

  expect(inputText).toBeInTheDocument();
  expect(placeholderText).toBeInTheDocument();
  expect(label).toBeInTheDocument();
  expect(inputText).toHaveValue("");

  fireEvent.change(inputText, { target: { value: "some text" } });
  expect(inputText).toHaveValue("some text");
});
