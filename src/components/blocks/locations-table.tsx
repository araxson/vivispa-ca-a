import { MapPin, Phone, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { locations, type Location } from '@/data/contact/contact';

interface LocationsTableProps {
  className?: string;
}

export function LocationsTable({ className }: LocationsTableProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Our Locations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-border bg-muted/50">
                <th className="text-left py-4 px-4 font-semibold text-sm border-r border-border">Location</th>
                <th className="text-left py-4 px-4 font-semibold text-sm border-r border-border">Address</th>
                <th className="text-left py-4 px-4 font-semibold text-sm border-r border-border">Phone</th>
                <th className="text-left py-4 px-4 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location: Location, index) => (
                <tr key={location.id} className={`hover:bg-muted/30 transition-colors ${index !== locations.length - 1 ? 'border-b border-border' : ''}`}>
                  <td className="py-4 px-4 border-r border-border">
                    <div className="font-semibold text-sm text-primary">{location.name}</div>
                  </td>
                  <td className="py-4 px-4 border-r border-border">
                    <div className="text-sm">
                      <div className="font-medium">{location.address}</div>
                      <div className="text-muted-foreground text-xs">
                        {location.city}, {location.province} {location.postalCode}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 border-r border-border">
                    <Link 
                      href={`tel:${location.phone}`}
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      {location.phone}
                    </Link>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <Link 
                        href={location.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs border border-primary/30 rounded-md hover:bg-primary/5 hover:text-primary transition-colors font-medium"
                      >
                        <MapPin className="w-3 h-3" />
                        Directions
                      </Link>
                      <Link 
                        href={`/booking?location=${location.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Book
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
} 