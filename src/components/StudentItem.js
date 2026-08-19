import React from "react";
import PropTypes from "prop-types";

class StudentItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      tempGrade: props.student.grade,
      error: "",
    };
  }

  toggleEdit = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
      tempGrade: this.props.student.grade,
      error: "",
    }));
  };

  handleGradeChange = (event) => {
    this.setState({
      tempGrade: event.target.value,
      error: "",
    });
  };

  saveGrade = () => {
    const grade = Number(this.state.tempGrade);

    if (
      this.state.tempGrade === "" ||
      !Number.isFinite(grade) ||
      grade < 0 ||
      grade > 100
    ) {
      this.setState({
        error: "Grade must be a number between 0 and 100.",
      });
      return;
    }

    const result = this.props.onUpdateGrade(
      this.props.student.id,
      grade
    );

    if (result && !result.success) {
      this.setState({
        error: result.message,
      });
      return;
    }

    this.setState({
      isEditing: false,
      error: "",
    });
  };

  render() {
    const { student, onDelete } = this.props;

    const statusClass =
      student.status === "Passed" ? "passed" : "failed";

    return (
      <div className={`student-item ${statusClass}`}>
        <div className="student-info">
          <h3>{student.name}</h3>

          {this.state.isEditing ? (
            <>
              <input
                type="number"
                value={this.state.tempGrade}
                onChange={this.handleGradeChange}
                min="0"
                max="100"
                step="0.01"
                aria-label={`Grade for ${student.name}`}
              />

              {this.state.error && (
                <p
                  className="error-message"
                  role="alert"
                >
                  {this.state.error}
                </p>
              )}
            </>
          ) : (
            <span className="grade">
              Grade: {student.grade}
            </span>
          )}
        </div>

        <div className="actions">
          {this.state.isEditing ? (
            <>
              <button
                type="button"
                onClick={this.saveGrade}
                className="save-btn"
              >
                Save
              </button>

              <button
                type="button"
                onClick={this.toggleEdit}
                className="cancel-btn"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={this.toggleEdit}
              className="edit-btn"
            >
              Edit
            </button>
          )}

          <button
            type="button"
            onClick={() => onDelete(student.id)}
            className="delete-btn"
          >
            Delete
          </button>
        </div>

        <span className="status">
          {student.status}
        </span>
      </div>
    );
  }
}

StudentItem.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    grade: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["Passed", "Failed"]).isRequired,
  }).isRequired,
  onUpdateGrade: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default StudentItem;