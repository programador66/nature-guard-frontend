import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #ffffff;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Left = styled.div`
  flex: 1;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    max-width: 560px;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;

  @media (max-width: 768px) {
    padding: 40px 24px;
    align-items: flex-start;
    padding-top: 60px;
  }
`;

export const Form = styled.div`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1d2340;
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 28px;
  line-height: 1.5;
`;

export const Label = styled.label`
  font-size: 13px;
  color: #555;
  margin-bottom: 6px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1.5px solid transparent;
  background: #eef0f2;
  font-size: 14px;
  color: #333;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #f26522;
    background: #fff;
  }
`;

export const ForgotLink = styled.span`
  font-size: 13px;
  color: #f26522;
  font-weight: 600;
  text-align: right;
  cursor: pointer;
  margin-top: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

export const Button = styled.button`
  margin-top: 8px;
  padding: 16px;
  border: none;
  border-radius: 10px;
  background: #f26522;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #d9541b;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.span`
  font-size: 12px;
  color: #e53e3e;
  margin-top: 4px;
  display: block;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
  color: #aaa;
  font-size: 13px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #e0e0e0;
  }
`;

export const RegisterRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #555;
`;

export const RegisterLink = styled.span`
  color: #f26522;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
