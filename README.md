# React Todo List App

## Overview
This is a simple Todo List application built using React and Axios, with Bootstrap for styling. It allows users to create, update, delete, and mark tasks as completed. The application interacts with a backend API for persistent task storage.

## Features
- Fetch tasks from a backend API
- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed

## Prerequisites
- Node.js installed
- Backend API running on `http://192.168.56.102:5000`

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Configuration
Ensure the backend API is running at `http://192.168.56.102:5000/api/tasks`. If needed, update the API URL in the code.

## Running the Application
Start the development server with:
```sh
npm start
```

## API Endpoints

### Get all tasks
```
GET /api/tasks
```
Response:
```json
[
  { "_id": "1", "title": "Task 1", "completed": false }
]
```

### Create a new task
```
POST /api/tasks
```
Request Body:
```json
{
  "title": "New Task"
}
```
Response:
```json
{
  "_id": "2", "title": "New Task", "completed": false
}
```

### Update a task
```
PUT /api/tasks/:id
```
Request Body:
```json
{
  "title": "Updated Task",
  "completed": true
}
```

### Delete a task
```
DELETE /api/tasks/:id
```

## License
This project is licensed under the MIT License.

