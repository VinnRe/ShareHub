import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import "./styles/NavBar.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { IoLogOut } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useLogout } from "../hooks/useLogout";
import LogoText from '../assets/logo_text.png'
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
  }

  const handleSwitchPage = () => {
    navigate('/account-settings')
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
              <button className="button-user" onClick={handleSwitchPage}><MdAccountCircle /></button>
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
        <img src={LogoText} alt="" className="logo-text"/>
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