import React from 'react';
import AddStudentForm from './components/AddStudentForm';
import StudentList from './components/StudentList';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      filter: 'all', // all, passed, failed
    };
  }

  // Lifecycle: Load initial data
  componentDidMount() {
    console.log('App: componentDidMount - Loading initial data');
    const initialStudents = [
      { id: 1, name: "Aarav Sharma", grade: 85, status: "Passed" },
      { id: 2, name: "Priya Patel", grade: 42, status: "Failed" },
      { id: 3, name: "Rohan Gupta", grade: 78, status: "Passed" },
    ];
    this.setState({ students: initialStudents });
  }

  // Lifecycle: Log state updates
  componentDidUpdate(prevProps, prevState) {
    if (prevState.students.length !== this.state.students.length) {
      console.log('App: componentDidUpdate - Students list changed');
    }
  }

  addStudent = (newStudent) => {
    this.setState(prevState => ({
      students: [...prevState.students, {
        id: Date.now(),
        name: newStudent.name,
        grade: parseInt(newStudent.grade),
        status: parseInt(newStudent.grade) >= 50 ? "Passed" : "Failed"
      }]
    }));
  };

  updateGrade = (id, newGrade) => {
    this.setState(prevState => ({
      students: prevState.students.map(student => 
        student.id === id 
          ? { ...student, grade: parseInt(newGrade), status: parseInt(newGrade) >= 50 ? "Passed" : "Failed" }
          : student
      )
    }));
  };

  deleteStudent = (id) => {
    this.setState(prevState => ({
      students: prevState.students.filter(student => student.id !== id)
    }));
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  render() {
    const filteredStudents = this.state.students.filter(student => {
      if (this.state.filter === 'passed') return student.status === "Passed";
      if (this.state.filter === 'failed') return student.status === "Failed";
      return true;
    });

    return (
      <div className="app">
        <div className="container">
          <h1>📊 Student Grade Tracker</h1>
          
          <AddStudentForm onAddStudent={this.addStudent} />

          <div className="filters">
            <button onClick={() => this.setFilter('all')} className={this.state.filter === 'all' ? 'active' : ''}>
              All Students
            </button>
            <button onClick={() => this.setFilter('passed')} className={this.state.filter === 'passed' ? 'active' : ''}>
              Passed
            </button>
            <button onClick={() => this.setFilter('failed')} className={this.state.filter === 'failed' ? 'active' : ''}>
              Failed
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

export default App;