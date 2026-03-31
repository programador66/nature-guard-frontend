import {
  Overlay,
  ModalContainer,
  Image,
  Title,
  Description,
  ButtonGroup,
  PrimaryButton,
  SecondaryButton,
} from "./styles";

import SuccessImage from "../../assets/success-01.svg"; // sua imagem

export default function SuccessModal({ open, onClose, onNew, onTrack }) {
  if (!open) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Image src={SuccessImage} />

        <Title>Sua denúncia foi enviada!</Title>

        <Description>
          Agradecemos por denunciar. Acompanhe o andamento ou registre uma nova denúncia
        </Description>

        <ButtonGroup>
          <SecondaryButton onClick={onNew}>
            Fazer nova denúncia
          </SecondaryButton>

          <PrimaryButton onClick={onTrack}>
            Acompanhar denúncias
          </PrimaryButton>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
}