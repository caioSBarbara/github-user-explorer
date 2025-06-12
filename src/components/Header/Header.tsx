import React from "react";
import { Link } from "react-router-dom";
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  LogoIcon,
  LogoText,
} from "./Header.styles";

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <Link to="/">
            <LogoIcon>
              <img src="/github-icon.svg" alt="GitHub" />
            </LogoIcon>
            <LogoText>
              <span className="primary">GitHub</span>
              <span className="secondary">Explorer</span>
            </LogoText>
          </Link>
        </Logo>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
