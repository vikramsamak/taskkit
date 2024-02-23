import Footer from "@/components/SharedComponents/Footer";
import Header from "@/components/SharedComponents/Header";

export default function CalculatorLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
