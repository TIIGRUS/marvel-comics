import { render, screen } from "@testing-library/react";
import setContent from "../utils/setContent";
import { MemoryRouter } from "react-router-dom";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

const DummyComponent = <div>Content loaded</div>;
const DummyError = <div>Custom error</div>;

describe("setContent", () => {
  it("waiting (без paginationLoading): рендерит Skeleton", () => {
    renderWithRouter(
      <>
        {setContent({
          process: "waiting",
          Component: DummyComponent,
        })}
      </>,
    );

    expect(screen.getByText(/please select a character/i)).toBeInTheDocument();
    expect(screen.queryByText("Content loaded")).not.toBeInTheDocument();
  });

  it("waiting (с paginationLoading=true): рендерит Spinner", () => {
    const { container } = renderWithRouter(
      <>
        {setContent({
          process: "waiting",
          Component: DummyComponent,
          paginationLoading: true,
        })}
      </>,
    );

    expect(container.querySelector(".spinner")).toBeInTheDocument();
    expect(screen.queryByText("Content loaded")).not.toBeInTheDocument();
  });

  it("loading (без paginationLoading): рендерит Spinner", () => {
    const { container } = renderWithRouter(
      <>
        {setContent({
          process: "loading",
          Component: DummyComponent,
        })}
      </>,
    );

    expect(container.querySelector(".spinner")).toBeInTheDocument();
    expect(screen.queryByText("Content loaded")).not.toBeInTheDocument();
  });

  it("loading (с paginationLoading=true): рендерит Component", () => {
    renderWithRouter(
      <>
        {setContent({
          process: "loading",
          Component: DummyComponent,
          paginationLoading: true,
        })}
      </>,
    );

    expect(screen.getByText("Content loaded")).toBeInTheDocument();
  });

  it("confirmed: рендерит Component", () => {
    renderWithRouter(
      <>
        {setContent({
          process: "confirmed",
          Component: DummyComponent,
        })}
      </>,
    );

    expect(screen.getByText("Content loaded")).toBeInTheDocument();
  });

  it("error (без ComponentError): рендерит ErrorMessage по умолчанию", () => {
    const { container } = renderWithRouter(
      <>
        {setContent({
          process: "error",
          Component: DummyComponent,
        })}
      </>,
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(container.querySelector(".error-message")).toBeInTheDocument();
    expect(screen.queryByText("Content loaded")).not.toBeInTheDocument();
  });

  it("error (с ComponentError): рендерит кастомный ComponentError", () => {
    renderWithRouter(
      <>
        {setContent({
          process: "error",
          Component: DummyComponent,
          ComponentError: DummyError,
        })}
      </>,
    );
    expect(screen.getByText("Custom error")).toBeInTheDocument();
  });
});
