import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { contactInfo } from '@/data/contact/contact';

interface HoursTableProps {
  className?: string;
}

const daysOrder = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' }
] as const;

export function HoursTable({ className }: HoursTableProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Business Hours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden border rounded-lg">
          <table className="w-full border-collapse">
            <tbody>
              {daysOrder.map(({ key, label }, index) => (
                <tr key={key} className={`hover:bg-muted/50 transition-colors ${index !== daysOrder.length - 1 ? 'border-b border-border' : ''}`}>
                  <td className="py-3 px-4 font-medium text-sm w-32 border-r border-border bg-muted/30">
                    {label}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">
                    {contactInfo.hours[key]}
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