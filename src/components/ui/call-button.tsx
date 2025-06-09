import Link from "next/link";
import { Phone } from "lucide-react";

import { siteConfig } from "@/data/constant";
import { Button } from "@/components/ui/button";

export function CallButton() {
  return (
    <Button
      asChild
      className="fixed bottom-4 left-4 z-50 flex items-center justify-center rounded-full shadow-lg"
      size="icon"
      aria-label="Call us"
    >
      <Link href={`tel:${siteConfig.contact.phone}`}>
        <Phone className="h-6 w-6" />
      </Link>
    </Button>
  );
}
