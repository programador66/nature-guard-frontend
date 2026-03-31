import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  background: #f6f6f6;
  padding: 32px 80px;
`;

/* HEADER */

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8%;
`;

export const Logo = styled.div`
  font-weight: bold;
  font-size: 18px;
  padding-left: 10%;
  span {
    display: block;
    font-size: 12px;
    color: #777;
  }
`;

export const Nav = styled.div`
  display: flex;
  gap: 12px;
`;

/* BOTÕES */

export const ButtonPrimary = styled.button`
  background: #f26522;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #d9541b;
  }
`;

export const ButtonOutline = styled.button`
  background: #eaeaea;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  color: #333;
  cursor: pointer;
`;

/* HERO */

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90%;
  padding-left: 8%;
`;

export const Left = styled.div`
  flex: 1;
  max-width: 500px;
`;

export const Tag = styled.span`
  color: #f26522;
  font-weight: bold;
  font-size: 14px;
`;

export const Title = styled.h1`
  font-size: 56px;
  color: #1d2340;

  span {
    position: relative;
    z-index: 1;
  }
`;

export const Description = styled.p`
  color: #555;
  font-size: 16px;
  line-height: 1.6;
`;

export const Actions = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 12px;
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

export const Image = styled.img`
  width: 750px;
  max-width: none;
  margin-right: -80px;
`;