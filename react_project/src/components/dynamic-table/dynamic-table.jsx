import {useTable, useSortBy} from "react-table";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./dynamic-table.module.css";

function DynamicTable({columns, data, onRowClick, selectedRow}) {
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable({columns, data}, useSortBy);

  DynamicTable.propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        Header: PropTypes.string,
        accessor: PropTypes.string,
      })
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRowClick: PropTypes.func.isRequired,
    selectedRow: PropTypes.string,
  };

  return (
    <div dir="rtl" className={styles.tableWrapper}>
      <table role="table" {...getTableProps()} className={styles.table}>
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
                    {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
                  </span>
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const isRowSelected = row.original.code === selectedRow;
          const rowClasses = cx({
            [styles.selectedRow]: isRowSelected,
          });
          return (
            <tr
              key={row.id}
              {...row.getRowProps()}
              onClick={() => onRowClick(row.original)}
              className={rowClasses}
            >
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
  );
}

export default DynamicTable;
