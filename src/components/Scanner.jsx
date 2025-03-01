import React from 'react'
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Html5QrcodeScanner } from "html5-qrcode";

const Scanner = () => {
    const [scannedData, setScannedData] = useState(null);
     useEffect(() => {
    // if (activeTab === "scan") {
      const scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: 250,
      });

      scanner.render(
        (decodedText) => {
          setScannedData(decodedText);
          scanner.clear(); // Stop scanner after successful scan
        },
        (error) => {
          console.warn(error);
        }
      );

      return () => {
        scanner.clear(); // Cleanup scanner when unmounting
      };
    // }
  }, []);

  return (
    <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.h1 className="text-3xl font-bold">QR Code Scanner</motion.h1>
          <div id="reader" className="w-full max-w-md"></div>
          {scannedData && <p className="text-green-400 text-lg font-semibold">Scanned: {scannedData}</p>}
        </motion.div>
  )
}

export default Scanner