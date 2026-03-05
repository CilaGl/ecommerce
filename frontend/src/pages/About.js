import React from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";

const About = () => {
  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
        {/* Page Title - Título de la Página */}
        <h1 className="text-3xl font-bold mb-6 text-center">
          AYÑ ¿Quienes somos?
        </h1>
      </div>
    </div>
  );
};
export default About;
