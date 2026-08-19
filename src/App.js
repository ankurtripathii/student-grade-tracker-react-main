import React from "react";
import PropTypes from "prop-types";
import AddStudentForm from "./components/AddStudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

const MIN_GRADE = 0;
const MAX_GRADE = 100;

const sanitizeName = (value) =>
  String(value || "")
    .replace(/[^\w\s.-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const validateGrade = (value) => {
  const grade = Number(value);

  if (
    value === "" ||
    !Number.isFinite(grade) ||
    grade < MIN_GRADE ||
    grade > MAX_GRADE
  ) {
    return null;
  }

  return grade;
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      filter: "all",
      sortByGrade: false,
    };
  }

  // Lifecycle: Load initial data
  componentDidMount() {
    console.log("App: componentDidMount - Loading initial data");

    const initialStudents = [
      {
        id: 1,
        name: "Aarav Sharma",
        grade: 85,
        status: "Passed",
      },
      {
        id: 2,
        name: "Priya Patel",
        grade: 42,
        status: "Failed",
      },
      {
        id: 3,
        name: "Rohan Gupta",
        grade: 78,
        status: "Passed",
      },
    ];

    this.setState({
      students: initialStudents,
    });
  }

  // Lifecycle: Track state changes
  componentDidUpdate(prevProps, prevState) {
    if (prevState.students.length !== this.state.students.length) {
      console.log("App: componentDidUpdate - Students list changed");
    }
  }

  // Lifecycle: Cleanup
  componentWillUnmount() {
    console.log(
      "App: componentWillUnmount - Cleaning up Student Grade Tracker"
    );
  }

  addStudent = (newStudent) => {
    const cleanName = sanitizeName(newStudent.name);
    const grade = validateGrade(newStudent.grade);

    if (!cleanName) {
      return {
        success: false,
        message: "Please enter a valid student name.",
      };
    }

    if (grade === null) {
      return {
        success: false,
        message: "Grade must be a number between 0 and 100.",
      };
    }

    const student = {
      id: Date.now(),
      name: cleanName,
      grade,
      status: grade >= 50 ? "Passed" : "Failed",
    };

    this.setState((prevState) => ({
      students: [...prevState.students, student],
    }));

    return {
      success: true,
      message: "Student added successfully.",
    };
  };

  updateGrade = (id, newGrade) => {
    const grade = validateGrade(newGrade);

    if (grade === null) {
      return {
        success: false,
        message: "Grade must be a number between 0 and 100.",
      };
    }

    this.setState((prevState) => ({
      students: prevState.students.map((student) =>
        student.id === id
          ? {
            ...student,
            grade,
            status: grade >= 50 ? "Passed" : "Failed",
          }
          : student
      ),
    }));

    return {
      success: true,
      message: "Grade updated successfully.",
    };
  };

  deleteStudent = (id) => {
    this.setState((prevState) => ({
      students: prevState.students.filter((student) => student.id !== id),
    }));
  };

  setFilter = (filter) => {
    this.setState({
      filter,
    });
  };

  toggleGradeSort = () => {
    this.setState((prevState) => ({
      sortByGrade: !prevState.sortByGrade,
    }));
  };

  render() {
    let filteredStudents = this.state.students.filter((student) => {
      if (this.state.filter === "passed") {
        return student.status === "Passed";
      }

      if (this.state.filter === "failed") {
        return student.status === "Failed";
      }

      return true;
    });

    // Sort highest grade first
    if (this.state.sortByGrade) {
      filteredStudents = [...filteredStudents].sort(
        (a, b) => b.grade - a.grade
      );
    }

    return (
      <div className="app">
        <div className="container">
          <h1>📊 Student Grade Tracker</h1>

          <AddStudentForm onAddStudent={this.addStudent} />

          <div className="filters" aria-label="Student filters">
            <button
              type="button"
              onClick={() => this.setFilter("all")}
              className={this.state.filter === "all" ? "active" : ""}
            >
              All Students
            </button>

            <button
              type="button"
              onClick={() => this.setFilter("passed")}
              className={this.state.filter === "passed" ? "active" : ""}
            >
              Passed
            </button>

            <button
              type="button"
              onClick={() => this.setFilter("failed")}
              className={this.state.filter === "failed" ? "active" : ""}
            >
              Failed
            </button>

            <button
              type="button"
              onClick={this.toggleGradeSort}
              className={this.state.sortByGrade ? "active" : ""}
              aria-pressed={this.state.sortByGrade}
            >
              {this.state.sortByGrade
                ? "Unsort Grades"
                : "Sort by Grade ↓"}
            </button>
          </div>

          <StudentList
            students={filteredStudents}
            onUpdateGrade={this.updateGrade}
            onDelete={this.deleteStudent}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {};

export default App;