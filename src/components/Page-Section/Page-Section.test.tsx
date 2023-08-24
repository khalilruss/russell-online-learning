import { render, screen, within } from "@testing-library/react";
import PageSection from "./Page-Section";
import { PageSectionProps } from "./Page-Section";

const renderPageSection = (props: Partial<PageSectionProps> = {}) => {
  const defaultProps: PageSectionProps = {
    id: "test-render",
    title: "test-title",
    colouredBg: true,
    children: <p>Test Content</p>,
  };
  return render(<PageSection {...defaultProps} {...props} />);
};

test("renders page section", async () => {
  const { findByTestId } = renderPageSection();

  const pageSection = await findByTestId("test-render");
  const sectionContent = await findByTestId("section-content");

  const title = screen.getByText(/test-title/i);

  expect(pageSection).toBeInTheDocument();
  expect(pageSection.classList).toContain("bg-light-grey");
  expect(within(sectionContent).getByText("Test Content")).toBeInTheDocument();
  expect(title).toBeInTheDocument();
});
