import React from "react";
import { X, DownloadCloud } from "lucide-react";
import html2canvas from "html2canvas";
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

const InvoiceModal = ({ showModal, closeModal, info, items, currency, subTotal, taxAmount, discountAmount, total }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl rounded shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-lg">Invoice Preview</h3>
          <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>

        <div id="invoiceCapture" className="p-4 space-y-4">
          <div className="flex justify-between">
            <div>
              <h4 className="font-bold">{info.billFrom}</h4>
              <p>{info.billFromEmail}</p>
            </div>
            <div className="text-right">
              <h5 className="font-bold">Invoice #{info.invoiceNumber}</h5>
              <p>{info.dateOfIssue}</p>
              <h5 className="font-bold text-xl">{currency}{total}</h5>
            </div>
          </div>

          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Item</th>
                <th className="border px-2 py-1">Qty</th>
                <th className="border px-2 py-1 text-right">Price</th>
                <th className="border px-2 py-1 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-2 py-1">{item.name} - {item.description}</td>
                  <td className="px-2 py-1">{item.quantity}</td>
                  <td className="px-2 py-1 text-right">{currency}{item.price}</td>
                  <td className="px-2 py-1 text-right">{currency}{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end space-y-1 flex-col text-right mt-2">
            <p>Subtotal: {currency}{subTotal}</p>
            <p>Tax: {currency}{taxAmount}</p>
            <p>Discount: {currency}{discountAmount}</p>
            <p className="font-bold">Total: {currency}{total}</p>
          </div>

          {info.notes && <div className="bg-gray-100 p-2 rounded">{info.notes}</div>}
        </div>

        <div className="p-4 flex justify-end space-x-2 border-t">
          <button
            onClick={GenerateInvoice}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            <DownloadCloud size={16} /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
