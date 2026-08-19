# 📊 Student Grade Tracker

A React-based Student Grade Tracker application built using
**Class Components**, **React Lifecycle Methods**, controlled forms,
validation, filtering, sorting, and reusable components.

##  Features

- Add new students with name and grade
- Grade validation from 0 to 100
- Input sanitization
- Inline grade editing
- Passed / Failed status calculation
- Filter students by:
  - All
  - Passed
  - Failed
- Sort students by grade
- Delete students
- Responsive user interface
- React Class Components
- React lifecycle methods:
  - `componentDidMount`
  - `componentDidUpdate`
  - `componentWillUnmount`
- PropTypes for component type safety
- Error messages for invalid input
- Automated tests using React Testing Library

##  Technologies Used

- React.js
- JavaScript
- React Class Components
- React Lifecycle Methods
- React Testing Library
- Jest
- PropTypes
- CSS

## 📁 Project Structure

```text
student-grade-tracker-react-main/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── AddStudentForm.js
│   │   ├── StudentItem.js
│   │   └── StudentList.js
│   │
│   ├── App.js
│   ├── App.css
│   ├── App.test.js
│   ├── index.js
│   ├── index.css
│   └── setupTests.js
│
├── screenshot/
│   └── screenshot1.png
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md


 How to Run
1. Clone the repository
git clone https://github.com/ankurtripathii/student-grade-tracker-react-main.git
2. Open the project directory
cd student-grade-tracker-react-main
3. Install dependencies
npm install
4. Start the development server
npm start

The application will normally be available at:

http://localhost:3000
Run Tests

Run the automated tests with:

npm test

For a single test run:

CI=true npm test
Create Production Build
npm run build