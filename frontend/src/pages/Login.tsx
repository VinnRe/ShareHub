import { useState, FormEvent } from "react";
import { useLogin } from "../hooks/useLogin";
import "./styles/Login.css";
import LogoText from '../assets/logo_text.png'

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login(emailOrUsername, password);
  };

  return (
    <section className="login">
      <div className="image"></div>
      <div className="login-container">
        <div className="welcome-container">
          <img src={LogoText} alt="asdasd" />
          <h1 className="wc1">Hello,</h1>
          <div className="wc-h1">
            <h1 className="wc2">Welcome</h1>
            <h1 className="wc3">Back</h1>
            <h1 className="wc4">...</h1>
          </div>
          <p>
            Don't have an account yet? <a href="/signup">Create Account</a>
          </p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            placeholder="EMAIL OR USERNAME"
            type="text"
            onChange={(e) => setEmailOrUsername(e.target.value)}
            value={emailOrUsername}
            required
          />
          <input
            placeholder="PASSWORD"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <div className="form-actions">
            <button className="login-btn">
              Login
            </button>
            {error && <div className="error">{error}</div>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;