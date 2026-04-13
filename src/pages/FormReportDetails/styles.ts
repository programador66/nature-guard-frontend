import styled from "styled-components";

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


export const InputWrapper = styled.div`
  position: relative;
  margin-top: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: #eee;
`;

export const SearchIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #555;
`;

export const UploadBox = styled.div`
  margin-top: 15px;
  padding: 30px;
  border: 2px dashed #dcdcdc;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  text-align: center;
`;

export const UploadButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background: #eee;
  cursor: pointer;
`;

export const Button = styled.button`
  flex: 1;
  padding: 16px;
  width: 100%;
  border-radius: 10px;
  border: none;
  background: #f26522;
  color: white;
  font-weight: bold;
  cursor: pointer;
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

export const LocationBox = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MapWrapper = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

export const LocationInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: none;
  background: #eee;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    outline: 1.5px solid #f26522;
    background: #fff;
  }
`;

export const SelectedFile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 8px 12px;
  background: #fff3ec;
  border: 1px solid #f26522;
  border-radius: 8px;
  font-size: 13px;
  color: #f26522;
  font-weight: 500;

  svg {
    font-size: 16px;
    flex-shrink: 0;
  }
`;

export const ErrorText = styled.span`
  color: #e53935;
  font-size: 12px;
  margin-top: 4px;
`;
