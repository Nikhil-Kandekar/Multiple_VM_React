import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, ListGroup, InputGroup, FormControl } from "react-bootstrap";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get("http://192.168.56.102:5000/api/tasks");
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (!title) return;

    const response = await axios.post("http://192.168.56.102:5000/api/tasks/", { title });

    setTodos([...todos, response.data]);
    setTitle("");
  };

  const deleteTodo = async (_id) => {
    await axios.delete(`http://192.168.56.102:5000/api/tasks/${_id}`);
    setTodos(todos.filter((todo) => todo._id !== _id));
  };

  const updateTodo = async () => {
    if (!title || !currentTodo) return;

    const response = await axios.put(
      `http://192.168.56.102:5000/api/tasks/${currentTodo._id}`,
      { title, completed: currentTodo.completed }
    );

    const updatedTodos = todos.map((todo) =>
      todo._id === response.data._id ? response.data : todo
    );
    setTodos(updatedTodos);
    setTitle("");
    setIsEditing(false);
    setCurrentTodo(null);
  };

  const editTodo = (todo) => {
    setIsEditing(true);
    setTitle(todo.title);
    setCurrentTodo(todo);
  };

  const toggleCompletion = async (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };

    try {
      const response = await axios.put(
        `http://192.168.56.102:5000/api/tasks/${todo._id}`,
        updatedTodo
      );

      const updatedTodos = todos.map((t) =>
        t._id === response.data._id ? response.data : t
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo completion:", error);
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Todo List</h1>

      <Row className="mb-4">
        <Col>
          <InputGroup>
            <FormControl
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new task"
            />
            <Button
              variant={isEditing ? "warning" : "primary"}
              onClick={isEditing ? updateTodo : addTodo}
            >
              {isEditing ? "Update" : "Add"}
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          {todos.length === 0 ? (
            <p className="text-center">No tasks available</p>
          ) : (
            <ListGroup>
              {todos.map((todo) => (
                <ListGroup.Item key={todo._id}>
                  <Row>
                    <Col xs={1}>
                      <Form.Check
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleCompletion(todo)}
                      />
                    </Col>
                    <Col>
                      <span
                        style={{
                          textDecoration: todo.completed ? "line-through" : "none",
                        }}
                      >
                        {todo.title}
                      </span>
                    </Col>
                    <Col xs={2} className="text-end">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => editTodo(todo)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="ms-2"
                        onClick={() => deleteTodo(todo._id)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;

