import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import Logo from "/public/logo.png";

const Navigation = styled.ul`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  padding: 10px 0;
  background-color: #003876;
  ${"li"} {
    margin-right: 10px;
    ${`a`} {
      color: white;
    }
  }
`;

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <h1>{/* <img src={Logo} /> */}</h1>
      <nav>
        <Navigation>
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            <Link to="user">User</Link>
          </li>
        </Navigation>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          prev
        </button>
        <button
          onClick={() => {
            navigate(+1);
          }}
        >
          next
        </button>
      </nav>
    </header>
  );
};

export default Header;
