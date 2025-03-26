import React, { useContext } from 'react';
import { Pagination as Pagi } from 'react-bootstrap';
import { PaginationContext } from '../context/PaginationContext';

export const Pagination = ({ total }: { total: number }) => {
  const { page, setPage } = useContext(PaginationContext);
  let active = page;
  let totalPages = Math.ceil(total / 25);
  let prev = active - 1;
  let next = active + 1;
  let prevDisabled = prev < 1;
  let nextDisabled = next > totalPages;

  let items = [];
  for (let number = active - 2; number <= active + 2; number++) {
    if (number < 1) continue;
    if (number > totalPages) break;
    items.push(
      <Pagi.Item key={number} active={number === active} onClick={() => setPage(number)}>
        {number}
      </Pagi.Item>
    );
  }

  return (
    <Pagi>
      <Pagi.First disabled={prevDisabled} onClick={() => setPage(1)} />
      <Pagi.Prev disabled={prevDisabled} onClick={() => setPage(prev)} />
      {items}
      <Pagi.Next disabled={nextDisabled} onClick={() => setPage(next)} />
      <Pagi.Last disabled={nextDisabled} onClick={() => setPage(totalPages)} />
    </Pagi>
  );
};
