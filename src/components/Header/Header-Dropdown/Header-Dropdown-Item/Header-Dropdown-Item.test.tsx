import { fireEvent, render } from "@testing-library/react";
import HeaderDropdownItem from "./Header-Dropdown-Item";
import { HeaderDropdownItemProps } from "./Header-Dropdown-Item";

const renderHeaderDropdownItem = (
  props: Partial<HeaderDropdownItemProps> = {}
) => {
  const defaultProps: HeaderDropdownItemProps = {
    index: 0,
    id: "test-dropdown-item",
    label: "Test Dropdown Item",
    propagateClick: () => {},
  };
  return render(<HeaderDropdownItem {...defaultProps} {...props} />);
};

test("renders header dropdown item", async () => {
  const { findByTestId } = renderHeaderDropdownItem();

  const dropdownItem = await findByTestId("header-dropdown-item-0");

  expect(dropdownItem).toBeInTheDocument();
  expect(dropdownItem.textContent).toEqual("Test Dropdown Item");
});

test("test header dropdown item click", async () => {
  const mockHandlePropagateClick = jest.fn();
  const { findByTestId } = renderHeaderDropdownItem({
    propagateClick: mockHandlePropagateClick,
  });

  const dropdownItem = await findByTestId("header-dropdown-item-0");
  expect(dropdownItem.textContent).toEqual("Test Dropdown Item");

  fireEvent.click(dropdownItem);
  expect(mockHandlePropagateClick).toHaveBeenCalled();
});
