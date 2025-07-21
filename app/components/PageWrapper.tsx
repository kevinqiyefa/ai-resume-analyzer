import React from "react";
import Navbar from "./Navbar";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">{children}</div>
      </section>
    </main>
  );
};

export default PageWrapper;
