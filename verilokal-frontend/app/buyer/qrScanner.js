"use client";

import axios from "axios";
import { useRef, useState } from "react";

export default function ProductScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [product, setProduct] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(null);

  const Html5QrcodeRef = useRef(null);

  const startScanner = async () => {
    setError(null);
    setProduct(null);
    setQrData(null);
    setProductDetails(null);
    setIsScanning(true);

    try {
      const { Html5Qrcode } = await import("html5-qrcode");

      const qrCodeScanner = new Html5Qrcode("qr-reader");
      Html5QrcodeRef.current = qrCodeScanner;

      await qrCodeScanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          try {
            setQrData(decodedText);
            if (Html5QrcodeRef.current) {
              await Html5QrcodeRef.current.stop();
            }
            setIsScanning(false);

            const [product_id_str, blockchain_hash] = decodedText.split("|");
            const product_id = Number(product_id_str);

            if (!product_id || !blockchain_hash) {
              throw new Error("Invalid QR data format");
            }

            console.log("Sending to backend:", { product_id, blockchain_hash });
            let res;
            try {
              res = await axios.post(
                "http://localhost:3000/api/products/verify",
                { product_id, blockchain_hash }
              );
              console.log("Backend verification response:", res.data);
              setProduct(res.data);
              setError(null);
            } catch (axiosErr) {
              console.error(
                "Backend error:",
                axiosErr.response?.data || axiosErr.message
              );
              setError(
                axiosErr.response?.data?.message ||
                  "Backend verification failed"
              );
              return;
            }

            if (res.data.verified) {
              try {
                const allRes = await axios.get(
                  "http://localhost:3000/api/products"
                );
                const matched = allRes.data.find((p) => p.id === product_id);
                if (matched) {
                  setProductDetails(matched);
                  setError(null);
                } else {
                  setError("Verified but product not found in list");
                }
              } catch {
                setError("Verified but failed to fetch product details");
              }
            }
          } catch (err) {
            console.error("Processing error:", err);
            setError(err.message || "Invalid QR format or backend error");
          }
        },
        (scanError) => {
          console.warn("Scan error:", scanError);
        }
      );
    } catch (err) {
      console.error("Camera start failed:", err);
      setError("Failed to access camera");
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (Html5QrcodeRef.current) {
      await Html5QrcodeRef.current.stop().catch(() => {});
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-semibold mb-4">QR Product Verification</h2>

      {!isScanning ? (
        <button
          onClick={startScanner}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Open Scanner
        </button>
      ) : (
        <button
          onClick={stopScanner}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow"
        >
          Stop Scanner
        </button>
      )}

      <div
        id="qr-reader"
        style={{ width: "300px", marginTop: "20px" }}
      ></div>

      {qrData && (
        <p className="mt-4 text-gray-600 break-words">
          <strong>Scanned Data:</strong> {qrData}
        </p>
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}
      {product && product.verified && (
        <div className="mt-4 text-green-600 font-semibold">
          ✅ {product.message}
        </div>
      )}

      {product && !product.verified && (
        <div className="mt-4 text-red-500 font-semibold">
          ❌ {product.message}
        </div>
      )}
      {productDetails && (
        <div className="bg-gray-100 rounded-xl p-4 mt-6 shadow w-full max-w-md">
          <h3 className="text-lg font-bold mb-2">{productDetails.name}</h3>
          <p className="text-gray-700 mb-1">
            <strong>Description:</strong> {productDetails.description}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Type:</strong> {productDetails.type}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Origin:</strong> {productDetails.origin}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Materials:</strong> {productDetails.materials}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Production Date:</strong> {productDetails.productionDate}
          </p>

          {productDetails.product_image && (
            <img
              src={`http://localhost:3000/${productDetails.product_image}`}
              alt={productDetails.name}
              className="mt-3 rounded-lg"
            />
          )}
        </div>
      )}
    </div>
  );
}
