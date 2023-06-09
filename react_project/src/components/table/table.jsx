import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import tableData from "./table-data.json";
import styles from "./table.module.css";

function Table() {
  const columns = useMemo(
    () => [
      { Header: "ردیف", accessor: "id" },
      { Header: "نام و نام خانوادگی", accessor: "fullName" },
      { Header: "شماره پرسنلی", accessor: "employeeNumber" },
      { Header: "تاریخ استخدام", accessor: "employmentDate" },
      { Header: "سابقه خدمت", accessor: "serviceHistory" },
    ],
    []
  );

  const data = useMemo(() => tableData, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <div className="container">
        <div className={styles.tableWrapper}>
          <table {...getTableProps()} className={styles.table}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      key={column.id}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " ↓"
                            : " ↑"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr key={row.id} {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td key={cell.column.id} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
