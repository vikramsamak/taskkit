import Hero from "@/components/SharedComponents/Hero";
import PageView from "@/components/SharedComponents/PageView";

export default function Home() {
  return <PageView window={<Hero />}></PageView>;
}
