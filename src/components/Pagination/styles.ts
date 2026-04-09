import styled, { css } from "styled-components";

export const PaginationWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 32px;
  padding: 16px 0;
  flex-wrap: wrap;
`;

const baseButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  height: 38px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1.5px solid #e8e8e8;
  background: #fff;
  color: #555;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;

  &:hover:not(:disabled) {
    border-color: #f26522;
    color: #f26522;
    background: #fff5f0;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const ArrowButton = styled.button`
  ${baseButton}
  gap: 4px;
  font-weight: 600;

  svg {
    font-size: 18px;
  }
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  ${baseButton}

  ${({ $active }) =>
    $active &&
    css`
      background: #f26522;
      border-color: #f26522;
      color: #fff;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(242, 101, 34, 0.3);

      &:hover:not(:disabled) {
        background: #d9541b;
        border-color: #d9541b;
        color: #fff;
      }
    `}
`;

export const Ellipsis = styled.span`
  min-width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 14px;
  letter-spacing: 2px;
  user-select: none;
`;

export const PageInfo = styled.span`
  font-size: 13px;
  color: #888;
  margin-left: 12px;
`;

