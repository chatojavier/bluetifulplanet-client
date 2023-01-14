import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import Header from "./Header";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

describe("Header", () => {
  it("should render properly", () => {
    const { container } = render(<Header />);
    expect(container).toBeDefined();
  });
  it('should redirect to "/" when click on logo', async () => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    const user = userEvent.setup()

    render(<Header />);
    const logoElm = screen.getByTestId("logo-horizontal");

    await user.click(logoElm);

    expect(mockPush).toHaveBeenCalledWith("/");
  });
  it('should open the Drawer when click on BurgerMenu', async () => {
    const user = userEvent.setup()

    render(<Header />);
    const burgerMenu = screen.getByTestId('burger-menu-label');
    const drawer = screen.getByTestId('drawer-wrapper');

    expect(drawer).toHaveClass('close');

    await user.click(burgerMenu);

    expect(drawer).toHaveClass('open');
  })
});
