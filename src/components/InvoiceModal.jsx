import React, { useRef, useEffect } from "react";
import { X, DownloadCloud, Send } from "lucide-react";
import html2canvas from 'html2canvas-pro';
import jsPDF from "jspdf";

const GenerateInvoice = () => {
  const invoice = document.querySelector("#invoiceCapture");
  if (!invoice) return;

  html2canvas(invoice).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: [612, 792] });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  });
};


const InvoiceModal = ({
  showModal,
  closeModal,
  info,
  items,
  currency,
  subTotal,
  taxAmount,
  discountAmount,
  total,
}) => {
  const modalRef = useRef(null);

  // Close modal when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    // Add event listener for outside click
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  if (!showModal) return null;



  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center mb-0 z-50">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-3xl rounded shadow-lg overflow-hidden">

        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-lg">Invoice Preview</h3>
          <button onClick={closeModal} className="text-gray-600 hover:text-gray-800 cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* Invoice Body */}
        <div id="invoiceCapture" className="p-6 space-y-4">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full border-b pb-3 mb-4">
            <div>
              <h4 className="font-bold text-xl mb-1">
                {info.billTo || "Debabrata Das"}
              </h4>
              <h6 className="font-semibold text-gray-600">
                Invoice Number: {info.invoiceNumber || ""}
              </h6>
            </div>
            <div className="text-right mt-3 md:mt-0 md:ml-4">
              <h6 className="font-semibold mb-1">Amount Due:</h6>
              <h5 className="font-bold text-red-600 text-lg">
                {currency}{total}
              </h5>
            </div>
          </div>

          {/* Billing Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <div className="font-bold mb-1">Billed From:</div>
              <div>{info.billFrom || ""}</div>
              <div>{info.billFromAddress || ""}</div>
              <div>{info.billFromEmail || ""}</div>
            </div>
            <div>
              <div className="font-bold mb-1">Billed To:</div>
              <div>{info.billTo || ""}</div>
              <div>{info.billToAddress || ""}</div>
              <div>{info.billToEmail || ""}</div>
            </div>
            <div>
              <div className="font-bold mb-1">Date Of Issue:</div>
              <div>{info.dateOfIssue || ""}</div>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1 text-left">Item</th>
                <th className="border px-2 py-1 text-center">Qty</th>
                <th className="border px-2 py-1 text-right">Price</th>
                <th className="border px-2 py-1 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-2 py-1">{item.name} - {item.description}</td>
                  <td className="px-2 py-1 text-center">{item.quantity}</td>
                  <td className="px-2 py-1 text-right">{currency}{item.price}</td>
                  <td className="px-2 py-1 text-right">
                    {currency}{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end flex-col text-right mt-4 space-y-1">
            <p>Subtotal: {currency}{subTotal}</p>
            <p>Tax: {currency}{taxAmount}</p>
            <p>Discount: {currency}{discountAmount}</p>
            <p className="font-bold text-lg">Total: {currency}{total}</p>
          </div>

          {/* Notes */}
          {info.notes && (
            <div className="bg-gray-100 p-2 rounded text-sm mt-4">
              {info.notes}
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="p-4 flex justify-end space-x-2 border-t">
          <button
            onClick={GenerateInvoice}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer"
          >
            <Send size={16} /> Send Invoice
          </button>
          <button
            onClick={GenerateInvoice}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            <DownloadCloud size={16} /> Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
