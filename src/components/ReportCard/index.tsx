import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

import {
  Card,
  Title,
  User,
  Tags,
  Tag,
  Description,
  CardActions,
  Button,
  EditButton,
} from "./styles";

import type { Report } from "../../types/report";
import ReportDetailModal from "../ReportDetailModal";

interface ReportCardProps extends Report {
  onEdit?: () => void;
}

export default function ReportCard(props: ReportCardProps) {
  const { title, userName, tags, description, onEdit } = props;
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <Card>
        <Title>{title}</Title>
        {userName && <User>👤 {userName}</User>}

        <Tags>
          {tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </Tags>

        <Description>{description}</Description>

        <CardActions>
          <Button onClick={() => setShowDetail(true)}>Detalhes</Button>
          {onEdit && (
            <EditButton onClick={onEdit}>
              <EditIcon />
              Editar
            </EditButton>
          )}
        </CardActions>
      </Card>

      {showDetail && (
        <ReportDetailModal
          report={props}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  );
}
