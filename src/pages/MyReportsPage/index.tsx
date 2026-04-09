import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";

import {
  Container,
  FilterBar,
  SearchWrapper,
  SearchInput,
  FilterSelect,
  SearchButton,
  OrderSelect,
  Breadcrumb,
  Grid,
  EmptyState,
} from "../ReportListPage/styles";

import ReportCard from "../../components/ReportCard";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { getUserReports } from "../../service/reportService";
import type { RootState } from "../../store";
import type { Report } from "../../types/report";
import emptyIllustration from "../../assets/denuncia-mobile-02.svg";

export default function MyReportsPage() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    getUserReports(user.id)
      .then(({ data }) => setReports(data))
      .catch((err) => console.error("Erro ao buscar denúncias:", err))
      .finally(() => setIsLoading(false));
  }, [user?.id]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <Navbar />

      <Container>
        <FilterBar>
          <SearchWrapper>
            <SearchIcon />
            <SearchInput placeholder="Buscar por título ou descrição" />
          </SearchWrapper>

          <FilterSelect>
            <option value="">Tipo de ocorrido</option>
            <option value="QUEIMADA">Queimada</option>
            <option value="ALAGAMENTO">Alagamento</option>
            <option value="DESLIZAMENTO">Deslizamento</option>
            <option value="POLUICAO_SONORA">Poluição Sonora</option>
          </FilterSelect>

          <SearchButton>
            <SearchIcon />
            Buscar
          </SearchButton>

          <OrderSelect>
            <option value="recent">Mais recente</option>
            <option value="oldest">Mais antigo</option>
          </OrderSelect>
        </FilterBar>

        <Breadcrumb>
          Início / <span>Minhas denúncias</span>
        </Breadcrumb>

        {!isLoading && reports.length === 0 ? (
          <EmptyState>
            <img src={emptyIllustration} alt="Nenhuma denúncia" />
            <h3>Você ainda não fez nenhuma denúncia</h3>
            <p>
              Contribua com a proteção do meio ambiente. Registre sua primeira
              denúncia e acompanhe o andamento por aqui.
            </p>
            <SearchButton
              style={{ marginTop: 8 }}
              onClick={() => navigate("/create-report")}
            >
              Fazer primeira denúncia
            </SearchButton>
          </EmptyState>
        ) : (
          <Grid>
            {reports.map((item, index) => (
              <ReportCard
                key={index}
                {...item}
                onEdit={() => navigate(`/edit-report/${item.id}`)}
              />
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
