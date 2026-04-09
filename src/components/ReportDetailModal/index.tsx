import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ImageIcon from "@mui/icons-material/Image";
import MapIcon from "@mui/icons-material/Map";
import PhotoIcon from "@mui/icons-material/Photo";

import type { Report } from "../../types/report";

import {
  Overlay,
  ModalContainer,
  ImageSection,
  CarouselImage,
  NoImage,
  ImageBadge,
  CloseButton,
  CarouselArrow,
  Dots,
  Dot,
  Content,
  ReportTitle,
  Meta,
  Tags,
  Tag,
  DescriptionText,
  AddressSection,
  AddressInfo,
  MapsButton,
} from "./styles";

const API_BASE = "http://localhost:3333";

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const date = d.toLocaleDateString("pt-BR");
  const time = d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date} - ${time}`;
}

interface Props {
  report: Report;
  onClose: () => void;
}

export default function ReportDetailModal({ report, onClose }: Props) {
  const images = report.images ?? [];
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

  const mapsUrl =
    report.lat && report.lng
      ? `https://maps.google.com/?q=${report.lat},${report.lng}`
      : null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* IMAGE */}
        <ImageSection>
          {images.length > 0 ? (
            <>
              <CarouselImage
                src={`${API_BASE}${images[current]}`}
                alt={`Imagem ${current + 1}`}
              />

{images.length > 1 && (
                <>
                  <CarouselArrow direction="left" onClick={prev}>
                    <ChevronLeftIcon />
                  </CarouselArrow>
                  <CarouselArrow direction="right" onClick={next}>
                    <ChevronRightIcon />
                  </CarouselArrow>
                  <Dots>
                    {images.map((_, i) => (
                      <Dot key={i} active={i === current} />
                    ))}
                  </Dots>
                </>
              )}
            </>
          ) : (
            <NoImage>
              <ImageIcon />
              Sem imagem
            </NoImage>
          )}

          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </ImageSection>

        {/* CONTENT */}
        <Content>
          <ReportTitle>{report.title}</ReportTitle>
          <Meta>
            {report.userName}
            {report.createdAt && ` • ${formatDate(report.createdAt)}`}
          </Meta>

          <Tags>
            {report.tags.map((tag, i) => (
              <Tag key={i}>{tag}</Tag>
            ))}
          </Tags>

          <DescriptionText>{report.description}</DescriptionText>

          {report.address && (
            <AddressSection>
              <AddressInfo>
                <span>Endereço aproximado</span>
                <span>{report.address}</span>
              </AddressInfo>

              {mapsUrl && (
                <MapsButton href={mapsUrl} target="_blank" rel="noreferrer">
                  <MapIcon />
                  Abrir no Google Maps
                </MapsButton>
              )}
            </AddressSection>
          )}
        </Content>
      </ModalContainer>
    </Overlay>
  );
}
