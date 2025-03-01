import React from 'react';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Generator = () => {
  
    const [text, setText] = useState("");
    const [color, setColor] = useState("#000000");
    const [size, setSize] = useState(128);
    const [qrCode, setQrCode] = useState("");
    
  
    const generateQR = async () => {
        if (!text) return;
        try {
          const response = await fetch("http://localhost:9081/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, color, size, logo: "omlogo" }),
          });
          if (!response.ok) throw new Error("Failed to generate QR Code");
          const data = await response.json();
          setQrCode(data.qrCode);
        } catch (error) {
          console.error("Error generating QR code:", error);
        }
      };
    
      const downloadQR = () => {
        if (!qrCode) return;
        const link = document.createElement("a");
        link.href = qrCode;
        link.download = `OmQr[${text}].png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      useEffect(() => {
        generateQR();
      }, [size, color]);
  return (
    <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.h1 className="text-3xl font-bold">QR Code Generator</motion.h1>
          <motion.input
            type="text"
            placeholder="Enter URL or text"
            className="border p-3 rounded w-full max-w-lg shadow-md bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-12 h-12 cursor-pointer border rounded-full shadow bg-white"
            whileHover={{ scale: 1.1 }}
          />
          <motion.select
            className="border p-3 rounded shadow-md bg-gray-700 text-white"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            whileFocus={{ scale: 1.05 }}
          >
            <option value={64}>64px</option>
            <option value={128}>128px</option>
            <option value={256}>256px</option>
            <option value={512}>512px</option>
          </motion.select>
          <motion.button
            onClick={generateQR} id="bgbb"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 w-full max-w-lg"
            whileTap={{ scale: 0.95 }}
          >
            Generate QR Code
          </motion.button>
          {qrCode && (
            <motion.div 
              className="flex flex-col items-center gap-4 w-full max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <img src={qrCode} alt="QR Code" className="border p-2 shadow-md bg-white" style={{ width: size, height: size }} />
              <motion.button id="bgbb"
                onClick={downloadQR}
                className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 w-full"
                whileTap={{ scale: 0.95 }}
              >
                Download QR Code
              </motion.button>
            </motion.div>
          )}
        </motion.div>
  )
}

export default Generator