import React, { useEffect, useState } from 'react';

function StudentItem({ student, onUpdateGrade, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempGrade, setTempGrade] = useState(student.grade);

  useEffect(() => {
    if (!isEditing) setTempGrade(student.grade);
  }, [student.grade, isEditing]);

  const saveGrade = () => {
    onUpdateGrade(student.id, tempGrade);
    setIsEditing(false);
  };

  const statusClass = student.status === 'Passed' ? 'passed' : 'failed';

  return (
    <article className={`student-item ${statusClass}`}>
      <div className="student-info">
        <h3>{student.name}</h3>
        {isEditing ? (
          <input type="number" value={tempGrade} onChange={(e) => setTempGrade(e.target.value)} min="0" max="100" aria-label={`${student.name} grade`} />
        ) : (
          <span className="grade">Grade: {student.grade}</span>
        )}
      </div>
      <div className="actions">
        {isEditing ? (
          <button type="button" onClick={saveGrade} className="save-btn">Save</button>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
        )}
        <button type="button" onClick={() => onDelete(student.id)} className="delete-btn">Delete</button>
      </div>
      <span className="status">{student.status}</span>
    </article>
  );
}

export default StudentItem;
