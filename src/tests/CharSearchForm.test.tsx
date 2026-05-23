import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import useMarvelService from "../services/MarvelService";
import CharSearchForm from "../components/CharSearchForm/CharSearchForm";
import { mockCharacter } from "./mocks/handlers";

// Мокаем весь хук целиком — не идём в реальный API
vi.mock("../services/MarvelService");
const mockedMarvelService = vi.mocked(useMarvelService);

// Хелпер для рендера (нужен MemoryRouter из-за Link внутри компонента)
const renderForm = () =>
  render(
    <MemoryRouter>
      <CharSearchForm />
    </MemoryRouter>,
  );

describe("CharSearchForm", () => {
  beforeEach(() => {
    // Сбрасываем мок перед каждым тестом
    mockedMarvelService.mockReset();
    // По умолчанию возвращаем успешный статус и пустой результат
    mockedMarvelService.mockReturnValue({
      status: "waiting",
      searchCharacter: vi.fn().mockResolvedValue([mockCharacter]),
    } as unknown as ReturnType<typeof useMarvelService>);
  });

  afterEach(() => vi.clearAllMocks());

  it("рендерит поле ввода и кнопку find", () => {
    renderForm();
    expect(
      screen.getByLabelText(/find a character by name/i),
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /find/i })).toBeInTheDocument();
  });

  it("показывает ошибку валидации при пустом поле", async () => {
    renderForm();

    await userEvent.click(screen.getByRole("button", { name: /find/i }));
    expect(
      await screen.findByText(/this field is required/i),
    ).toBeInTheDocument();
  });

  it("показывает ошибку валидации если меньше 2 символов", async () => {
    renderForm();

    await userEvent.type(
      screen.getByLabelText(/find a character by name/i),
      "A",
    );
    await userEvent.click(screen.getByRole("button", { name: /find/i }));
    expect(
      await screen.findByText(/must be at least 2 characters/i),
    ).toBeInTheDocument();
  });

  it("показывает сообщение об успехе когда персонаж найден", async () => {
    renderForm();

    await userEvent.type(
      screen.getByLabelText(/find a character by name/i),
      "Spider Man",
    );
    await userEvent.click(screen.getByRole("button", { name: /find/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/there is! visit spider-man page/i),
      ).toBeInTheDocument(),
    );
  });

  it("рендерит ссылку на страницу персонажа после успешного поиска", async () => {
    renderForm();

    await userEvent.type(
      screen.getByLabelText(/find a character by name/i),
      "Spider Man",
    );
    await userEvent.click(screen.getByRole("button", { name: /find/i }));

    await waitFor(() => {
      const link = screen.getByRole("link", { name: /to page/i });
      expect(link).toHaveAttribute("href", `/characters/${mockCharacter.id}`);
    });
  });

  it("показывает сообщение об ошибке когда персонаж не найден", async () => {
    // Мокаем так, чтобы поиск не возвращал персонажей
    mockedMarvelService.mockReturnValue({
      status: "waiting",
      searchCharacter: vi.fn().mockResolvedValue([]),
    } as unknown as ReturnType<typeof useMarvelService>);

    renderForm();

    await userEvent.type(
      screen.getByLabelText(/find a character by name/i),
      "Unknown Character",
    );
    await userEvent.click(screen.getByRole("button", { name: /find/i }));

    await waitFor(() =>
      expect(
        screen.getByText(
          /the character was not found. check the name and try again/i,
        ),
      ).toBeInTheDocument(),
    );
  });

  it("очищает результаты при изменении поля ввода", async () => {
    renderForm();

    // Сначала находим персонажа
    await userEvent.type(
      screen.getByLabelText(/find a character by name/i),
      "Spider Man",
    );
    await userEvent.click(screen.getByRole("button", { name: /find/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/there is! visit spider-man page/i),
      ).toBeInTheDocument();
    });

    // Меняем поле — результаты должны исчезнуть
    await userEvent.clear(screen.getByLabelText(/find a character by name/i));
    await userEvent.type(
      screen.getByLabelText(/find a character by name/i),
      "Iron",
    );

    expect(screen.queryByText(/there is/i)).not.toBeInTheDocument();
  });
});
