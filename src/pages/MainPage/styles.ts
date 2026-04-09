import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: #f6f6f6;
  padding: 32px 80px;

  @media (max-width: 1024px) {
    padding: 24px 40px;
  }

  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;

/* HEADER */

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8%;

  @media (max-width: 768px) {
    padding-left: 0;
    flex-wrap: wrap;
    gap: 12px;
  }
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

  @media (max-width: 1024px) {
    padding-left: 0;
    gap: 24px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding-left: 0;
    padding-top: 32px;
    padding-bottom: 32px;
    gap: 32px;
  }
`;

export const Left = styled.div`
  flex: 1;
  max-width: 500px;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    text-align: center;
  }
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

  @media (max-width: 1024px) {
    font-size: 42px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
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

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

export const Image = styled.img`
  width: 750px;
  max-width: none;
  margin-right: -80px;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 480px;
    margin-right: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 320px;
    margin-right: 0;
  }
`;