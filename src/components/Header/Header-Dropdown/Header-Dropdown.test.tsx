import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeaderDropdown from "./Header-Dropdown";
import { HeaderDropdownProps } from "./Header-Dropdown";

const renderHeaderDropdown = (props: Partial<HeaderDropdownProps> = {}) => {
  const defaultProps: HeaderDropdownProps = {
    id: "test-dropdown-item",
    menuItems: [
      {
        label: "Test",
        id: "test",
      },
    ],
    anchorEl: document.body,
    handleCloseMenu: () => {},
    propagateClick: () => {},
  };
  return render(<HeaderDropdown {...defaultProps} {...props} />);
};

test("renders header dropdown", async () => {
  const { findByTestId } = renderHeaderDropdown();

  const dropdown = await findByTestId("header-dropdown");
  const items = dropdown.getElementsByClassName("MuiList-root")[0].children;

  expect(dropdown).toBeInTheDocument();
  expect(items.length).toBe(1);
  expect(items[0]).toBeInTheDocument();
  expect(items[0].textContent).toEqual("Test");
});

test("test handleMenuClosed called on mouse leave", async () => {
  const mockHandleCloseMenu = jest.fn();
  const { findByTestId } = renderHeaderDropdown({
    handleCloseMenu: mockHandleCloseMenu,
  });
  const dropdownItem = await findByTestId("header-dropdown-item-0");

  fireEvent.mouseLeave(dropdownItem);
  await waitFor(() => {
    expect(mockHandleCloseMenu).toHaveBeenCalled();
  });
});
