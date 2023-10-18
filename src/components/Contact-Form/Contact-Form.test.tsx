import {
  fireEvent,
  render,
  waitFor,
  renderHook,
  screen,
} from "@testing-library/react";
import ContactForm from "./Contact-Form";
const mockHandleSubmit = jest.fn();

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useform: () => ({
    register: jest.fn(),
    handleSubmit: mockHandleSubmit,
    control: {},
    getValues: () => {
      return [];
    },
    setValue: () => jest.fn(),
    formState: () => jest.fn(),
    watch: () => jest.fn(),
  }),
  controller: () => [],
  useSubscribe: () => ({
    r: { current: { subject: { subscribe: () => jest.fn() } } },
  }),
}));

test("renders contact form", async () => {
  const { getAllByRole, getByRole, getByLabelText, getByText } = render(
    <ContactForm />
  );

  const title = await getByRole("heading", { level: 1 });
  const otherHeadings = await getAllByRole("heading", { level: 6 });
  expect(otherHeadings.length).toBe(3);

  const paragragh = otherHeadings[0];
  const checkboxHeading1 = otherHeadings[1];
  const checkboxHeading2 = otherHeadings[2];

  expect(title).toBeInTheDocument();
  expect(title.textContent).toEqual("Contact Me");

  expect(paragragh).toBeInTheDocument();
  expect(paragragh.textContent).toEqual(
    "To book a session please send me a message using this contact form and I will aim to respond within 3 - 5 working days"
  );

  expect(checkboxHeading1).toBeInTheDocument();
  expect(checkboxHeading1.textContent).toEqual("Maths");

  expect(checkboxHeading2).toBeInTheDocument();
  expect(checkboxHeading2.textContent).toEqual("English");

  const childAgeSelect = await getByLabelText(/^Child Age/i);
  const yearGroupSelect = await getByLabelText(/^Year Group/i);

  expect(childAgeSelect).toBeInTheDocument();
  expect(yearGroupSelect).toBeInTheDocument();

  const inputTexts = await getAllByRole("textbox");
  expect(inputTexts.length).toBe(3);
  //   const nameInputText = inputTexts[0];
  //   const emailInputText = inputTexts[1];
  //   const messageInputText = inputTexts[2];

  const button = getByText("Submit");
  expect(button).toBeInTheDocument();
});

// test("should call handleSubmit when the submit button is clicked", async () => {
//   const mockSend = jest.fn();

//   const { getByText, getByLabelText } = render(<ContactForm />);

//   // const spy = jest.spyOn(emailjs, "send");
//   // const spy2 = jest.spyOn(useForm, "onSubmit");

//   jest.mock("@emailjs/browser", () => ({
//     send: mockSend,
//   }));

//   // Fill in form fields
//   const nameInputText = await getByLabelText(/^Name/i);
//   fireEvent.change(nameInputText, {
//     target: { value: "John Doe" },
//   });

//   const emailInputText = await getByLabelText(/^Email/i);
//   fireEvent.change(emailInputText, {
//     target: { value: "john@example.com" },
//   });

//   const messageInputText = await getByLabelText(/^Message/i);
//   fireEvent.change(messageInputText, {
//     target: { value: "Hello, World!" },
//   });

//   // Check at least one subject checkbox
//   const mathsCheckbox = await getByLabelText("Maths");
//   fireEvent.click(mathsCheckbox);
//   const button = await getByText("Submit");
//   expect(button).toBeInTheDocument();

//   fireEvent.click(button);

//   // Use waitFor to wait for the button to appear

//   // Wait for the form to be submitted
//   await waitFor(() => {
//     // expect(mockSend).toHaveBeenCalledTimes(1);
//     expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
//     expect(mockHandleSubmit).toHaveBeenCalledWith(expect.any(Function));
//     // expect(mockSend).toHaveBeenCalledTimes(1);
//     // expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
//   });
// });
