import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import mediaQuery from "css-mediaquery";
import Header from "./Header";

const createMatchMedia = (width: number) => (query: string) => ({
  matches: mediaQuery.match(query, { width }),
  media: "",
  addListener: () => {},
  removeListener: () => {},
  onchange: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => true,
});

const resizeScreenSize = (width: number) => {
  window.matchMedia = createMatchMedia(width);
};
test("renders header", async () => {
  const { findByTestId } = render(<Header />);

  const header = await findByTestId("header");
  expect(header).toBeInTheDocument();

  const logo = await findByTestId("logo");
  expect(logo).toBeInTheDocument();
  expect(logo.textContent).toEqual("Russell Online Learning");

  const buttons = header.getElementsByClassName("MuiButton-root");
  expect(buttons.length).toBe(6);
  expect(buttons[0].textContent).toEqual("About");
  expect(buttons[0].getElementsByClassName("MuiButton-endIcon").length).toBe(1);
  expect(buttons[1].textContent).toEqual("My Ethos");
  expect(buttons[2].textContent).toEqual("My Accomplishments");
  expect(buttons[3].textContent).toEqual("Testimonials");
  expect(buttons[4].textContent).toEqual("Sessions and Prices");
  expect(buttons[5].textContent).toEqual("Contact Me");
});

test("about menu appears on about button click", async () => {
  const { findByTestId, queryByTestId } = render(<Header />);

  const header = await findByTestId("header");
  const buttons = header.getElementsByClassName("MuiButton-root");
  let dropdown = queryByTestId("header-dropdown");

  expect(dropdown).not.toBeInTheDocument();

  expect(buttons[0].textContent).toEqual("About");
  fireEvent.click(buttons[0]);

  await waitFor(() => {
    dropdown = queryByTestId("header-dropdown");

    expect(dropdown).toBeInTheDocument();
    const items = dropdown!.getElementsByClassName("MuiMenu-list")[0].children;
    expect(items.length).toBe(2);
    expect(items[0]).toBeInTheDocument();
    expect(items[0].textContent).toEqual("About Russell Online Learning");
    expect(items[1]).toBeInTheDocument();
    expect(items[1].textContent).toEqual("About Me");
  });
});

test("about menu removed from document on mouse leave", async () => {
  const { findByTestId, queryByTestId } = render(<Header />);

  const header = await findByTestId("header");
  const buttons = header.getElementsByClassName("MuiButton-root");
  fireEvent.click(buttons[0]);

  let dropdown = queryByTestId("header-dropdown");
  expect(dropdown).toBeInTheDocument();

  const dropdownItem = await findByTestId("header-dropdown-item-0");
  fireEvent.mouseLeave(dropdownItem);

  await waitFor(() => {
    dropdown = queryByTestId("header-dropdown");
    expect(dropdown).not.toBeInTheDocument();
  });
});

test("about menu removed from document on mouse leave", async () => {
  const { findByTestId, queryByTestId } = render(<Header />);

  const header = await findByTestId("header");
  const buttons = header.getElementsByClassName("MuiButton-root");
  fireEvent.click(buttons[0]);

  let dropdown = queryByTestId("header-dropdown");
  expect(dropdown).toBeInTheDocument();

  const dropdownItem = await findByTestId("header-dropdown-item-0");
  fireEvent.mouseLeave(dropdownItem);

  await waitFor(() => {
    dropdown = queryByTestId("header-dropdown");
    expect(dropdown).not.toBeInTheDocument();
  });
});

test("header buttons change to header drawer button when width is less than 1441px", async () => {
  resizeScreenSize(1440);
  render(<Header />);

  let buttons = await screen.findAllByRole("button");
  let drawerButton = await screen.queryByTestId("header-drawer-button");

  expect(buttons[0]).not.toBeVisible();
  expect(buttons[1]).not.toBeVisible();
  expect(buttons[2]).not.toBeVisible();
  expect(buttons[3]).not.toBeVisible();
  expect(buttons[4]).not.toBeVisible();
  expect(buttons[5]).not.toBeVisible();

  expect(drawerButton).toBeVisible();
});

test("Logo size changes when screen width less than 315px", async () => {
  resizeScreenSize(314);
  render(<Header />);
  const logo = screen.getByRole("heading");
  expect(logo.classList).toContain("MuiTypography-h6");
});
