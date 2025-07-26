import React from "react";
import Navbar from "./Navbar";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">{children}</section>
    </main>
  );
};

export default PageWrapper;
