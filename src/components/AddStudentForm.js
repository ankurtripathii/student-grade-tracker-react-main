import React from "react";
import PropTypes from "prop-types";

class AddStudentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      grade: "",
      error: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      error: "",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const name = this.state.name
      .replace(/\s+/g, " ")
      .trim();

    const grade = Number(this.state.grade);

    if (!name) {
      this.setState({
        error: "Student name is required.",
      });
      return;
    }

    if (
      this.state.grade === "" ||
      !Number.isFinite(grade) ||
      grade < 0 ||
      grade > 100
    ) {
      this.setState({
        error: "Grade must be a number between 0 and 100.",
      });
      return;
    }

    const result = this.props.onAddStudent({
      name,
      grade,
    });

    if (!result || result.success) {
      this.setState({
        name: "",
        grade: "",
        error: "",
      });
    } else {
      this.setState({
        error: result.message,
      });
    }
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="add-form"
        noValidate
      >
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Student Name"
          aria-label="Student Name"
          maxLength="100"
          required
        />

        <input
          type="number"
          name="grade"
          value={this.state.grade}
          onChange={this.handleChange}
          placeholder="Grade (0-100)"
          aria-label="Grade"
          min="0"
          max="100"
          step="0.01"
          required
        />

        <button type="submit">
          Add Student
        </button>

        {this.state.error && (
          <p
            className="error-message"
            role="alert"
          >
            {this.state.error}
          </p>
        )}
      </form>
    );
  }
}

AddStudentForm.propTypes = {
  onAddStudent: PropTypes.func.isRequired,
};

export default AddStudentForm;