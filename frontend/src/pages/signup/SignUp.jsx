import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }
    // Here you would typically handle the signup logic, such as sending a request to your backend
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div>
      <div>
        <h1>Sign Up Todo App</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <span>Email</span>
          </label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
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
            required
          />
        </div>

        <div>
          <label>
            <span>Confirm Password</span>
          </label>
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm your password'
            required
          />
        </div>

        <div>
          <button type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
