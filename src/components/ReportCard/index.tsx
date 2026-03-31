import {
  Card,
  Title,
  User,
  Tags,
  Tag,
  Description,
  Button,
} from "./styles";

import type { Report } from "../../types/report";

export default function ReportCard({ title, user, tags, description }: Report) {
  return (
    <Card>
      <Title>{title}</Title>
      <User>{user}</User>

      <Tags>
        {tags.map((tag, i) => (
          <Tag key={i}>{tag}</Tag>
        ))}
      </Tags>

      <Description>{description}</Description>

      <Button>Detalhes</Button>
    </Card>
  );
}