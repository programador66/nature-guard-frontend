import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 40px;
  background: #f5f5f5;
  min-height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
`;

export const Logo = styled.div`
  font-weight: bold;
`;

export const Filters = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  align-items: center;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: #eee;
`;

export const Select = styled.select`
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: #eee;
`;

export const SearchButton = styled.button`
  padding: 12px 20px;
  border-radius: 10px;
  border: none;
  background: #f26522;
  color: white;
  font-weight: bold;
`;

export const OrderSelect = styled.select`
  margin-left: auto;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: #eee;
`;

export const Breadcrumb = styled.div`
  margin: 20px 0;
  color: #666;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;