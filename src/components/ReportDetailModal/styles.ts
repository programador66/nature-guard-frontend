import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
  backdrop-filter: blur(3px);
`;

export const ModalContainer = styled.div`
  background: #fff;
  border-radius: 18px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

/* IMAGE SECTION */

export const ImageSection = styled.div`
  position: relative;
  height: 260px;
  background: #1a1a2e;
  flex-shrink: 0;
  overflow: hidden;
`;

export const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const NoImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #eef0f2;
  color: #aaa;
  font-size: 13px;

  svg {
    font-size: 40px;
    opacity: 0.4;
  }
`;

export const ImageBadge = styled.div`
  position: absolute;
  top: 14px;
  left: 14px;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  backdrop-filter: blur(4px);

  svg {
    font-size: 15px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.45);
  border: none;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: background 0.15s;

  svg {
    font-size: 18px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export const CarouselArrow = styled.button<{ direction: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ direction }) => direction}: 10px;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.45);
  border: none;
  color: #fff;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: background 0.15s;

  svg {
    font-size: 20px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export const Dots = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
`;

export const Dot = styled.div<{ active: boolean }>`
  width: ${({ active }) => (active ? "20px" : "8px")};
  height: 8px;
  border-radius: 4px;
  background: ${({ active }) => (active ? "#f26522" : "rgba(255,255,255,0.6)")};
  transition: width 0.2s, background 0.2s;
`;

/* CONTENT SECTION */

export const Content = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`;

export const ReportTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #1d2340;
  margin: 0 0 6px;
  line-height: 1.3;
`;

export const Meta = styled.p`
  font-size: 13px;
  color: #888;
  margin: 0 0 14px;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
`;

export const Tag = styled.span`
  background: #fff3ec;
  color: #f26522;
  border: 1px solid #f26522;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

export const DescriptionText = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.7;
  margin: 0 0 20px;
`;

export const AddressSection = styled.div`
  border-top: 1px solid #f0f0f0;
  padding-top: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

export const AddressInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: 11px;
    font-weight: 700;
    color: #aaa;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  span:last-child {
    font-size: 13px;
    color: #555;
    line-height: 1.4;
    max-width: 260px;
  }
`;

export const MapsButton = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  padding: 9px 16px;
  border-radius: 10px;
  background: #f26522;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s;
  flex-shrink: 0;

  svg {
    font-size: 16px;
  }

  &:hover {
    background: #d9541b;
  }
`;
