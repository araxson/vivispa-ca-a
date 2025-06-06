import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
} from "@/components/ui";
import type { ServiceItem } from "@/types/pricing";
import { ExternalLink } from "lucide-react";

interface PricingServiceTableProps {
  services: ServiceItem[];
  variant?: "nested" | "main";
}

const PricingServiceTable: React.FC<PricingServiceTableProps> = ({
  services,
  variant = "main",
}) => {
  const isNested = variant === "nested";

  if (!services || services.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No services available
      </div>
    );
  }

  const handleRowClick = (service: ServiceItem) => {
    if (service.url) {
      window.open(service.url, "_blank", "noopener noreferrer");
    } else {
      window.open("#booking", "_blank", "noopener noreferrer");
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-border hover:bg-muted/50">
            <TableHead className="text-left py-4 pl-4 md:pl-6 text-sm md:text-base font-semibold">
              Service
            </TableHead>
            <TableHead className="text-right py-4 px-4 text-sm md:text-base font-semibold">
              Price
            </TableHead>
            <TableHead className="text-center py-4 pr-4 md:pr-6 text-sm md:text-base font-semibold w-24 sm:w-28">
              Book
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {services.map((service, index) => (
            <TableRow
              key={`${service.name}-${index}`}
              className="border-border hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => handleRowClick(service)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleRowClick(service);
                }
              }}
              aria-label={`Book ${service.name} - ${service.price}`}
            >
              <TableCell className="py-4 pl-4 md:pl-6">
                <div className="space-y-1">
                  <span className="text-sm md:text-base lg:text-lg font-normal text-foreground leading-tight">
                    {service.name}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-right py-4 px-4">
                <span className="text-sm md:text-base lg:text-lg font-semibold text-primary whitespace-nowrap">
                  {service.price}
                </span>
              </TableCell>

              <TableCell className="text-center py-4 pr-4 md:pr-6">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-xs h-8 px-3 font-medium transition-colors pointer-events-none"
                  asChild
                >
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    Book
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export { PricingServiceTable };
