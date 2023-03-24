import { useMemo } from 'react';
import { useTable, Column } from 'react-table';

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

export const BidList: React.FC<BidListProps> = ({ data }) => {
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div>
      <p>Bid list</p>
      <table
        {...getTableProps()}
        style={{ border: 'solid 1px black', padding: '10px', borderRadius: '10px' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    border: 'solid 1px black',
                    color: 'black',
                  }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                      }}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
