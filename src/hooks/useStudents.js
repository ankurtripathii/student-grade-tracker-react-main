import { useCallback, useEffect, useMemo, useState } from 'react';

const INITIAL_STUDENTS = [
  { id: 1, name: 'Aarav Sharma', grade: 85, status: 'Passed' },
  { id: 2, name: 'Priya Patel', grade: 42, status: 'Failed' },
  { id: 3, name: 'Rohan Gupta', grade: 78, status: 'Passed' },
];

const REFRESH_INTERVAL = 60 * 1000;
const API_URL = process.env.REACT_APP_STUDENTS_API_URL;

function normalizeStudents(data) {
  const list = Array.isArray(data) ? data : data.students;
  if (!Array.isArray(list)) throw new Error('Students API must return an array or { students: [] }');
  return list.map((student, index) => {
    const grade = Number(student.grade);
    return {
      id: student.id ?? index + 1,
      name: String(student.name ?? ''),
      grade,
      status: grade >= 50 ? 'Passed' : 'Failed',
    };
  });
}

export default function useStudents() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [lastUpdated, setLastUpdated] = useState(() => new Date());
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async () => {
    if (!API_URL) {
      setLastUpdated(new Date());
      return;
    }
    try {
      const response = await fetch(API_URL, { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`Failed to fetch students (${response.status})`);
      setStudents(normalizeStudents(await response.json()));
      setError(null);
      setLastUpdated(new Date());
    } catch (fetchError) {
      console.error('Student refresh failed:', fetchError);
      setError(fetchError.message);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
    const intervalId = window.setInterval(fetchStudents, REFRESH_INTERVAL);
    return () => window.clearInterval(intervalId);
  }, [fetchStudents]);

  const addStudent = useCallback(({ name, grade }) => {
    const numericGrade = Number(grade);
    setStudents((current) => [...current, {
      id: Date.now(), name: name.trim(), grade: numericGrade,
      status: numericGrade >= 50 ? 'Passed' : 'Failed',
    }]);
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

  return useMemo(() => ({ students, addStudent, updateGrade, deleteStudent, lastUpdated, refresh: fetchStudents, error }), [
    students, addStudent, updateGrade, deleteStudent, lastUpdated, fetchStudents, error,
  ]);
}
