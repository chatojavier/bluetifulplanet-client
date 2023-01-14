import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";

const WrapperBurgerMenu = () => {
  const [open, setOpen] = useState<boolean>(false);

  return <BurgerMenu open={open} setOpen={setOpen} />;
};

describe("BurgerMenu", () => {
  it("should render Burger menu", () => {
    const { container } = render(<WrapperBurgerMenu />);

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(
      container.querySelector("[data-icon='burger-menu']")
    ).toBeInTheDocument();
  });

  it("should change input status on click", async () => {
    render(<WrapperBurgerMenu />);

    const burgerMenu = screen.getByTestId("burger-menu-label");
    const checkbox = within(burgerMenu).getByRole(
      "checkbox"
    ) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    userEvent.click(burgerMenu);

    await waitFor(() => {
      expect(checkbox.checked).toBe(true);
    });
  });
});
