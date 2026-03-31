import {
  Container,
  Left,
  Right,
  Title,
  Subtitle,
  Label,
  LocationBox,
  UploadBox,
  UploadButton,
  Button,
  Step,
  ButtonContainer,
  BackButton,
  MapWrapper
} from "./styles";

import ReportMobileIcon from "../../assets/denuncia-mobile-02.svg";
import { useNavigate } from "react-router-dom";
import MapPicker from "../../components/LocationInput";
import { useState } from "react";
import { useEffect } from "react";
import SuccessModal from "../../components/ModalSuccess";

export default function FormRepostDetails() {
    const navigate = useNavigate();
    const [position, setPosition] = useState(null);
    const [address, setAddress] = useState("");
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (!position) return;

        fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`
        )
            .then((res) => res.json())
            .then((data) => {
            setAddress(data.display_name);
            });
        }, [position]);


    const searchAddress = async (query: string) => {
        if (!query) return;

        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
        );

        const data = await res.json();

        if (data.length > 0) {
            const { lat, lon } = data[0];

            setPosition({
            lat: parseFloat(lat),
            lng: parseFloat(lon),
            });
        }
    };    

  return (
    <>
    <Container>
      <Left>
        <img src={ReportMobileIcon} alt="Report" />
      </Left>

      <Right>
        <Step>Etapa 2 de 2</Step>

        <Title>Insira o local do ocorrido</Title>

        <Subtitle>
          Insira o local do ocorrido e se puder, envie fotos para ajudar a identificar sua denúncia
        </Subtitle>

        {/* LOCAL */}
        <Label>Informe o local do ocorrido</Label>

        <LocationBox>
             <input
                value={address}
                placeholder="Clique no mapa ou digite o endereço"
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            searchAddress(address);
                        }
                }}
            />
            <MapWrapper>
                <MapPicker position={position} setPosition={setPosition} />
            </MapWrapper>

        </LocationBox>

        {/* UPLOAD */}
        <Label>Insira uma foto para ajudar a denúncia (Opcional)</Label>

        <UploadBox>
          <p>⬆️</p>
          <strong>Escolha um arquivo do computador</strong>
          <span>JPEG, PNG até 1MB</span>

          <UploadButton>Escolher arquivo</UploadButton>
        </UploadBox>

        <ButtonContainer>
                    <BackButton onClick={() => navigate(-1)}>
                        Voltar
                    </BackButton>
                    <Button onClick={() => setOpenModal(true)} >Enviar denúncia</Button>
        </ButtonContainer>
      </Right>
    </Container>
    
      <SuccessModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onNew={() => {
          setOpenModal(false);
          // reset form ou navigate
        }}
        onTrack={() => {
          // navigate("/tracking")
        }}
      />
    </>
  );
}