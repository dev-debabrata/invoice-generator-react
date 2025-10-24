import React from "react";
import { Trash2, PlusCircle } from "lucide-react";
import EditableField from "./EditableField";

const InvoiceItem = ({ items, onItemizedItemEdit, currency, onRowDel, onRowAdd }) => {
  return (
    <div>
      <table className="w-full border-y border-gray-400 table-fixed">
        <thead>
          <tr className="text-left text-sm border-y border-gray-400">
            <th className="py-2 w-[65%]">ITEM</th>
            <th className="py-2 w-[8%]">QTY</th>
            <th className="py-2 w-[15%]">PRICE/RATE</th>
            <th className="py-2 w-[8%] text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              onItemizedItemEdit={onItemizedItemEdit}
              onDelEvent={onRowDel}
              currency={currency}
            />
          ))}
        </tbody>
      </table>

      <button
        onClick={onRowAdd}
        className="mt-4 flex text-base items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
      >
        <PlusCircle size={16} /> Add Item
      </button>
    </div>
  );
};

const ItemRow = ({ item, onItemizedItemEdit, onDelEvent, currency }) => (
  <tr className="border-b border-gray-400 align-top">
    <td className="px-2 py-2 w-[65%]">
      <EditableField
        cellData={{ type: "text", name: "name", placeholder: "Item name", value: item.name, id: item.id }}
        onItemizedItemEdit={onItemizedItemEdit}
      />
      <EditableField
        cellData={{ type: "text", name: "description", placeholder: "Item description", value: item.description, id: item.id }}
        onItemizedItemEdit={onItemizedItemEdit}
      />
    </td>
    <td className="px-2 py-2 w-[8%]">
      <EditableField
        cellData={{ type: "number", name: "quantity", value: item.quantity, id: item.id, min: 1 }}
        onItemizedItemEdit={onItemizedItemEdit}
      />
    </td>
    <td className="px-2 py-2 w-[15%] text-right">
      <EditableField
        cellData={{ type: "number", name: "price", value: item.price, id: item.id, min: 1, leading: currency, textAlign: "text-right" }}
        onItemizedItemEdit={onItemizedItemEdit}
      />
    </td>
    <td className="px-2 py-3 w-[8%] text-center">
      <button onClick={() => onDelEvent(item)} className="bg-red-600 hover:bg-red-700 p-2 rounded-lg text-white cursor-pointer">
        <Trash2 size={16} />
      </button>
    </td>
  </tr>
);

export default InvoiceItem;
