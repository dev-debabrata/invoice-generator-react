import React from "react";

const EditableField = ({ cellData, onItemizedItemEdit }) => (
  <div className="flex flex-nowrap items-center my-1 space-x-2 bg-gray-100 rounded">
    {cellData.leading && (
      <div className=" px-1">
        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-400 text-sm font-bold text-gray-600">
          {cellData.leading}
        </div>
      </div>
    )}
    <input
      type={cellData.type}
      id={cellData.id}
      name={cellData.name}
      value={cellData.value}
      placeholder={cellData.placeholder || ""}
      min={cellData.min}
      step={cellData.step}
      onChange={onItemizedItemEdit}
      className={`flex-1 p-2 border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-500 placeholder:text-sm ${cellData.textAlign || "text-left"}`}
      required
      style={{
        width: "auto",
        minWidth: "40px",
        maxWidth: "100%",
      }}
    />
  </div>
);

export default EditableField;
