import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  margin-top: 25px;
  border-top: 1px #999 solid;
  .wrap {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    h2 {
      font-size: 2.4rem;
      margin-bottom: 1rem;
    }
    ul {
      li {
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
        address {
          font-weight: bold;
        }
      }
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="wrap">
        <div>
          <h2>profile</h2>
          <ul>
            <li>name : ktw</li>
            <li>
              phone : <a href="tel:010-8009-5439">010-8009-5439</a>
            </li>
            <li>
              email :{" "}
              <a href="mailto:aptakqmf12@gmail.com">aptakqmf12@gmail.com</a>
            </li>
            <li>
              github :{" "}
              <a href="https://github.com/aptakqmf12" target="_blank">
                https://github.com/aptakqmf12
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Address</h2>
          <ul>
            <li>
              <address>서울시 동작구 대방동 391-2</address>
            </li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
