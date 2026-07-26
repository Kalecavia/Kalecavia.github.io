import type { Metadata } from "next";
import { TopicPage } from "../components/TopicPage";
import { getTopic } from "@/data/world-data";

export const metadata: Metadata = {
  title: "Gezondheid",
  description:
    "Levensverwachting, gezonde levensjaren en de systemen achter mondiale gezondheidsuitkomsten.",
};

export default function HealthPage() {
  return <TopicPage topic={getTopic("gezondheid")!} />;
}
