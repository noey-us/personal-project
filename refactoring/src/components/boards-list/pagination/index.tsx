"use client";

import React, { useMemo } from "react";
import { usePagination } from "./hook";
import { IPaginationProps } from "./types";
import style from "./styles.module.css";

export default function PaginationPage(props: IPaginationProps) {
  const { startPage, onClickPage, onClickPrevPage, onClickNextPage } =
    usePagination(props);

  const pageButtons = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) =>
      index + startPage <= props.lastPage ? (
        <button
          key={index + startPage}
          id={String(index + startPage)}
          onClick={onClickPage}
          className={style.indexButton}
        >
          {index + startPage}
        </button>
      ) : null
    );
  }, [startPage, props.lastPage, onClickPage]);

  return (
    <div className={style.paginationLayout}>
      {/* 첫 페이지 그룹에서는 이전 버튼 비활성화 */}
      <button
        onClick={onClickPrevPage}
        className={style.prevButton}
        disabled={startPage === 1}
      >{`<`}</button>
      {pageButtons}
      {/* 마지막 페이지 그룹에서 다음 버튼 비활성화 */}
      <button
        onClick={onClickNextPage}
        className={style.nextButton}
        disabled={startPage + 4 >= props.lastPage}
      >{`>`}</button>
    </div>
  );
}
