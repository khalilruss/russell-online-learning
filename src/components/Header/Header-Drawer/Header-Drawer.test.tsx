import { fireEvent, render } from "@testing-library/react";
import HeaderDrawer from "./Header-Drawer";
import { HeaderDrawerProps } from "./Header-Drawer";

const renderHeaderDrawer = (props: Partial<HeaderDrawerProps> = {}) => {
  const defaultProps: HeaderDrawerProps = {
    id: "test-drawer-item",
    menuItems: [
      {
        label: "Test",
        id: "test",
      },
    ],
    drawerVisible: true,
    toggleDrawer: () => {},
    propagateClick: () => {},
  };
  return render(<HeaderDrawer {...defaultProps} {...props} />);
};

test("renders header drawer when drawerVisible is true", async () => {
  const { findByTestId } = renderHeaderDrawer();

  const drawer = await findByTestId("header-drawer");
  const items = drawer.getElementsByClassName("MuiList-root");

  expect(drawer).toBeInTheDocument();
  expect(items.length).toBe(1);
  expect(items[0]).toBeInTheDocument();
  expect(items[0].textContent).toEqual("Test");
});

test("does not render header drawer when drawerVisible is false", async () => {
  const { queryByTestId } = renderHeaderDrawer({ drawerVisible: false });
  const drawer = queryByTestId("header-drawer");
  expect(drawer).not.toBeInTheDocument();
});

test("test toggleDrawer fired when background clicked", async () => {
  const mockToggleDrawer = jest.fn();
  const { findByTestId } = renderHeaderDrawer({
    toggleDrawer: mockToggleDrawer,
  });

  const drawer = await findByTestId("header-drawer");
  const background = drawer.getElementsByClassName("MuiBackdrop-root")[0];

  expect(drawer).toBeInTheDocument();

  fireEvent.click(background);
  expect(mockToggleDrawer).toHaveBeenCalled();
});
