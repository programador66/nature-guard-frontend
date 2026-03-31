import styled from "styled-components";

export const LoaderContainer = styled.div`
  position: fixed; /* 👈 sobrepõe tudo */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  background: rgba(0, 0, 0, 0.4); /* 👈 fundo transparente */

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 9999; /* 👈 fica acima de tudo */

  backdrop-filter: blur(4px); /* 👈 opcional (efeito premium) */
`;

export const Loading = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingImg = styled.img`
  width: 100px;
`;