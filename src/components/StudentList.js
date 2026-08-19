import React from "react";
import PropTypes from "prop-types";
import StudentItem from "./StudentItem";

class StudentList extends React.Component {
  render() {
    const {
      students,
      onUpdateGrade,
      onDelete,
    } = this.props;

    if (students.length === 0) {
      return (
        <p className="empty">
          No students found.
        </p>
      );
    }

    return (
      <div className="student-list">
        {students.map((student) => (
          <StudentItem
            key={student.id}
            student={student}
            onUpdateGrade={onUpdateGrade}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }
}

StudentList.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      grade: PropTypes.number.isRequired,
      status: PropTypes.oneOf(["Passed", "Failed"]).isRequired,
    })
  ).isRequired,
  onUpdateGrade: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default StudentList;