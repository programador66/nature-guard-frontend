import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FloodIcon from "@mui/icons-material/Flood";
import LandscapeIcon from "@mui/icons-material/Landscape";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";

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
import { extractErrorMessage } from "../../service/api";
import type { Report } from "../../types/report";

type ReportType = "fire" | "flood" | "landslide" | "noise";

export default function EditReportPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const passedReport = (location.state as { report?: Report })?.report;

  const [isLoading, setIsLoading] = useState(!passedReport);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const [title, setTitle] = useState(passedReport?.title ?? "");
  const [description, setDescription] = useState(passedReport?.description ?? "");
  const [selected, setSelected] = useState<ReportType[]>(
    passedReport
      ? (passedReport.tags ?? []).map((t) => TAG_TO_TYPE[t] as ReportType).filter(Boolean)
      : []
  );
  const [address, setAddress] = useState(passedReport?.address ?? "");
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    passedReport?.lat && passedReport?.lng
      ? { lat: passedReport.lat, lng: passedReport.lng }
      : null
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setImageFiles((prev) => [...prev, ...files].slice(0, 3));
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (passedReport || !id) return;

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
        setApiError("");
      })
      .catch((err) => {
        setApiError(extractErrorMessage(err, "Erro ao carregar denúncia. Tente novamente."));
      })
      .finally(() => setIsLoading(false));
  }, [id, passedReport]);

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
    setApiError("");
    try {
      await updateReport(Number(id), {
          title,
          name: "",
          description,
          types: selected,
          address,
          lat: position?.lat ?? null,
          lng: position?.lng ?? null,
        }, imageFiles.length > 0 ? imageFiles : undefined);
      setShowSuccess(true);
    } catch (err) {
      setApiError(extractErrorMessage(err, "Erro ao salvar alterações. Tente novamente."));
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

          <Label>Substituir imagens (Opcional — até 3)</Label>
          <UploadBox>
            <p>⬆️</p>
            <strong>Escolha arquivos do computador</strong>
            <span>JPEG, PNG até 1MB cada</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              multiple
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <UploadButton
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={imageFiles.length >= 3}
            >
              {imageFiles.length >= 3 ? "Limite atingido" : "Escolher arquivo"}
            </UploadButton>
          </UploadBox>

          {imageFiles.map((file, i) => (
            <SelectedFile key={i}>
              <AttachFileIcon />
              {file.name}
              <CloseIcon
                style={{ marginLeft: "auto", cursor: "pointer", fontSize: 16 }}
                onClick={() => removeFile(i)}
              />
            </SelectedFile>
          ))}

          {apiError && (
            <div
              style={{
                background: "#FEE2E2",
                color: "#B91C1C",
                padding: "12px 16px",
                borderRadius: 8,
                marginTop: 8,
                fontSize: 14,
              }}
            >
              {apiError}
            </div>
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
