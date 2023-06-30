import { AuthGuard } from "@/lib/guard";
import Footer from "./footer/footer";
import Header from "./header/header";
export default function Layout({ children }: React.PropsWithChildren<unknown>) {
  return (
    <>
      <Header />
      <div className="container">
        <AuthGuard>{children}</AuthGuard>
      </div>
      <Footer />
    </>
  );
}
