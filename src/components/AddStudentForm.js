import React from 'react';

class AddStudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      grade: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name && this.state.grade) {
      this.props.onAddStudent({
        name: this.state.name,
        grade: this.state.grade
      });
      this.setState({ name: '', grade: '' }); // Clear form
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="add-form">
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Student Name"
          required
        />
        <input
          type="number"
          name="grade"
          value={this.state.grade}
          onChange={this.handleChange}
          placeholder="Grade (0-100)"
          min="0"
          max="100"
          required
        />
        <button type="submit">Add Student</button>
      </form>
    );
  }
}

export default AddStudentForm;