import Footer from "@/components/SharedComponents/Footer";
import Header from "@/components/SharedComponents/Header";

export default function AppLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
