import { fireEvent, render } from "@testing-library/react";
import HeaderDrawerItem from "./Header-Drawer-Item";
import { HeaderDrawerItemProps } from "./Header-Drawer-Item";

const renderHeaderDrawerItem = (props: Partial<HeaderDrawerItemProps> = {}) => {
  const defaultProps: HeaderDrawerItemProps = {
    index: 0,
    id: "test-drawer-item",
    label: "Test Drawer Item",
    toggleDrawer: () => {},
    propagateClick: () => {},
  };
  return render(<HeaderDrawerItem {...defaultProps} {...props} />);
};

test("renders header drawer item", async () => {
  const { findByTestId } = renderHeaderDrawerItem();

  const drawerItem = await findByTestId("header-drawer-item-0");

  expect(drawerItem).toBeInTheDocument();
  expect(drawerItem.textContent).toEqual("Test Drawer Item");
});

test("test header drawer item click", async () => {
  const mocktoggleDrawer = jest.fn();
  const mockHandlePropagateClick = jest.fn();
  const { findByTestId } = renderHeaderDrawerItem({
    toggleDrawer: mocktoggleDrawer,
    propagateClick: mockHandlePropagateClick,
  });

  const drawerItem = await findByTestId("header-drawer-item-0");
  expect(drawerItem.textContent).toEqual("Test Drawer Item");

  fireEvent.click(drawerItem);
  expect(mockHandlePropagateClick).toHaveBeenCalled();
  expect(mocktoggleDrawer).toHaveBeenCalled();
});
