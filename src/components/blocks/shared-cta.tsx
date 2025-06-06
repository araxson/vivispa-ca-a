import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import Link from "next/link";

export function SharedCTA() {
  return (
    <Section background="muted" spacing="md">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to Rejuvenate?
        </h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Book your consultation today and take the first step towards a more
          radiant you. Our experts are here to guide you.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg">
            <Link href="/contact">Book Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
