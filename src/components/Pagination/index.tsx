import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import {
  PaginationWrapper,
  ArrowButton,
  PageButton,
  Ellipsis,
  PageInfo,
} from "./styles";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getVisiblePages(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i);
  }

  const pages: (number | "...")[] = [];

  pages.push(0);

  if (current > 3) {
    pages.push("...");
  }

  const start = Math.max(1, current - 1);
  const end = Math.min(total - 2, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 4) {
    pages.push("...");
  }

  pages.push(total - 1);

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages === 0) return null;

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <PaginationWrapper>
      <ArrowButton
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeftIcon />
        Anterior
      </ArrowButton>

      {pages.map((page, i) =>
        page === "..." ? (
          <Ellipsis key={`ellipsis-${i}`}>...</Ellipsis>
        ) : (
          <PageButton
            key={page}
            $active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page + 1}
          </PageButton>
        )
      )}

      <ArrowButton
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Próxima
        <ChevronRightIcon />
      </ArrowButton>

      <PageInfo>
        Página {currentPage + 1} de {totalPages}
      </PageInfo>
    </PaginationWrapper>
  );
}

