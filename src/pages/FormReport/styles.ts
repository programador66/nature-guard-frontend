import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  background: white;
  padding: 32px;
  width: 400px;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
`;

export const Title = styled.h1`
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-top: 12px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-top: 6px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #2e7d32;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #1b5e20;
  }`;