import {useMemo, useState} from "react";
import DynamicTable from "../dynamic-table/dynamic-table.jsx";
import tableData from "./table-data.json";

function Table() {
  const columns = useMemo(
    () => [
      {Header: "ردیف", accessor: "code"},
      {Header: "نام و نام خانوادگی", accessor: "fullName"},
      {Header: "شماره پرسنلی", accessor: "employeeNumber"},
      {Header: "تاریخ استخدام", accessor: "employmentDate"},
      {Header: "سابقه خدمت", accessor: "serviceHistory"},
    ],
    []
  );

  const [code, setCode] = useState(null);
  const data = useMemo(() => tableData, []);

  const handleRowClick = async (row) => {
    setCode(row.code.toString());
  };

  return (
    <>
      <div className="container">
        <DynamicTable columns={columns} data={data} onRowClick={handleRowClick} selectedRow={code}/>
      </div>
    </>
  );
}

export default Table;
