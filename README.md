# Jobby App

Jobby is a React-based job search application that simulates a real-world job portal. It allows users to log in, browse job listings with advanced filtering options, and view detailed information about specific job roles.

## 🚀 Live Demo
🔗 **[Launch Jobby App](https://akil5jobby.ccbp.tech/login)**

### 🔐 Demo Credentials
* **Username:** `henry`
* **Password:** `henry_the_developer`

---

## 🚀 Features

* **User Authentication**: Secure login system using JWT tokens stored in cookies.
* **Protected Routes**: Restricts access to job content for unauthenticated users.
* **Job Search**: Search for specific jobs by title.
* **Advanced Filtering**:
    * Filter by **Employment Type** (Full Time, Part Time, Freelance, Internship).
    * Filter by **Salary Range** (10 LPA to 40 LPA+).
* **Job Details**: Comprehensive view of job roles including:
    * Company description and "Life at Company" insights.
    * Required skills with visual icons.
    * Similar job recommendations.
* **Responsive Design**: Optimized for various screen sizes.
* **State Management**: Handles Loading, Success, and Error states for API requests.

## 🛠 Tech Stack

* **Frontend**: React JS (v17)
* **Routing**: React Router DOM
* **Authentication**: JWT, JS Cookie
* **Styling**: CSS
* **Icons**: React Icons
* **Loader**: React Loader Spinner

## 📂 Project Structure

```bash
src/
├── components/
│   ├── FilterSection/   # Components for filter groups
│   ├── Header/          # Navigation bar
│   ├── Home/            # Landing page
│   ├── JobCard/         # Individual job item in the list
│   ├── JobDetails/      # Detailed view of a specific job
│   ├── Jobs/            # Main jobs listing page with filters
│   ├── Login/           # Login form and authentication logic
│   ├── NotFound/        # 404 Error page
│   ├── ProtectedRoute/  # Wrapper for secure routes
│   └── SimilarJobCard/  # Component for similar job suggestions
├── App.js               # Main routing configuration
└── index.js             # Entry point
