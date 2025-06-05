import Link from 'next/link';
import { MapPin, ExternalLink, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { type Location } from '@/data/contact/contact';

interface LocationDetailsCardProps {
  location: Location;
  className?: string;
}

export function LocationDetailsCard({ location, className }: LocationDetailsCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">
          {location.name} Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        {/* Contact Information Table */}
        <div>
          <h3 className="font-medium text-xs sm:text-sm mb-2 sm:mb-3 flex items-center gap-2">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            Contact Information
          </h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-2 sm:py-3 px-3 sm:px-4 font-medium text-xs sm:text-sm w-16 sm:w-20 border-r border-border bg-muted/30">Address</td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm">
                    <div className="font-medium">{location.address}</div>
                    <div className="text-muted-foreground text-xs">
                      {location.city}, {location.province} {location.postalCode}
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50 transition-colors">
                  <td className="py-2 sm:py-3 px-3 sm:px-4 font-medium text-xs sm:text-sm border-r border-border bg-muted/30">Phone</td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4">
                    <Link 
                      href={`tel:${location.phone}`} 
                      className="text-xs sm:text-sm font-medium hover:text-primary transition-colors"
                    >
                      {location.phone}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Hours Table */}
        <div>
          <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Hours
          </h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <tbody>
                {location.hours.map((hour, index) => (
                  <tr key={hour.day} className={`hover:bg-muted/50 transition-colors ${index !== location.hours.length - 1 ? 'border-b border-border' : ''}`}>
                    <td className="py-2 px-4 font-medium text-sm w-20 border-r border-border bg-muted/30">{hour.day}</td>
                    <td className="py-2 px-4 text-sm font-medium">{hour.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Embedded Map */}
        {location.embedMapUrl && (
          <div>
            <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Location Map
            </h3>
            <div className="w-full h-64 relative rounded-lg overflow-hidden border-2 border-border shadow-sm">
              <iframe
                src={location.embedMapUrl}
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${location.name} location map`}
              />
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="border-t pt-4">
          <div className="flex gap-3">
            <Link 
              href={location.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm font-medium border-2 border-primary/30 rounded-lg hover:bg-primary/5 hover:text-primary hover:border-primary/50 transition-all duration-200"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Get Directions
            </Link>
            <Link 
              href={`/booking?location=${location.id}`}
              className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Book Appointment
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 