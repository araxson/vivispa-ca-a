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
            <TableHead className="px-4 py-3 text-left text-sm font-semibold md:px-6 md:text-base">
              Service
            </TableHead>
            <TableHead className="px-4 py-3 text-right text-sm font-semibold md:px-6 md:text-base">
              Price
            </TableHead>
            <TableHead className="w-24 px-4 py-3 text-center text-sm font-semibold sm:w-28 md:px-6 md:text-base">
              Book
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {services.map((service, index) => (
            <TableRow
              key={`${service.name}-${index}`}
              className="border-border transition-colors hover:bg-muted/30"
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
              <TableCell className="px-4 py-4 md:px-6">
                <div className="space-y-1">
                  <span className="text-sm font-normal leading-tight text-foreground md:text-base lg:text-lg">
                    {service.name}
                  </span>
                </div>
              </TableCell>

              <TableCell className="px-4 py-4 text-right md:px-6">
                <span className="whitespace-nowrap text-sm font-semibold text-primary md:text-base lg:text-lg">
                  {service.price}
                </span>
              </TableCell>

              <TableCell className="px-4 py-4 text-center md:px-6">
                <Button
                  size="sm"
                  className="pointer-events-none h-8 bg-primary px-3 text-xs font-medium transition-colors hover:bg-primary/90"
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
