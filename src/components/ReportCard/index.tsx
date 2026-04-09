import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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

import type { RootState } from "../../store";
import type { Report } from "../../types/report";
import ReportDetailModal from "../ReportDetailModal";

export default function ReportCard(props: Report) {
  const { title, userName, tags, description, id } = props;
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
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
          {isAuthenticated && id && (
            <EditButton onClick={() => navigate(`/edit-report/${id}`)}>
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
