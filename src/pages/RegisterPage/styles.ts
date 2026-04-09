import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  gap: 8px;
  font-size: 14px;
  color: #555;

  @media (max-width: 480px) {
    padding: 16px 20px;
    flex-wrap: wrap;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background 0.15s;

  &:hover {
    background: #f0f0f0;
    color: #333;
  }

  svg {
    font-size: 18px;
  }
`;

export const TopBarLink = styled.span`
  color: #f26522;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const FormWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px 40px;

  @media (max-width: 480px) {
    align-items: flex-start;
    padding-top: 16px;
  }
`;

export const Form = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1d2340;
  margin-bottom: 28px;
`;

export const Label = styled.label`
  font-size: 13px;
  color: #555;
  margin-bottom: 6px;
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 4px;
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

export const InputWithIcon = styled(Input)`
  padding-right: 44px;
`;

export const EyeButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  display: flex;
  align-items: center;
  padding: 0;
`;

export const Hint = styled.span`
  font-size: 12px;
  color: #888;
  margin-bottom: 16px;
  display: block;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

export const Button = styled.button`
  margin-top: 24px;
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

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0 4px;
  padding: 14px 16px;
  background: #eef0f2;
  border-radius: 10px;
`;

export const ToggleLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  span:first-child {
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  span:last-child {
    font-size: 12px;
    color: #888;
  }
`;

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex-shrink: 0;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background: #ccc;
    border-radius: 24px;
    transition: background 0.2s;

    &::before {
      content: "";
      position: absolute;
      width: 18px;
      height: 18px;
      left: 3px;
      bottom: 3px;
      background: white;
      border-radius: 50%;
      transition: transform 0.2s;
    }
  }

  input:checked + span {
    background: #f26522;
  }

  input:checked + span::before {
    transform: translateX(20px);
  }
`;
