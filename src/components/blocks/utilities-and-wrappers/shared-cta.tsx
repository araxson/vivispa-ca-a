import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui";
import Link from "next/link";

export function SharedCTA() {
  return (
    <Section background="muted" spacing="md">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Start Your Journey with Vivi's
        </h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Discover our services and book your appointment today. We are here to
          help you.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg">
            <Link href="/pricing">Book Appointment</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
