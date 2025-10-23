import React from "react";
import InvoiceForm from "./components/InvoiceForm";

const App = () => {
  return (
    <div className="min-h-screen bg-[#f1f3f5] flex justify-center items-start">
      <div className="w-full max-w-7xl">
        <InvoiceForm />
      </div>
    </div>
  );
};

export default App;



// import InvoiceForm from "./components/InvoiceForm";

// function App() {

//   return (
//     <div>
//       <InvoiceForm />
//     </div>
//   )
// }

// export default App
