import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FloodIcon from "@mui/icons-material/Flood";
import LandscapeIcon from "@mui/icons-material/Landscape";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import AttachFileIcon from "@mui/icons-material/AttachFile";

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
  BackButton,
  ButtonContainer,
} from "../FormReport/styles";
import {
  LocationBox,
  UploadBox,
  UploadButton,
  MapWrapper,
  LocationInput,
  SelectedFile,
} from "../FormReportDetails/styles";

import ReportMobileIcon from "../../assets/denuncia-mobile-02.svg";
import MapPicker from "../../components/LocationInput";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import SuccessModal from "../../components/ModalSuccess";
import { getReport, updateReport, TAG_TO_TYPE } from "../../service/reportService";
import type { Report } from "../../types/report";

type ReportType = "fire" | "flood" | "landslide" | "noise";

export default function EditReportPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState<ReportType[]>([]);
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!id) return;

    getReport(Number(id))
      .then(({ data }: { data: Report }) => {
        setTitle(data.title ?? "");
        setDescription(data.description ?? "");
        setSelected(
          (data.tags ?? []).map((t) => TAG_TO_TYPE[t] as ReportType).filter(Boolean)
        );
        setAddress(data.address ?? "");
        if (data.lat && data.lng) {
          setPosition({ lat: data.lat, lng: data.lng });
        }
      })
      .catch((err) => console.error("Erro ao carregar denúncia:", err))
      .finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => {
    if (!position) return;
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`
    )
      .then((res) => res.json())
      .then((data) => setAddress(data.display_name));
  }, [position]);

  const searchAddress = async (query: string) => {
    if (!query) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
    const data = await res.json();
    if (data.length > 0) {
      setPosition({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
    }
  };

  const toggleSelect = (type: ReportType) =>
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const handleSave = async () => {
    if (!id) return;
    setIsSaving(true);
    try {
      await Promise.all([
        updateReport(Number(id), {
          title,
          name: "",
          description,
          types: selected,
          address,
          lat: position?.lat ?? null,
          lng: position?.lng ?? null,
        }, imageFile ?? undefined),
        new Promise((resolve) => setTimeout(resolve, 3000)), // TODO: remover em prod
      ]);
      setShowSuccess(true);
    } catch (err) {
      console.error("Erro ao atualizar denúncia:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Loader isLoading={isLoading || isSaving} />
      <Navbar />

      <Container>
        <Left>
          <img src={ReportMobileIcon} alt="Editar denúncia" />
        </Left>

        <Right>
          <Title>Editar denúncia</Title>
          <Subtitle>Atualize as informações da sua denúncia</Subtitle>

          <Label>Título da denúncia</Label>
          <Input
            placeholder="Ex: Queimada na Floresta X"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Label>Descrição do ocorrido</Label>
          <TextArea
            placeholder="Descreva o ocorrido..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Label>Tipo de ocorrido</Label>
          <Grid>
            <Card active={selected.includes("fire")} onClick={() => toggleSelect("fire")}>
              <LocalFireDepartmentIcon />
              Queimadas
            </Card>
            <Card active={selected.includes("flood")} onClick={() => toggleSelect("flood")}>
              <FloodIcon />
              Alagamento
            </Card>
            <Card active={selected.includes("landslide")} onClick={() => toggleSelect("landslide")}>
              <LandscapeIcon />
              Deslizamento
            </Card>
            <Card active={selected.includes("noise")} onClick={() => toggleSelect("noise")}>
              <VolumeUpIcon />
              Poluição Sonora
            </Card>
          </Grid>

          <Label>Local do ocorrido</Label>
          <LocationBox>
            <LocationInput
              value={address}
              placeholder="Clique no mapa ou digite o endereço"
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchAddress(address);
              }}
            />
            <MapWrapper>
              <MapPicker position={position} setPosition={setPosition} />
            </MapWrapper>
          </LocationBox>

          <Label>Substituir imagem (Opcional)</Label>
          <UploadBox>
            <p>⬆️</p>
            <strong>Escolha um arquivo do computador</strong>
            <span>JPEG, PNG até 1MB</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              style={{ display: "none" }}
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />
            <UploadButton type="button" onClick={() => fileInputRef.current?.click()}>
              Escolher arquivo
            </UploadButton>
          </UploadBox>

          {imageFile && (
            <SelectedFile>
              <AttachFileIcon />
              {imageFile.name}
            </SelectedFile>
          )}

          <ButtonContainer>
            <BackButton onClick={() => navigate(-1)}>Cancelar</BackButton>
            <Button onClick={handleSave} disabled={isSaving}>
              Salvar alterações
            </Button>
          </ButtonContainer>
        </Right>
      </Container>

      <SuccessModal
        open={showSuccess}
        onClose={() => { setShowSuccess(false); navigate("/my-reports"); }}
        onNew={() => { setShowSuccess(false); navigate("/create-report"); }}
        onTrack={() => { setShowSuccess(false); navigate("/my-reports"); }}
      />
    </>
  );
}
