import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const auth = usePuterStore((state) => state.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1 className="text-4xl font-bold">
            Track Your Applications & Resume Ratings
          </h1>

          <h2>Review your submissions and get AI-powered feedback.</h2>
        </div>
      </section>
    </main>
  );
}
