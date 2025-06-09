import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic, such as sending a request to your backend
    console.log("Username:", username);
  };

  return (
    <div>
      <div>
        <h1>Login Todo App</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <span>Username</span>
          </label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter your username'
          />
        </div>

        <div>
          <label>
            <span>Password</span>
          </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
          />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
