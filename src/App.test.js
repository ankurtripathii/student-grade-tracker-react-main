import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Student Grade Tracker", () => {
  test("renders the Student Grade Tracker", () => {
    render(<App />);

    expect(
      screen.getByText("📊 Student Grade Tracker")
    ).toBeInTheDocument();
  });

  test("loads initial students", () => {
    render(<App />);

    expect(screen.getByText("Aarav Sharma")).toBeInTheDocument();
    expect(screen.getByText("Priya Patel")).toBeInTheDocument();
    expect(screen.getByText("Rohan Gupta")).toBeInTheDocument();
  });

  test("adds a valid student", () => {
    render(<App />);

    fireEvent.change(
      screen.getByLabelText("Student Name"),
      {
        target: { value: "Rahul Kumar" },
      }
    );

    fireEvent.change(
      screen.getByLabelText("Grade"),
      {
        target: { value: "90" },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add Student",
      })
    );

    expect(
      screen.getByText("Rahul Kumar")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Grade: 90")
    ).toBeInTheDocument();
  });

  test("rejects grade above 100", () => {
    render(<App />);

    fireEvent.change(
      screen.getByLabelText("Student Name"),
      {
        target: { value: "Invalid Student" },
      }
    );

    fireEvent.change(
      screen.getByLabelText("Grade"),
      {
        target: { value: "150" },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add Student",
      })
    );

    expect(
      screen.getByRole("alert")
    ).toHaveTextContent(
      "Grade must be a number between 0 and 100."
    );

    expect(
      screen.queryByText("Invalid Student")
    ).not.toBeInTheDocument();
  });

  test("rejects negative grade", () => {
    render(<App />);

    fireEvent.change(
      screen.getByLabelText("Student Name"),
      {
        target: { value: "Negative Student" },
      }
    );

    fireEvent.change(
      screen.getByLabelText("Grade"),
      {
        target: { value: "-10" },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add Student",
      })
    );

    expect(
      screen.getByRole("alert")
    ).toHaveTextContent(
      "Grade must be a number between 0 and 100."
    );
  });

  test("sorts students by grade", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Sort by Grade ↓",
      })
    );

    const grades = screen
      .getAllByText(/Grade:/)
      .map((element) =>
        Number(
          element.textContent.replace("Grade: ", "")
        )
      );

    expect(grades).toEqual([85, 78, 42]);
  });

  test("filters passed students", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Passed",
      })
    );

    expect(
      screen.getByText("Aarav Sharma")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Rohan Gupta")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Priya Patel")
    ).not.toBeInTheDocument();
  });

  test("filters failed students", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Failed",
      })
    );

    expect(
      screen.getByText("Priya Patel")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Aarav Sharma")
    ).not.toBeInTheDocument();
  });
});