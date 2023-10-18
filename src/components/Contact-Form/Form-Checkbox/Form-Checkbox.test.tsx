import { render, fireEvent, renderHook } from "@testing-library/react";
import FormCheckbox, { FormCheckboxProps } from "./Form-Checkbox";
import { useForm } from "react-hook-form";

const renderFormCheckbox = (props: Partial<FormCheckboxProps> = {}) => {
  const { result } = renderHook(() => useForm({}));

  const defaultProps: FormCheckboxProps = {
    name: "Test Checkbox",
    control: result.current.control,
    capitalize: (str: string) => str,
  };
  return render(<FormCheckbox {...defaultProps} {...props} />);
};

test("renders checkbox and checks if clickable", async () => {
  const { findByRole, getByLabelText, getByPlaceholderText } =
    renderFormCheckbox();

  const checkbox = await findByRole("checkbox");
  const label = await getByLabelText(/^Test Checkbox/i);

  expect(checkbox).toBeInTheDocument();
  expect(label).toBeInTheDocument();

  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});
