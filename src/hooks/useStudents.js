import { useCallback, useEffect, useMemo, useState } from 'react';

const INITIAL_STUDENTS = [
  { id: 1, name: 'Aarav Sharma', grade: 85, status: 'Passed' },
  { id: 2, name: 'Priya Patel', grade: 42, status: 'Failed' },
  { id: 3, name: 'Rohan Gupta', grade: 78, status: 'Passed' },
];

const REFRESH_INTERVAL = 60 * 1000;

export default function useStudents() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [lastUpdated, setLastUpdated] = useState(() => new Date());

  const fetchStudents = useCallback(async () => {
    // Replace this function body with your API call when a backend endpoint is available.
    // Example: const response = await fetch('/api/students');
    // const data = await response.json();
    // setStudents(data);
    setLastUpdated(new Date());
  }, []);

  useEffect(() => {
    fetchStudents();
    const intervalId = window.setInterval(fetchStudents, REFRESH_INTERVAL);
    return () => window.clearInterval(intervalId);
  }, [fetchStudents]);

  const addStudent = useCallback(({ name, grade }) => {
    const numericGrade = Number(grade);
    setStudents((current) => [
      ...current,
      {
        id: Date.now(),
        name: name.trim(),
        grade: numericGrade,
        status: numericGrade >= 50 ? 'Passed' : 'Failed',
      },
    ]);
  }, []);

  const updateGrade = useCallback((id, newGrade) => {
    const numericGrade = Number(newGrade);
    if (!Number.isFinite(numericGrade) || numericGrade < 0 || numericGrade > 100) return;

    setStudents((current) => current.map((student) => (
      student.id === id
        ? { ...student, grade: numericGrade, status: numericGrade >= 50 ? 'Passed' : 'Failed' }
        : student
    )));
  }, []);

  const deleteStudent = useCallback((id) => {
    setStudents((current) => current.filter((student) => student.id !== id));
  }, []);

  return useMemo(() => ({ students, addStudent, updateGrade, deleteStudent, lastUpdated, refresh: fetchStudents }), [
    students,
    addStudent,
    updateGrade,
    deleteStudent,
    lastUpdated,
    fetchStudents,
  ]);
}
