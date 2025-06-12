import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../utils/test-utils";
import SearchForm from "./SearchForm";

const mockProps = {
  value: "",
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  placeholder: "Digite o nome do usuário",
};

describe("SearchForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render the form correctly", () => {
      render(<SearchForm {...mockProps} />);

      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /buscar/i })
      ).toBeInTheDocument();
    });

    it("should display the placeholder when provided", () => {
      render(<SearchForm {...mockProps} />);

      expect(
        screen.getByPlaceholderText("Digite o nome do usuário")
      ).toBeInTheDocument();
    });

    it("should display the current input value", () => {
      const propsWithValue = { ...mockProps, value: "octocat" };
      render(<SearchForm {...propsWithValue} />);

      expect(screen.getByDisplayValue("octocat")).toBeInTheDocument();
    });

    it("should render without placeholder when not provided", () => {
      const propsWithoutPlaceholder = {
        value: "",
        onChange: jest.fn(),
        onSubmit: jest.fn(),
      };

      render(<SearchForm {...propsWithoutPlaceholder} />);

      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("should call onChange when typing", () => {
      render(<SearchForm {...mockProps} />);

      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "octocat" } });

      expect(mockProps.onChange).toHaveBeenCalledWith("octocat");
      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    });

    it("should call onSubmit when the form is submitted", () => {
      const propsWithValue = { ...mockProps, value: "octocat" };
      render(<SearchForm {...propsWithValue} />);

      const form = screen.getByRole("textbox").closest("form")!;
      fireEvent.submit(form);

      expect(mockProps.onSubmit).toHaveBeenCalledWith("octocat");
      expect(mockProps.onSubmit).toHaveBeenCalledTimes(1);
    });

    it("should call onSubmit when the button is clicked", () => {
      const propsWithValue = { ...mockProps, value: "octocat" };
      render(<SearchForm {...propsWithValue} />);

      const button = screen.getByRole("button", { name: /buscar/i });
      fireEvent.click(button);

      expect(mockProps.onSubmit).toHaveBeenCalledWith("octocat");
      expect(mockProps.onSubmit).toHaveBeenCalledTimes(1);
    });

    it("should prevent default behavior on form submit", () => {
      const propsWithValue = { ...mockProps, value: "octocat" };
      render(<SearchForm {...propsWithValue} />);

      const form = screen.getByRole("textbox").closest("form")!;
      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = jest.spyOn(submitEvent, "preventDefault");
      form.dispatchEvent(submitEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("should handle multiple input value changes", () => {
      render(<SearchForm {...mockProps} />);

      const input = screen.getByRole("textbox");

      fireEvent.change(input, { target: { value: "octo" } });
      fireEvent.change(input, { target: { value: "octocat" } });
      fireEvent.change(input, { target: { value: "octocatdev" } });

      expect(mockProps.onChange).toHaveBeenCalledTimes(3);
      expect(mockProps.onChange).toHaveBeenNthCalledWith(1, "octo");
      expect(mockProps.onChange).toHaveBeenNthCalledWith(2, "octocat");
      expect(mockProps.onChange).toHaveBeenNthCalledWith(3, "octocatdev");
    });
  });

  describe("Accessibility", () => {
    it("should mark the input as required", () => {
      render(<SearchForm {...mockProps} />);

      const input = screen.getByRole("textbox");
      expect(input).toBeRequired();
    });

    it("should have correct element types", () => {
      render(<SearchForm {...mockProps} />);

      const input = screen.getByRole("textbox");
      const button = screen.getByRole("button", { name: /buscar/i });

      expect(input).toHaveAttribute("type", "text");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("should support keyboard navigation", () => {
      render(<SearchForm {...mockProps} />);

      const input = screen.getByRole("textbox");
      const button = screen.getByRole("button", { name: /buscar/i });

      input.focus();
      expect(document.activeElement).toBe(input);

      fireEvent.keyDown(input, { key: "Tab" });
      button.focus();
      expect(document.activeElement).toBe(button);
    });
  });

  describe("Edge Cases", () => {
    it("should handle input with spaces", () => {
      const propsWithSpaces = { ...mockProps, value: "  octocat  " };
      render(<SearchForm {...propsWithSpaces} />);

      const button = screen.getByRole("button", { name: /buscar/i });
      fireEvent.click(button);

      expect(mockProps.onSubmit).toHaveBeenCalledWith("  octocat  ");
    });

    it("should handle special characters", () => {
      render(<SearchForm {...mockProps} />);

      const input = screen.getByRole("textbox");
      const specialChars = "!@#$%^&*()_+-={}[]|;':,.<>?";

      fireEvent.change(input, { target: { value: specialChars } });

      expect(mockProps.onChange).toHaveBeenCalledWith(specialChars);
    });
  });
});
