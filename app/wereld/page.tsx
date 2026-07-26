import type { Metadata } from "next";
import { TopicPage } from "../components/TopicPage";
import { getTopic } from "@/data/world-data";

export const metadata: Metadata = {
  title: "Wereldbeeld",
  description:
    "Een compact overzicht van bevolking, hulpbronnen, energie, uitstoot en gezondheid.",
};

export default function WorldPage() {
  return <TopicPage topic={getTopic("wereld")!} />;
}
