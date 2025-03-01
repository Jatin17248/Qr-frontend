import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import { Html5QrcodeScanner } from "html5-qrcode";
import Generator from "./components/Generator";
import Scanner from "./components/Scanner";

export default function QRCodeGenerator() {
  const [activeTab, setActiveTab] = useState("generate"); // Toggle between Generate & Scan




  return (
    <div className="containZ flex flex-col items-center p-6 gap-6 bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen w-full text-white">
      
      <div className="flex gap-4 w-full">
        <motion.button
          onClick={() => setActiveTab("generate")}
          className={`px-6 py-3 w-1/2 rounded-lg bg-transparent ${activeTab !== "generate" ? "" : "border-2 border-solid" }`}
          whileTap={{ scale: 0.95 }}
        >
          Generate QR Code
        </motion.button>
        <motion.button
          onClick={() => setActiveTab("scan")}
          className={`px-6 py-3 w-1/2 rounded-lg bg-transparent ${activeTab !== "scan" ? "" : "border-2 border-solid" }`}
          whileTap={{ scale: 0.95 }}
        >
          Scan QR Code
        </motion.button>
      </div>

      {activeTab === "generate" && (
          <Generator/>
      )}

      {activeTab === "scan" && (
       <Scanner/>
      )}

    </div>
  );
}
