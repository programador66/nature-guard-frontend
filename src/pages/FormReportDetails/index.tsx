import { useRef, useState, useEffect } from "react";
import * as yup from "yup";
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
  MapWrapper,
  LocationInput,
  SelectedFile,
  ErrorText,
} from "./styles";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import ReportMobileIcon from "../../assets/denuncia-mobile-02.svg";
import { useNavigate } from "react-router-dom";
import MapPicker from "../../components/LocationInput";
import SuccessModal from "../../components/ModalSuccess";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { saveStep2, clearDraft } from "../../store/slices/reportSlice";
import { createReport } from "../../service/reportService";

const step2Schema = yup.object({
  address: yup.string().trim().required("Endereço é obrigatório"),
  lat: yup
    .number()
    .nullable()
    .required("Selecione um local no mapa ou pesquise um endereço"),
  lng: yup
    .number()
    .nullable()
    .required("Selecione um local no mapa ou pesquise um endereço"),
});

export default function FormRepostDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const draft = useSelector((state: RootState) => state.report.draft);

  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [address, setAddress] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      setPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setImageFiles((prev) => {
      const combined = [...prev, ...files];
      return combined.slice(0, 3);
    });
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const step2 = {
      address,
      lat: position?.lat ?? null,
      lng: position?.lng ?? null,
    };

    try {
      await step2Schema.validate(step2, { abortEarly: false });
      setErrors({});
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
      return;
    }

    dispatch(saveStep2(step2));

    if (!isAuthenticated) {
      navigate("/register");
      return;
    }

    if (!draft) return;

    setIsLoading(true);
    try {
      await Promise.all([
        createReport({ ...draft, ...step2 }, imageFiles.length > 0 ? imageFiles : undefined),
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ]);
      dispatch(clearDraft());
      setOpenModal(true);
    } catch (err) {
      console.error("Erro ao enviar denúncia:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />

      <Container>
        <Left>
          <img src={ReportMobileIcon} alt="Report" />
        </Left>

        <Right>
          <Step>Etapa 2 de 2</Step>

          <Title>Insira o local do ocorrido</Title>

          <Subtitle>
            Insira o local do ocorrido e se puder, envie fotos para ajudar a
            identificar sua denúncia
          </Subtitle>

          {/* LOCAL */}
          <Label>Informe o local do ocorrido</Label>

          <LocationBox>
            <LocationInput
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
          {(errors.address || errors.lat) && (
            <ErrorText>
              {errors.address || errors.lat}
            </ErrorText>
          )}

          {/* UPLOAD */}
          <Label>Insira fotos para ajudar a denúncia (Opcional — até 3)</Label>

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

          <ButtonContainer>
            <BackButton onClick={() => navigate(-1)}>Voltar</BackButton>
            <Button onClick={handleSubmit} disabled={isLoading}>
              Enviar denúncia
            </Button>
          </ButtonContainer>
        </Right>
      </Container>

      <SuccessModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          navigate("/reports-list-page");
        }}
        onNew={() => {
          setOpenModal(false);
          navigate("/create-report");
        }}
        onTrack={() => {
          setOpenModal(false);
          navigate("/reports-list-page");
        }}
      />
    </>
  );
}
