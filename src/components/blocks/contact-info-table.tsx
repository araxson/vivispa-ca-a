import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { contactInfo } from '@/data/contact/contact';

interface ContactInfoTableProps {
  className?: string;
}

export function ContactInfoTable({ className }: ContactInfoTableProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-5 h-5" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden border rounded-lg">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4 font-medium text-sm w-32 border-r border-border bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Phone
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Link 
                    href={`tel:${contactInfo.phone.formatted}`}
                    className="text-sm hover:text-primary transition-colors font-medium"
                  >
                    {contactInfo.phone.main}
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4 font-medium text-sm border-r border-border bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Link 
                    href={`mailto:${contactInfo.email.main}`}
                    className="text-sm hover:text-primary transition-colors font-medium"
                  >
                    {contactInfo.email.main}
                  </Link>
                </td>
              </tr>
              <tr className="hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4 font-medium text-sm border-r border-border bg-muted/30">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Address
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm">
                    <div className="font-medium">{contactInfo.addresses.main.street}</div>
                    <div className="text-muted-foreground">{contactInfo.addresses.main.city}, {contactInfo.addresses.main.province} {contactInfo.addresses.main.postalCode}</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
} 