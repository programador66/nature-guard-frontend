import styled from "styled-components";

export const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h3`
  margin-bottom: 5px;
`;

export const User = styled.span`
  color: #666;
  font-size: 14px;
`;

export const Tags = styled.div`
  display: flex;
  gap: 5px;
  margin: 10px 0;
  
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
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  background: #eee;
  cursor: pointer;
`;