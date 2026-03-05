import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <Loader2 className="animate-spin h-12 w-12 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Cargando...</p>
      </div>
    </div>
  );
};
export default LoadingSpinner;
