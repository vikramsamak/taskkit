import AppHeader from "@/components/SharedComponents/AppHeader";
import Hero from "@/components/SharedComponents/Hero";
import PageView from "@/components/SharedComponents/PageView";

export default function Home() {
  return (
    <PageView
      window={
        <section className="flex flex-col w-full h-full items-center gap-4">
          <AppHeader />
          <Hero />
        </section>
      }
    ></PageView>
  );
}
