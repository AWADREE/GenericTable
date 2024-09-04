import { ColumnType, Types } from "./GenericTableType";
import { ReactNode, useState } from "react";

import { Modal } from "@mui/material";

type GenericTableProps<T extends Record<PropertyKey, any>> = {
  data: T[];
  types: Types;
  specialFields?: {
    specialFieldName: PropertyKey;
    rendering: (row: { [key: PropertyKey]: any }) => ReactNode;
  }[];
};

const GenericTable = <T extends Record<PropertyKey, any>>({
  data,
  types,
  specialFields,
}: GenericTableProps<T>) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const allSpecialFieldNames = specialFields?.map((field) => {
    return field.specialFieldName;
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRowClick = (row: T) => {
    // TODO fetchRowData(row);
    // console.log(row)
    handleOpen();
  };

  return (
    <>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => handleRowClick(row)}
                style={{ cursor: "pointer" }}
              >
                {headers.map((header) => {
                  const cellValue = row[header];
                  const columnType = types[header] || ColumnType.Text;

                  let cellContent;

                  const specialObject = specialFields?.find((item) => {
                    return item.specialFieldName === header;
                  });

                  if (allSpecialFieldNames?.includes(header)) {
                    return specialObject?.rendering(row);
                  }

                  switch (columnType) {
                    case ColumnType.Number:
                      cellContent = cellValue.toLocaleString();
                      break;
                    case ColumnType.Date:
                      cellContent = new Date(cellValue).toLocaleDateString();
                      break;
                    case ColumnType.JSX:
                      cellContent = cellValue;
                      break;
                    default:
                      cellContent = cellValue.toString();
                      break;
                  }

                  return (
                    <td style={{ padding: "3%" }} key={header}>
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            backgroundColor: "white",
            borderRadius: 5,
            padding: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex" }}>
            <h2 style={{ color: "black" }}>Modal Title</h2>
            <button
              style={{ position: "absolute", top: 10, right: 10 }}
              onClick={handleClose}
            >
              X
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GenericTable;
