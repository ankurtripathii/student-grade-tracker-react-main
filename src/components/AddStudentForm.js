import React, { useState } from 'react';

function AddStudentForm({ onAddStudent }) {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const numericGrade = Number(grade);
    if (!name.trim() || !Number.isFinite(numericGrade) || numericGrade < 0 || numericGrade > 100) return;

    onAddStudent({ name, grade: numericGrade });
    setName('');
    setGrade('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <label className="sr-only" htmlFor="student-name">Student Name</label>
      <input id="student-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" autoComplete="name" required />
      <label className="sr-only" htmlFor="student-grade">Grade</label>
      <input id="student-grade" type="number" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="Grade (0-100)" min="0" max="100" required />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudentForm;
