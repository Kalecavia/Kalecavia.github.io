import type { Metadata } from "next";
import { TopicPage } from "../components/TopicPage";
import { getTopic } from "@/data/world-data";

export const metadata: Metadata = {
  title: "Bevolking",
  description:
    "Wereldbevolking, groei, verstedelijking en projecties met bron en methodologische context.",
};

export default function PopulationPage() {
  return <TopicPage topic={getTopic("bevolking")!} />;
}
