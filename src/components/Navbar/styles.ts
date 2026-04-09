import styled from "styled-components";

export const NavbarWrapper = styled.nav`
  width: 100%;
  background: #f26522;
  padding: 0 32px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const NavLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const NavCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const NavLink = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.85);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
  }

  &.active {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-weight: 600;
  }
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const UserChip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;

  svg {
    font-size: 18px;
    opacity: 0.9;
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 28px;
  background: rgba(255, 255, 255, 0.3);
  margin: 0 4px;
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  padding: 7px 14px;
  cursor: pointer;
  transition: background 0.15s;

  svg {
    font-size: 18px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

export const NavAuthButton = styled.button`
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
`;

export const NavButtonOutline = styled(NavAuthButton)`
  background: transparent;
  border: 1.5px solid rgba(255, 255, 255, 0.7);
  color: #fff;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const NavButtonPrimary = styled(NavAuthButton)`
  background: #fff;
  border: none;
  color: #f26522;

  &:hover {
    background: rgba(255, 255, 255, 0.85);
  }
`;
