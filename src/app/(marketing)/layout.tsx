import { Navbar } from "@/components/layout/navigation"
import Footer from "@/components/layout/footer"
import { MarketingLayoutClient } from "@/components/layout/marketing-layout-client"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <MarketingLayoutClient>
        {children}
      </MarketingLayoutClient>
      <Footer />
    </div>
  )
} 