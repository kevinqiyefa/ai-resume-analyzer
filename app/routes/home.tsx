import type { Route } from "./+types/home";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import PageWrapper from "~/components/PageWrapper";

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
    <PageWrapper>
      <h1 className="text-4xl font-bold">
        Track Your Applications & Resume Ratings
      </h1>

      <h2>Review your submissions and get AI-powered feedback.</h2>
    </PageWrapper>
  );
}
