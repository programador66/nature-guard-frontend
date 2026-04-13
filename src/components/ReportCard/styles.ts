import styled from "styled-components";

export const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  margin-bottom: 5px;
`;

export const User = styled.span`
  display: block;
  font-size: 13px;
  color: #333;
  opacity: 0.5;
  margin-top: 2px;
  margin-bottom: 2px;
`;

export const Tags = styled.div`
  display: flex;
  gap: 5px;
  margin: 10px 0;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  background: #f26522;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 12px;
  color: white;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #555;
  flex: 1;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

export const Button = styled.button`
  flex: 1;
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  background: #eee;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: background 0.15s;

  &:hover {
    background: #e0e0e0;
  }
`;

export const EditButton = styled.button`
  flex: 1;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1.5px solid #f26522;
  background: transparent;
  color: #f26522;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: background 0.15s, color 0.15s;

  svg {
    font-size: 16px;
  }

  &:hover {
    background: #f26522;
    color: white;
  }
`;
