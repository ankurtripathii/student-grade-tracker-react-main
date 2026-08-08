import React from 'react';

class StudentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      tempGrade: props.student.grade
    };
  }

  toggleEdit = () => {
    this.setState(prev => ({ isEditing: !prev.isEditing }));
  };

  saveGrade = () => {
    this.props.onUpdateGrade(this.props.student.id, this.state.tempGrade);
    this.setState({ isEditing: false });
  };

  render() {
    const { student, onDelete } = this.props;
    const statusClass = student.status === "Passed" ? "passed" : "failed";

    return (
      <div className={`student-item ${statusClass}`}>
        <div className="student-info">
          <h3>{student.name}</h3>
          {this.state.isEditing ? (
            <input
              type="number"
              value={this.state.tempGrade}
              onChange={(e) => this.setState({ tempGrade: e.target.value })}
              min="0"
              max="100"
            />
          ) : (
            <span className="grade">Grade: {student.grade}</span>
          )}
        </div>

        <div className="actions">
          {this.state.isEditing ? (
            <button onClick={this.saveGrade} className="save-btn">Save</button>
          ) : (
            <button onClick={this.toggleEdit} className="edit-btn">Edit</button>
          )}
          <button onClick={() => onDelete(student.id)} className="delete-btn">Delete</button>
        </div>

        <span className="status">{student.status}</span>
      </div>
    );
  }
}

export default StudentItem;