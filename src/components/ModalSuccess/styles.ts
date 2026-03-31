import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 9999;
`;

export const ModalContainer = styled.div`
  width: 600px;
  max-width: 90%;

  background: #f5f5f5;
  border-radius: 20px;

  padding: 40px;
  text-align: center;

  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const Image = styled.img`
  width: 120px;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  margin-bottom: 10px;
`;

export const Description = styled.p`
  color: #666;
  margin-bottom: 25px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const PrimaryButton = styled.button`
  padding: 12px 20px;
  border-radius: 10px;
  border: none;
  background: #f26522;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

export const SecondaryButton = styled.button`
  padding: 12px 20px;
  border-radius: 10px;
  border: none;
  background: #eaeaea;
  cursor: pointer;
`;