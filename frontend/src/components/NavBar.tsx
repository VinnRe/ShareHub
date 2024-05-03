import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import "./styles/NavBar.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { IoLogOut } from "react-icons/io5";
import { useLogout } from "../hooks/useLogout";

interface ButtonProps {
  active: boolean;
}

const StyledLink = styled(Link)<ButtonProps>`
  text-decoration: none;
  color: ${(props: ButtonProps) => (props.active ? "#ff9600" : "#1d2434")};
`;

const NavBar = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  const { logout } = useLogout()

  const handleLogout = () => {
    logout()
  }

  const renderRightNavButtons = () => {
    if (location.pathname.startsWith("/community-forum")) {
      return;
    } else {
      return (
        <>
          {user && (
            <>
              <span className="nav-user">{user.data.email}</span>
              <button className="button-user" onClick={handleLogout}><IoLogOut style={{ strokeWidth: '1.3rem' }}/></button>
            </>
          )}
          {!user && (
            <>
              <Link to="/signup" className="register-btn">
                REGISTER
              </Link>
              <Link to="/login" className="login-btn">
                LOGIN
              </Link>
            </>
          )}
        </>
      );
    }
  };

  return (
    <nav className="nav-container">
      <div className="left-nav-container">
        <img src="./src/assets/text-logo.png" alt="" />
        <StyledLink
          to="/home"
          active={location.pathname.startsWith("/home")}
        >
          HOME
        </StyledLink>
        <StyledLink
          to="/share"
          active={location.pathname.startsWith("/share")}
        >
          SHARE
        </StyledLink>
        {/* MAKE AN IF STATEMENT THAT IF USER IS MOD OR ADMIN MODERATE WILL SHOW */}
        <StyledLink
          to="/moderate"
          active={location.pathname.startsWith("/moderate")}
        >
          MODERATE
        </StyledLink>
      </div>
      <div className="right-nav-container">{renderRightNavButtons()}</div>
    </nav>
  );
};

export default NavBar;