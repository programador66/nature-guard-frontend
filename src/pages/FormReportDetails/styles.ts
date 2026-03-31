import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f5f5f5;
`;

export const Left = styled.div`
  flex: 1;
  background-size: cover;
  padding-left: 10%;
`;

export const Right = styled.div`
  flex: 1;
  padding: 60px;
  display: flex;
  flex-direction: column;
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