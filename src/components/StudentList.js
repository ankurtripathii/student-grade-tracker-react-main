import React from 'react';
import StudentItem from './StudentItem';

function StudentList({ students, onUpdateGrade, onDelete }) {
  if (students.length === 0) return <p className="empty">No students found.</p>;

  return (
    <div className="student-list">
      {students.map((student) => (
        <StudentItem key={student.id} student={student} onUpdateGrade={onUpdateGrade} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default StudentList;
