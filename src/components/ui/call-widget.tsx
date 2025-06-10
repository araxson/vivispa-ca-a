'use client';

import { Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface CallWidgetProps {
  phoneNumber: string;
}

export function CallWidget({ phoneNumber }: CallWidgetProps) {
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <Button
      className="fixed bottom-6 left-4 z-50 flex items-center rounded-full bg-blue-500 px-4 py-3 text-white shadow-lg transition-transform duration-300 ease-in-out hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 md:hidden"
      onClick={handleCall}
      aria-label="Call us"
    >
      <Phone className="mr-2 h-7 w-7" />
      <span className="text-sm font-normal">Call us</span>
    </Button>
  );
} 