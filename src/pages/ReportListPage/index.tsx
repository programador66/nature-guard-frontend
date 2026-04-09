import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import {
  Container,
  FilterBar,
  SearchWrapper,
  SearchInput,
  FilterSelect,
  DateInput,
  SearchButton,
  Breadcrumb,
  Grid,
  EmptyState,
} from "./styles";

import ReportCard from "../../components/ReportCard";
import Pagination from "../../components/Pagination";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { getReports } from "../../service/reportService";
import type { Report, Page } from "../../types/report";
import emptyIllustration from "../../assets/denuncia-mobile-02.svg";

const PAGE_SIZE = 9;

export default function ReportListPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // filter state
  const [searchText, setSearchText] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // applied filters (only sent to API after clicking "Buscar")
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedTag, setAppliedTag] = useState("");
  const [appliedStart, setAppliedStart] = useState("");
  const [appliedEnd, setAppliedEnd] = useState("");

  useEffect(() => {
    let cancelled = false;

    const tags = appliedTag ? [appliedTag] : undefined;
    const startISO = appliedStart ? `${appliedStart}T00:00:00` : undefined;
    const endISO = appliedEnd ? `${appliedEnd}T23:59:59` : undefined;

    getReports({
      page: currentPage,
      size: PAGE_SIZE,
      search: appliedSearch || undefined,
      tags,
      startDate: startISO,
      endDate: endISO,
    })
      .then(({ data }: { data: Page<Report> }) => {
        if (cancelled) return;
        setReports(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        if (!cancelled) console.error("Erro ao buscar denúncias:", err);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [currentPage, appliedSearch, appliedTag, appliedStart, appliedEnd]);

  const handleSearch = () => {
    setAppliedSearch(searchText);
    setAppliedTag(selectedTag);
    setAppliedStart(startDate);
    setAppliedEnd(endDate);
    setCurrentPage(0);
    setIsLoading(true);
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <Navbar />

      <Container>
        <FilterBar>
          <SearchWrapper>
            <SearchIcon />
            <SearchInput
              placeholder="Buscar por usuário ou descrição"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
            />
          </SearchWrapper>

          <FilterSelect
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="">Tipo de ocorrido</option>
            <option value="QUEIMADA">Queimada</option>
            <option value="ALAGAMENTO">Alagamento</option>
            <option value="DESLIZAMENTO">Deslizamento</option>
            <option value="POLUICAO_SONORA">Poluição Sonora</option>
          </FilterSelect>

          <DateInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            title="Data início"
          />

          <DateInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            title="Data fim"
          />

          <SearchButton onClick={handleSearch}>
            <SearchIcon />
            Buscar
          </SearchButton>
        </FilterBar>

        <Breadcrumb>
          Início / <span>Acompanhar denúncias</span>
        </Breadcrumb>

        {!isLoading && reports.length === 0 ? (
          <EmptyState>
            <img src={emptyIllustration} alt="Nenhuma denúncia" />
            <h3>Nenhuma denúncia encontrada</h3>
            <p>
              Ainda não há denúncias registradas. Seja o primeiro a contribuir
              para a proteção do meio ambiente!
            </p>
          </EmptyState>
        ) : (
          <>
            <Grid>
              {reports.map((item, index) => (
                <ReportCard key={index} {...item} />
              ))}
            </Grid>

            {!isLoading && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
}
