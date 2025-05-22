import Todo from "../models/todo.model.js";

export const createTodo = async (req, res) => {
  try {
    const { text, userId } = req.body;
    if (!text || !userId) {
      return res.status(400).json({ message: "Text and userId are required" });
    }

    let newTodo = new Todo({
      text,
      userId,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error("Error creating todo:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    console.error("Error fetching todo:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTodosUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const todos = await Todo.find({ userId });
    if (!todos || todos.length === 0) {
      return res.status(404).json({ message: "No todos found for this user" });
    }
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos by userId:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTodo = async (req, res) => {
  const { text, completed } = req.body;
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.text = text;
    if (completed !== undefined) {
      todo.completed = completed;
    }

    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodo = (req, res) => {
  res.send("Delete todo!");
};
