import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Html5QrcodeScanner } from "html5-qrcode";

const Scanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const scannerRef = useRef(null); // Store scanner instance

  // Function to check if scannedData is a valid link
  const isValidURL = (text) => {
    return /^(https?:\/\/|www\.|[a-zA-Z0-9-]+\.[a-z]{2,})(\S*)$/i.test(text);
  };

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });

    scannerRef.current.render(
      (decodedText) => {
        setScannedData(decodedText);
        scannerRef.current.clear(); // Stop scanner after successful scan
      },
      (error) => {
        console.warn(error);
      }
    );

    return () => {
      scannerRef.current.clear(); // Cleanup scanner when unmounting
    };
  }, []);

  // ✅ Fix Scan Again Button
  const handleScanAgain = () => {
    setScannedData(null);
    scannerRef.current.render( // Restart the scanner
      (decodedText) => {
        setScannedData(decodedText);
        scannerRef.current.clear();
      },
      (error) => {
        console.warn(error);
      }
    );
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1 className="text-3xl font-bold">QR Code Scanner</motion.h1>
      <div id="reader" className="w-full max-w-md"></div>

      {scannedData && (
        <>
          <p className="text-green-400 text-lg font-semibold">Scanned: {scannedData}</p>

          {isValidURL(scannedData) && (
            <a
              href={scannedData.startsWith("http") ? scannedData : `https://${scannedData}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 w-full"
                whileTap={{ scale: 0.95 }}
              >
                Click to Open the link
              </motion.button>
            </a>
          )}

          <motion.button
            onClick={handleScanAgain} // ✅ Restart Scanner
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 w-full"
            whileTap={{ scale: 0.95 }}
          >
            Scan Again
          </motion.button>
        </>
      )}
    </motion.div>
  );
};

export default Scanner;
