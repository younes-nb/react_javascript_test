import { useMemo } from "react";
import DynamicTable from "./dynamic-table";
import tableData from "./table-data.json";

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

  return (
    <>
      <div className="container">
        <DynamicTable columns={columns} data={data} />
      </div>
    </>
  );
}

export default Table;
