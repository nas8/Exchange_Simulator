import { useMemo } from 'react';
import { useTable, Column } from 'react-table';

interface Data {
  id: number | string;
  creation_time: string;
  change_time: string;
  status: string;
  side: string;
  price: number | string;
  amount: number;
  instrument: string;
}

export const BidList = () => {
  const data = useMemo(
    () => [
      {
        id: 1,
        creation_time: '12.12.2000',
        change_time: '12.12.2000',
        status: 'Active',
        side: 'Buy',
        price: 8,
        amount: 500000,
        instrument: 'CNH/RUB',
      },
      {
        id: 2,
        creation_time: '12.12.2000',
        change_time: '12.12.2000',
        status: 'Active',
        side: 'Buy',
        price: 8,
        amount: 500000,
        instrument: 'CNH/RUB',
      },
      {
        id: 3,
        creation_time: '12.12.2000',
        change_time: '12.12.2000',
        status: 'Active',
        side: 'Buy',
        price: 8,
        amount: 500000,
        instrument: 'CNH/RUB',
      },
      {
        id: 4,
        creation_time: '12.12.2000',
        change_time: '12.12.2000',
        status: 'Active',
        side: 'Buy',
        price: 8,
        amount: 500000,
        instrument: 'CNH/RUB',
      },
      {
        id: 5,
        creation_time: '12.12.2000',
        change_time: '12.12.2000',
        status: 'Active',
        side: 'Buy',
        price: 8,
        amount: 500000,
        instrument: 'CNH/RUB',
      },
    ],
    [],
  );

  const columns = useMemo<Column<Data>[]>(
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
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
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
                      background: 'papayawhip',
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
  );
};
