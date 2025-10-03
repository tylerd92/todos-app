import { useState } from "react";
import toast from "react-hot-toast";

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const addTodo = async (text, userId) => {
    if (!text.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, userId }),
      });
      const newTodo = await res.json();
      if (newTodo.error) {
        throw new Error(newTodo.error);
      }
      setTodos((prev) => [newTodo, ...prev]);
      toast.success("Todo created successfully");
    } catch (error) {
      toast.error("Failed to create todo");
      console.error("Error creating todo:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadTodos = async (userId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/todos/user/${userId}`);
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setTodos(data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/todos/${id}/toggle`, {
        method: "PATCH",
      });
      const updatedTodo = await res.json();
      if (updatedTodo.error) {
        throw new Error(updatedTodo.error);
      }
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
      toast.success("Todo toggled successfully");
      setLoading(false);
    } catch (error) {
      toast.error("Failed to toggle todo");
      console.error("Error toggling todo:", error.message);
    }
  };

  const updateTodo = async (id, text, completed) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, completed }),
      });
      const updatedTodo = await res.json();
      if (updatedTodo.error) {
        throw new Error(updatedTodo.error);
      }
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
      toast.success("Todo updated successfully");
      setLoading(false);
    } catch (error) {
      toast.error("Failed to update todo");
      console.error("Error updating todo:", error.message);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      toast.success("Todo deleted successfully");
      setLoading(false);
    } catch (error) {
      toast.error("Failed to delete todo");
      console.error("Error deleting todo:", error.message);
    }
  };

  const stats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    pending: todos.filter((todo) => !todo.completed).length,
  };

  return {
    todos,
    loading,
    stats,
    addTodo,
    loadTodos,
    toggleTodo,
    updateTodo,
    deleteTodo,
  };
};

export default useTodos;
