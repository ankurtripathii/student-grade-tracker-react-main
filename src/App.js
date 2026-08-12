import React, { lazy, Suspense, useMemo, useState } from 'react';
import './App.css';
import useStudents from './hooks/useStudents';

const AddStudentForm = lazy(() => import('./components/AddStudentForm'));
const StudentList = lazy(() => import('./components/StudentList'));

function LoadingFallback() {
  return <div className="loading" role="status">Loading…</div>;
}

function App() {
  const [filter, setFilter] = useState('all');
  const { students, addStudent, updateGrade, deleteStudent, lastUpdated, refresh } = useStudents();

  const filteredStudents = useMemo(() => students.filter((student) => {
    if (filter === 'passed') return student.status === 'Passed';
    if (filter === 'failed') return student.status === 'Failed';
    return true;
  }), [students, filter]);

  return (
    <main className="app">
      <section className="container" aria-labelledby="page-title">
        <header className="header">
          <div>
            <h1 id="page-title">📊 Student Grade Tracker</h1>
            <p className="subtitle">Manage grades and track student performance.</p>
          </div>
          <button type="button" className="refresh-btn" onClick={refresh}>Refresh</button>
        </header>

        <Suspense fallback={<LoadingFallback />}>
          <AddStudentForm onAddStudent={addStudent} />
          <div className="toolbar">
            <div className="filters" role="group" aria-label="Filter students">
              {['all', 'passed', 'failed'].map((value) => (
                <button key={value} type="button" onClick={() => setFilter(value)} className={filter === value ? 'active' : ''} aria-pressed={filter === value}>
                  {value === 'all' ? 'All Students' : value[0].toUpperCase() + value.slice(1)}
                </button>
              ))}
            </div>
            <span className="updated">Updated {lastUpdated.toLocaleTimeString()}</span>
          </div>
          <StudentList students={filteredStudents} onUpdateGrade={updateGrade} onDelete={deleteStudent} />
        </Suspense>
      </section>
    </main>
  );
}

export default App;
