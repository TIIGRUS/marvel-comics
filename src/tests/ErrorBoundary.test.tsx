import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

const ThrowError = () => {
  throw new Error("Test error");
};

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ErrorBoundary", () => {
  it("рендерит children когда ошибок нет", () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <div>Normal content</div>
        </ErrorBoundary>
      </MemoryRouter>,
    );

    expect(screen.getByText("Normal content")).toBeInTheDocument();
  });

  it("рендерит fallback UI когда дочерний компонент бросает ошибку", () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </MemoryRouter>,
    );

    expect(screen.getByText("Something is wrong")).toBeInTheDocument();
  });

  it("не рендерит children после ошибки", () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ThrowError />
          <div>Normal content</div>
        </ErrorBoundary>
      </MemoryRouter>,
    );

    expect(screen.queryByText("Normal content")).not.toBeInTheDocument();
  });
});
