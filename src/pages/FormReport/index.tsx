import { useState } from "react";
import * as yup from "yup";
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
  ButtonContainer,
  ErrorText,
} from "./styles";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FloodIcon from "@mui/icons-material/Flood";
import LandscapeIcon from "@mui/icons-material/Landscape";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import ReportMobileIcon from "../../assets/denuncia-mobile-02.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { saveStep1 } from "../../store/slices/reportSlice";

type ReportType = "fire" | "flood" | "landslide" | "noise";

const step1Schema = yup.object({
  title: yup.string().trim().required("Título é obrigatório"),
  name: yup.string().trim().required("Nome completo é obrigatório"),
  description: yup
    .string()
    .trim()
    .required("Descrição é obrigatória")
    .min(10, "Descrição deve ter pelo menos 10 caracteres"),
  types: yup
    .array()
    .of(yup.string().required())
    .min(1, "Selecione pelo menos um tipo de ocorrido"),
});

export default function FormReport() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const draft = useSelector((state: RootState) => state.report.draft);

  const [title, setTitle] = useState(draft?.title ?? "");
  const [name, setName] = useState(draft?.name ?? "");
  const displayName = user?.name ?? name;
  const [description, setDescription] = useState(draft?.description ?? "");
  const [selected, setSelected] = useState<ReportType[]>(
    (draft?.types as ReportType[]) ?? []
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleSelect = (type: ReportType) => {
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleContinue = async () => {
    try {
      await step1Schema.validate(
        { title, name: displayName, description, types: selected },
        { abortEarly: false }
      );
      setErrors({});
      dispatch(saveStep1({ title, name: displayName, description, types: selected }));
      navigate("/create-report-details");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path && !fieldErrors[e.path]) {
            fieldErrors[e.path] = e.message;
          }
        });
        setErrors(fieldErrors);
      }
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
          Informe seu nome e descreva em poucas palavras o ocorrido que originou
          a denúncia
        </Subtitle>

        <Label>Título da denúncia</Label>
        <Input
          placeholder="Ex: Queimada na Floresta X"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <ErrorText>{errors.title}</ErrorText>}

        <Label>Nome completo</Label>
        <Input
          placeholder="Digite seu nome"
          value={displayName}
          onChange={(e) => setName(e.target.value)}
          readOnly={!!user}
          style={user ? { opacity: 0.7, cursor: "not-allowed" } : undefined}
        />
        {errors.name && <ErrorText>{errors.name}</ErrorText>}

        <Label>Descrição do ocorrido</Label>
        <TextArea
          placeholder="Descreva o ocorrido..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <ErrorText>{errors.description}</ErrorText>}

        <Label>Tipo de ocorrido</Label>

        <Grid>
          <Card
            active={selected.includes("fire")}
            onClick={() => toggleSelect("fire")}
          >
            <LocalFireDepartmentIcon />
            Queimadas
          </Card>

          <Card
            active={selected.includes("flood")}
            onClick={() => toggleSelect("flood")}
          >
            <FloodIcon />
            Alagamento
          </Card>

          <Card
            active={selected.includes("landslide")}
            onClick={() => toggleSelect("landslide")}
          >
            <LandscapeIcon />
            Deslizamento
          </Card>

          <Card
            active={selected.includes("noise")}
            onClick={() => toggleSelect("noise")}
          >
            <VolumeUpIcon />
            Poluição Sonora
          </Card>
        </Grid>
        {errors.types && <ErrorText>{errors.types}</ErrorText>}

        <ButtonContainer>
          <BackButton onClick={() => navigate(-1)}>Cancelar</BackButton>
          <Button onClick={handleContinue}>Continuar</Button>
        </ButtonContainer>
      </Right>
    </Container>
  );
}
