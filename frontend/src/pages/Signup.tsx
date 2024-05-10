import { useState, FormEvent } from "react";
import { useSignup } from "../hooks/useSignup";
import "./styles/Signup.css";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signup(
      firstName,
      lastName,
      username,
      email,
      password
    );
  };

  return (
    <section className="signup">
      <div className="signup-container">
        <div className="signup-text-container">
          <img src="./src/assets/magister-logo.png" alt="" />
          <p>START FOR FREE</p>
          <div className="create-acc-header">
            <h1>
              {" "}
              <span className="cah-1">Create</span>
              <span className="cah-2">New Account</span>
              <span className="cah-3">.</span>
            </h1>
          </div>
          <p className="already-mem">
            Already a member? <a href="/login">Login</a>
          </p>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            placeholder="FIRST NAME"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            required
          />
          <input
            placeholder="LAST NAME"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            required
          />
          <input
            placeholder="EMAIL"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            placeholder="PASSWORD"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <input
            placeholder="CONFIRM PASSWORD"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
          <div className="form-actions--s">
            <button>Signup</button>
            {error && <div className="error">{error}</div>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;