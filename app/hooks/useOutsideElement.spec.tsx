import useOutsideElement from "./useOutsideElement";
import { render, screen, waitFor } from "@testing-library/react";
import { useRef, useState } from "react";
import userEvent from "@testing-library/user-event";

const MockComponen1 = () => {
  const elmRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number>(0);

  const actionOutsideElement = () => {
    setCount((prev) => prev + 1);
  };

  useOutsideElement(elmRef, actionOutsideElement);

  return (
    <div>
      <div className="main-element" ref={elmRef}>
        {`Counter: ${count}`}
      </div>
      <div className="regular-element">Regular Element 1</div>
      <div className="regular-element">Regular Element 2</div>
      <div className="regular-element">Regular Element 3</div>
    </div>
  );
};

const MockComponen2 = () => {
  const elmRef1 = useRef<HTMLDivElement>(null);
  const elmRef2 = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number>(0);

  const actionOutsideElement = () => {
    setCount((prev) => prev + 1);
  };

  useOutsideElement([elmRef1, elmRef2], actionOutsideElement);

  return (
    <div>
      <div className="main-element" ref={elmRef1}>
        {`Counter: ${count}`}
      </div>
      <div className="main-element" ref={elmRef2}>
        Main Element 2
      </div>
      <div className="regular-element">Regular Element</div>
    </div>
  );
};

describe("useOutsideElement", () => {
  it("should fire actionOutsideElement when click outside of main element", async () => {
    render(<MockComponen1 />);

    const mainElement = screen.getByText(/counter/i);
    userEvent.click(mainElement);
    await waitFor(() => {
      expect(mainElement).toHaveTextContent("Counter: 0");
    });

    const allRegularElements = screen.getAllByText(/regular element/i);

    userEvent.click(allRegularElements[0]);
    await waitFor(() => {
      expect(mainElement).toHaveTextContent(`Counter: 1`);
    });
    userEvent.click(allRegularElements[1]);
    await waitFor(() => {
      expect(mainElement).toHaveTextContent(`Counter: 2`);
    });
  });
  it("should accept an array of elements as ref parameter and fire action outside these elements", async () => {
    render(<MockComponen2 />);

    const mainElement1 = screen.getByText(/counter/i);

    const mainElement2 = screen.getByText(/main element/i);
    userEvent.click(mainElement1);
    userEvent.click(mainElement2);
    await waitFor(() => {
      expect(mainElement1).toHaveTextContent("Counter: 0");
    });

    const regularElement = screen.getByText(/regular element/i);
    userEvent.click(regularElement);
    userEvent.click(regularElement);
    await waitFor(() => {
      expect(mainElement1).toHaveTextContent("Counter: 2");
    });
  });
});
