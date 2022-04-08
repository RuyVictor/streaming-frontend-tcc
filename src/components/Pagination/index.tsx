import { ReactElement, useCallback } from "react";

import ReactPaginate from "react-paginate";
import { FiChevronLeft } from "react-icons/fi";

import * as S from "./styles";

interface PaginationProps {
  pageRangeDisplayed: number;
  // eslint-disable-next-line react/require-default-props
  pageCount?: number;
  setPageOptions: (options: { page?: number; perpage?: number }) => void;
}

export interface HandlerPageChange {
  ({ selected }: { selected: number }): void;
}

function Pagination({
  setPageOptions,
  pageCount = 0,
  pageRangeDisplayed,
  ...props
}: PaginationProps): ReactElement {
  const handlePage: HandlerPageChange = useCallback(
    ({ selected }) => {
      setPageOptions({
        page: selected + 1,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setPageOptions]
  );

  const nextClassName = pageCount === 0 ? "disabled" : "item control";

  return (
    <>
      {pageCount > 1 && (
        <S.Container>
          <ReactPaginate
            containerClassName="container"
            previousLabel={<FiChevronLeft />}
            nextLabel="Próximo"
            {...{ nextClassName, pageCount, pageRangeDisplayed }}
            pageClassName="item"
            activeClassName="active"
            previousClassName="item"
            nextClassName="item"
            breakClassName="item"
            disabledClassName="disabled"
            onPageChange={handlePage}
            {...props}
            marginPagesDisplayed={2}
          />
        </S.Container>
      )}
    </>
  );
}

export default Pagination;
