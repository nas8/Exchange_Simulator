import { useMemo } from 'react';
import { useTable, Column, usePagination, useSortBy } from 'react-table';
import { Styles } from './BidList.styled';

interface Bid {
  id: number | string;
  creation_time: string;
  change_time: string;
  status: string;
  side: string;
  price: number | string;
  amount: number;
  instrument: string;
}

interface BidListProps {
  data: Bid[];
}

export const BidList: React.FC<BidListProps> = ({ data = [] }) => {
  const columns = useMemo<Column<Bid>[]>(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Creation time',
        accessor: 'creation_time',
      },
      {
        Header: 'Change time',
        accessor: 'change_time',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Side',
        accessor: 'side',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Instrument',
        accessor: 'instrument',
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination,
  );

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' ⬇' : ' ⬆') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: any, i: number) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  if (cell.value === 'Buy') {
                    return (
                      <td style={{ color: 'green' }} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  }
                  if (cell.value === 'Sell') {
                    return (
                      <td style={{ color: 'red' }} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  }
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </Styles>
  );
};
