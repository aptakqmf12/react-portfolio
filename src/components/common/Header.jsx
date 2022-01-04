import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "/public/images/logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { AUTH_FALSE } from "../../store";

const Block = styled.div``;
const StyledHeader = styled.header`
  margin-bottom: 25px;
  border-bottom: 1px #999 solid;
  ${".wrap"} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    overflow: hidden;
    ${"nav"} {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      ${"h1"} {
        max-width: 100px;
        margin-right: 20px;
        ${"img"} {
          width: 100%;
          max-width: 70px;
        }
      }
    }
  }
`;
const Navigation = styled.ul`
  display: flex;
  justify-content: flex-start;
  padding: 10px 0;
  ${"li"} {
    margin-right: 10px;
    ${`a`} {
    }
  }
`;

const Header = () => {
  const item = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <StyledHeader>
      <div className="wrap">
        <nav>
          <Link to="">
            <h1>
              <img src={Logo} alt="메인로고" />
            </h1>
          </Link>

          <Navigation>
            <li>
              <Link to="about">About</Link>
            </li>
            <li>
              <Link to="user">User</Link>
            </li>
          </Navigation>
        </nav>

        <div>
          {!item.isAuthorized ? (
            <Navigation>
              <li>
                <Link to="login">login</Link>
              </li>
              <li>
                <Link to="signup">signUp</Link>
              </li>
            </Navigation>
          ) : (
            <Navigation>
              <li>
                <Link
                  to=""
                  onClick={() => {
                    dispatch({ type: AUTH_FALSE });
                    localStorage.setItem("isAuthorized", false);
                    alert("로그아웃됐습니다");
                  }}
                >
                  logOut
                </Link>
              </li>
              <li>
                <Link to="mypage">myPage</Link>
              </li>
            </Navigation>
          )}
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
