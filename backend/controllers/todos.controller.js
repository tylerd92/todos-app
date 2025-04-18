export const getTodos = (req, res) => {
  res.send("Get all todos!");
};

export const getTodo = (req, res) => {
  res.send("Get todo based on id");
};

export const createTodo = (req, res) => {
  console.log(req.body);
  res.send("Create todo!");
};

export const updateTodo = (req, res) => {
  res.send("Update todo!");
};

export const deleteTodo = (req, res) => {
  res.send("Delete todo!");
};
