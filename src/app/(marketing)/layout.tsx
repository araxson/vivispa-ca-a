import { Navbar } from "@/components/layout/navigation";
import { Footer } from "@/components/layout";
import { MarketingLayoutClient } from "@/components/layout/marketing-layout-client";
import { CallButton } from "@/components/ui/call-button";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <MarketingLayoutClient>{children}</MarketingLayoutClient>
      <Footer />
      <CallButton />
    </>
  );
}
