import {
  Container,
  Header,
  Filters,
  SearchInput,
  Select,
  SearchButton,
  OrderSelect,
  Breadcrumb,
  Grid,
} from "./styles";

import ReportCard from "../../components/ReportCard";
import Logo from "../../components/LogoAmbiental";

export default function ReportListPage() {
  const data = Array(9).fill({
    title: "Floresta X - Belo Horizonte",
    user: "Caioba",
    tags: ["Queimada", "Alagamento"],
    description:
      "Tem uma queimada enorme pegando fogo no mato, e pra piorar, a chuva tá forte...",
  });

  return (
    <Container>
      {/* HEADER */}
      <Header>
        <Logo />
      </Header>

      {/* FILTROS */}
      <Filters>
        <SearchInput placeholder="Buscar denúncias por cidades ou usuário" />

        <Select>
          <option>Tipo de ocorrido</option>
        </Select>

        <SearchButton>Buscar</SearchButton>

        <OrderSelect>
          <option>Ordenar: Mais recente</option>
        </OrderSelect>
      </Filters>

      {/* BREADCRUMB */}
      <Breadcrumb>Início / Acompanhar denúncias</Breadcrumb>

      {/* GRID */}
      <Grid>
        {data.map((item, index) => (
          <ReportCard key={index} {...item} />
        ))}
      </Grid>
    </Container>
  );
}