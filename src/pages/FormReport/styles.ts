import styled from "styled-components";

interface CardProps {
  active?: boolean;
}

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Left = styled.div`
  flex: 1;
  background-size: cover;
  padding-left: 10%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Right = styled.div`
  flex: 1;
  padding: 60px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 32px 20px;
  }
`;

export const Step = styled.span`
  font-size: 14px;
  color: #888;
`;

export const Title = styled.h1`
  margin: 10px 0;
`;

export const Subtitle = styled.p`
  color: #666;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  margin-top: 15px;
  font-size: 14px;
  padding-top: 10px;
  padding-bottom: 5px;
`;

export const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #eee;
  margin-top: 5px;
`;

export const TextArea = styled.textarea`
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #eee;
  margin-top: 5px;
  height: 100px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 15px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div<CardProps>`
  padding: 20px;
  border-radius: 10px;
  background: ${({ active }) => (active ? "#ffe5d6" : "#eee")};
  border: 2px solid ${({ active }) => (active ? "#f26522" : "transparent")};

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  cursor: pointer;
  transition: 0.2s;

  svg {
    color: ${({ active }) => (active ? "#f26522" : "#555")};
  }

  &:hover {
    transform: scale(1.02);
  }
`;

export const Button = styled.button`
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  background: #f26522;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #d9541b;
  }
`;

export const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


export const BackButton = styled.button`
  flex: 1;
  padding: 15px 20px;
  border-radius: 10px;
  border: none;
  background: #eaeaea;
  color: #333;
  cursor: pointer;

  &:hover {
    background: #ddd;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 12px;
  margin-top: 30px;
`;

export const ErrorText = styled.span`
  color: #e53935;
  font-size: 12px;
  margin-top: 4px;
`;
