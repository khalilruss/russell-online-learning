import { fireEvent, render } from "@testing-library/react";
import HeaderButton from "./Header-Button";
import { HeaderButtonProps } from "./Header-Button";

const renderHeaderButton = (props: Partial<HeaderButtonProps> = {}) => {
  const defaultProps: HeaderButtonProps = {
    index: 0,
    id: "test-button",
    label: "Test Button",
    handleClickAboutMenu: () => {},
    propagateClick: () => {},
  };
  return render(<HeaderButton {...defaultProps} {...props} />);
};

test("renders header button", async () => {
  const { findByTestId } = renderHeaderButton();

  const headerButton = await findByTestId("header-button-0");

  expect(headerButton).toBeInTheDocument();
  expect(headerButton.textContent).toEqual("Test Button");
});

test("renders header button with dropdown arrow", async () => {
  const mockHandleClickAboutMenu = jest.fn();
  const mockHandlePropagateClick = jest.fn();
  const { findByTestId } = renderHeaderButton({
    label: "About",
    handleClickAboutMenu: mockHandleClickAboutMenu,
    propagateClick: mockHandlePropagateClick,
  });

  const headerButton = await findByTestId("header-button-0");
  expect(headerButton.textContent).toEqual("About");
  expect(headerButton.getElementsByClassName("MuiButton-endIcon").length).toBe(
    1
  );

  fireEvent.click(headerButton);
  expect(mockHandleClickAboutMenu).toHaveBeenCalled();
  expect(mockHandlePropagateClick).toBeCalledTimes(0);
});

test("renders header button without dropdown arrow", async () => {
  const mockHandleClickAboutMenu = jest.fn();
  const mockHandlePropagateClick = jest.fn();
  const { findByTestId } = renderHeaderButton({
    handleClickAboutMenu: mockHandleClickAboutMenu,
    propagateClick: mockHandlePropagateClick,
  });

  const headerButton = await findByTestId("header-button-0");
  expect(headerButton.textContent).toEqual("Test Button");
  expect(headerButton.getElementsByClassName("MuiButton-endIcon").length).toBe(
    0
  );

  fireEvent.click(headerButton);
  expect(mockHandlePropagateClick).toHaveBeenCalled();
  expect(mockHandleClickAboutMenu).toBeCalledTimes(0);
});
