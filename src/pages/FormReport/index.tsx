import { useState } from "react";
import {
  Container,
  Left,
  Right,
  Title,
  Subtitle,
  Input,
  TextArea,
  Label,
  Grid,
  Card,
  Button,
  Step,
  HeaderTop,
  BackButton,
  ButtonContainer
} from "./styles";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FloodIcon from "@mui/icons-material/Flood";
import LandscapeIcon from "@mui/icons-material/Landscape";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import ReportMobileIcon from "../../assets/denuncia-mobile-02.svg";
import { useNavigate } from "react-router-dom";

type ReportType = "fire" | "flood" | "landslide" | "noise";

export default function FormReport() {
  const [selected, setSelected] = useState<ReportType[]>([]);
  const navigate = useNavigate();

  const toggleSelect = (type: ReportType) => {
    if (selected.includes(type)) {
      setSelected(selected.filter((item) => item !== type));
    } else {
      setSelected([...selected, type]);
    }
  };

  return (
    <Container>
      <Left>
        <img src={ReportMobileIcon} alt="Report" />
      </Left>

      <Right>
          <HeaderTop>
            <Step>Etapa 1 de 2</Step>
        </HeaderTop>

        <Title>Descreva sua denúncia</Title>
        <Subtitle>
          Informe seu nome e descreva em poucas palavras o ocorrido que originou a denúncia
        </Subtitle>

        <Label>Nome completo</Label>
        <Input placeholder='Digite seu nome' />

        <Label>Descrição do ocorrido</Label>
        <TextArea placeholder='Descreva o ocorrido...' />

        <Label>Tipo de ocorrido</Label>

        <Grid>
          <Card active={selected.includes('fire')} onClick={() => toggleSelect('fire')}>
            <LocalFireDepartmentIcon />
            Queimadas
          </Card>

          <Card active={selected.includes('flood')} onClick={() => toggleSelect('flood')}>
            <FloodIcon />
            Alagamento
          </Card>

          <Card active={selected.includes('landslide')} onClick={() => toggleSelect('landslide')}>
            <LandscapeIcon />
            Deslizamento
          </Card>

          <Card active={selected.includes('noise')} onClick={() => toggleSelect('noise')}>
            <VolumeUpIcon />
            Poluição Sonora
          </Card>
        </Grid>

        <ButtonContainer>
            <BackButton onClick={() => navigate(-1)}>
                Cancelar
            </BackButton>
            <Button onClick={() => navigate('/create-report-details')}>Continuar</Button>
        </ButtonContainer>
      </Right>
    </Container>
  );
}