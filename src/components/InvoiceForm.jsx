import React, { useState, useEffect, useCallback } from "react";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("₹");
  const [currentDate] = useState(new Date().toLocaleDateString());
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [billTo, setBillTo] = useState("");
  const [billToEmail, setBillToEmail] = useState("");
  const [billToAddress, setBillToAddress] = useState("");
  const [billFrom, setBillFrom] = useState("");
  const [billFromEmail, setBillFromEmail] = useState("");
  const [billFromAddress, setBillFromAddress] = useState("");
  const [notes, setNotes] = useState(
    "Thank you for doing business with us. Have a great day!"
  );
  const [total, setTotal] = useState("0.00");
  const [subTotal, setSubTotal] = useState("0.00");
  const [taxRate, setTaxRate] = useState("");
  const [taxAmount, setTaxAmount] = useState("0.00");
  const [discountRate, setDiscountRate] = useState("");
  const [discountAmount, setDiscountAmount] = useState("0.00");

  const [items, setItems] = useState([
    {
      id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
      name: "",
      description: "",
      price: "1.00",
      quantity: 1,
    },
  ]);

  const handleCalculateTotal = useCallback(() => {
    let newSubTotal = items
      .reduce((acc, item) => acc + parseFloat(item.price) * parseInt(item.quantity), 0)
      .toFixed(2);

    let newtaxAmount = (newSubTotal * (taxRate / 100)).toFixed(2);
    let newdiscountAmount = (newSubTotal * (discountRate / 100)).toFixed(2);
    let newTotal = (newSubTotal - newdiscountAmount + parseFloat(newtaxAmount)).toFixed(2);

    setSubTotal(newSubTotal);
    setTaxAmount(newtaxAmount);
    setDiscountAmount(newdiscountAmount);
    setTotal(newTotal);
  }, [items, taxRate, discountRate]);

  useEffect(() => {
    handleCalculateTotal();
  }, [handleCalculateTotal]);

  const handleRowDel = (item) => {
    setItems(items.filter((i) => i.id !== item.id));
  };

  const handleAddEvent = () => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    setItems([...items, { id, name: "", description: "", price: "1.00", quantity: 1 }]);
  };

  const onItemizedItemEdit = (evt) => {
    const { id, name, value } = evt.target;
    setItems(items.map((item) => (item.id === id ? { ...item, [name]: value } : item)));
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    handleCalculateTotal();
  };

  const openModal = (e) => {
    e.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <form onSubmit={openModal} className="space-y-6 my-6">
      <div className=" grid grid-cols-4 gap-6 text-sm">
        {/* Left Section */}
        <div className=" col-span-3 bg-white text-black p-10 rounded-lg shadow-md space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 mb-10">
            <div className="space-y-2">
              <div>
                <span className="font-bold">Current Date: </span>
                <span>{currentDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">Due Date:</span>
                <input
                  type="date"
                  value={dateOfIssue}
                  onChange={handleChange(setDateOfIssue)}
                  className="border-none bg-gray-100 rounded px-2 py-1 max-w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold">Invoice Number:</span>
              <input
                type="number"
                value={invoiceNumber}
                onChange={handleChange(setInvoiceNumber)}
                min="1"
                className="border-none bg-gray-100 rounded px-2 py-1 max-w-20 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
          </div>

          <hr className=" text-gray-400" />

          {/* Bill From / Bill To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="space-y-2">
              <label className="font-bold block">Bill from:</label>
              <input
                type="text"
                placeholder="Who is this invoice from?"
                value={billFrom}
                onChange={handleChange(setBillFrom)}
                className="border-none bg-gray-100 placeholder:text-sm placeholder:text-gray-400 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <input
                type="email"
                placeholder="Email address"
                value={billFromEmail}
                onChange={handleChange(setBillFromEmail)}
                className="border-none bg-gray-100 rounded w-full p-2 placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <input
                type="text"
                placeholder="Billing address"
                value={billFromAddress}
                onChange={handleChange(setBillFromAddress)}
                className="border-none bg-gray-100 rounded w-full p-2 placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="font-bold block">Bill to:</label>
              <input
                type="text"
                placeholder="Who is this invoice to?"
                value={billTo}
                onChange={handleChange(setBillTo)}
                className="border-none bg-gray-100 rounded w-full p-2 placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <input
                type="email"
                placeholder="Email address"
                value={billToEmail}
                onChange={handleChange(setBillToEmail)}
                className="border-none bg-gray-100 rounded w-full p-2 placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <input
                type="text"
                placeholder="Billing address"
                value={billToAddress}
                onChange={handleChange(setBillToAddress)}
                className="border-none bg-gray-100 rounded w-full p-2 placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
          </div>

          {/* Invoice Items */}
          <InvoiceItem
            items={items}
            currency={currency}
            onRowDel={handleRowDel}
            onRowAdd={handleAddEvent}
            onItemizedItemEdit={onItemizedItemEdit}
          />

          {/* Totals */}
          <div className="space-y-2 max-w-md ml-auto">
            <div className="flex justify-between">
              <span className="font-bold">Subtotal:</span>
              <span>{currency}{subTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Discount:</span>
              <span>{currency}{discountAmount} ({discountRate || 0}%)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Tax:</span>
              <span>{currency}{taxAmount} ({taxRate || 0}%)</span>
            </div>
            <hr className=" text-gray-400" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>{currency}{total}</span>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="font-bold">Notes:</label>
            <textarea
              placeholder="Thank you for doing business with us. Have a great day!"
              value={notes}
              onChange={handleChange(setNotes)}
              rows={3}
              className="border-none bg-gray-100 rounded w-full p-2 placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className=" col-span-1 w-full space-y-4 sticky top-6 self-start">
          <InvoiceModal
            showModal={isOpen}
            closeModal={closeModal}
            info={{
              dateOfIssue,
              invoiceNumber,
              billTo,
              billToEmail,
              billToAddress,
              billFrom,
              billFromEmail,
              billFromAddress,
              notes,
            }}
            items={items}
            currency={currency}
            subTotal={subTotal}
            taxAmount={taxAmount}
            discountAmount={discountAmount}
            total={total}
          />

          {/* Currency */}
          <div className="flex flex-col gap-2">
            <label className="font-bold">Currency:</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border bg-stone-100 hover:bg-stone-200 border-stone-300 rounded-lg w-full p-2 cursor-pointer"
            >
              <option value="₹">INR (Indian Rupee)</option>
              <option value="$">USD (United States Dollar)</option>
              <option value="£">GBP (British Pound Sterling)</option>
              <option value="¥">JPY (Japanese Yen)</option>
              <option value="C$">CAD (Canadian Dollar)</option>
              <option value="A$">AUD (Australian Dollar)</option>
              <option value="S$">SGD (Singapore Dollar)</option>
              <option value="₿">BTC (Bitcoin)</option>
            </select>
          </div>

          {/* Tax Rate */}
          <div className=" flex flex-col gap-2">
            <label className="font-bold">Tax rate:</label>
            <div className="flex focus-within:ring-2 focus-within:ring-blue-300 rounded-md overflow-hidden border border-stone-300 bg-stone-100">
              <input
                type="number"
                value={taxRate}
                onChange={handleChange(setTaxRate)}
                className="w-full p-2 bg-stone-100 focus:outline-none"
                placeholder="0.0"
                min="0"
                max="100"
                step="0.01"
              />
              <span className="px-2 flex items-center border-l border-stone-300">% </span>
            </div>
          </div>

          {/* Discount Rate */}
          <div className=" flex flex-col gap-2">
            <label className="font-bold">Discount rate:</label>
            <div className="flex focus-within:ring-2 focus-within:ring-blue-300 rounded-md overflow-hidden border border-stone-300 bg-stone-100">
              <input
                type="number"
                value={discountRate}
                onChange={handleChange(setDiscountRate)}
                className="w-full p-2 bg-stone-100 focus:outline-none"
                placeholder="0.0"
                min="0"
                max="100"
                step="0.01"
              />
              <span className="px-2 flex items-center border-l border-stone-300">%</span>
            </div>
          </div>

          {/* Review Button */}
          <button
            type="submit"
            className="w-full text-base bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Review Invoice
          </button>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
