import styled from "styled-components";

export const Container = styled.div`
  padding: 24px 40px;
  background: #f5f5f5;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 16px 16px;
  }
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  padding: 16px 20px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

export const SearchWrapper = styled.div`
  flex: 1;
  min-width: 200px;
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 12px;
    color: #aaa;
    font-size: 20px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 14px 10px 38px;
  border-radius: 10px;
  border: 1.5px solid #e8e8e8;
  background: #fafafa;
  font-size: 14px;
  color: #333;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border-color: #f26522;
    background: #fff;
  }
`;

export const FilterSelect = styled.select`
  padding: 10px 36px 10px 14px;
  border-radius: 10px;
  border: 1.5px solid #e8e8e8;
  background: #fafafa url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23f26522' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 12px center;
  appearance: none;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s;

  &:focus {
    border-color: #f26522;
    background-color: #fff;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background: #f26522;
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;

  svg {
    font-size: 18px;
  }

  &:hover {
    background: #d9541b;
  }
`;

export const OrderSelect = styled(FilterSelect)`
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

export const Breadcrumb = styled.div`
  margin: 20px 0 16px;
  color: #888;
  font-size: 13px;

  span {
    color: #f26522;
    font-weight: 600;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
  text-align: center;

  img {
    width: 240px;
    opacity: 0.7;
  }

  h3 {
    font-size: 20px;
    color: #1d2340;
    margin: 0;
  }

  p {
    font-size: 14px;
    color: #888;
    margin: 0;
    max-width: 360px;
    line-height: 1.6;
  }
`;
