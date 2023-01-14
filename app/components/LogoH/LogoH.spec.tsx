import { fireEvent, render, screen } from "@testing-library/react";
import LogoH from "./LogoH";

describe("LogoH", () => {
  it("should render properly", () => {
    const { container } = render(<LogoH />);

    const svgLogo = container.querySelector('svg[data-icon="logo-horizontal"]');
    expect(svgLogo).toBeInTheDocument();
  });
  it("should run onClick function on click event", () => {
    const clickHandler = jest.fn();
    render(<LogoH onClick={clickHandler} />);
    const logoElm = screen.getByTestId("logo-horizontal");
    fireEvent.click(logoElm);

    expect(clickHandler).toBeCalled();
  });
});
