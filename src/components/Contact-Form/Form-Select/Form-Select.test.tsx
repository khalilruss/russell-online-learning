import { render, fireEvent, renderHook, within } from "@testing-library/react";
import FormSelect, { FormSelectProps } from "./Form-Select";
import { useForm } from "react-hook-form";

const renderFormSelect = (props: Partial<FormSelectProps> = {}) => {
  const { result } = renderHook(() => useForm({}));

  const defaultProps: FormSelectProps = {
    name: "Test FormSelect",
    yupName: "test",
    errors: result.current.formState.errors,
    width: "10rem",
    control: result.current.control,
    capitalize: (str: string) => str,
  };
  return render(<FormSelect {...defaultProps} {...props} />);
};

test("renders child age select", async () => {
  const { getByRole, getByLabelText } = renderFormSelect({
    name: "child age",
  });

  let select = await getByLabelText(/^child age/i);
  expect(select).toBeInTheDocument();

  fireEvent.mouseDown(select);
  const listbox = within(getByRole("listbox"));
  expect(listbox.getByText(/6/i)).toBeInTheDocument();
  expect(listbox.getByText(/7/i)).toBeInTheDocument();
  expect(listbox.getByText(/8/i)).toBeInTheDocument();
  expect(listbox.getByText(/9/i)).toBeInTheDocument();
  expect(listbox.getByText(/10/i)).toBeInTheDocument();

  fireEvent.click(listbox.getByText(/6/i));

  select = await getByLabelText(/^6/i);
  expect(select).toBeInTheDocument();
});

test("renders year group select", async () => {
  const { getByRole, getByLabelText } = renderFormSelect({
    name: "year group",
  });

  let select = await getByLabelText(/^year group/i);
  expect(select).toBeInTheDocument();

  fireEvent.mouseDown(select);
  const listbox = within(getByRole("listbox"));
  expect(listbox.getByText(/Year 2/i)).toBeInTheDocument();
  expect(listbox.getByText(/Year 3/i)).toBeInTheDocument();
  expect(listbox.getByText(/Year 4/i)).toBeInTheDocument();
  expect(listbox.getByText(/Year 5/i)).toBeInTheDocument();
  expect(listbox.getByText(/Year 6/i)).toBeInTheDocument();

  fireEvent.click(listbox.getByText(/Year 4/i));

  select = await getByLabelText(/^Year 4/i);
  expect(select).toBeInTheDocument();
});
