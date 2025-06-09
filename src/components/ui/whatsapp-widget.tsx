'use client';

import { Send, X } from 'lucide-react';
import Image from 'next/image';
import { type SVGProps, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 448 512"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157.2 341.6c-33.8 0-67.6-9.2-97.2-26.7l-7-4.1-68.8 18.1 18.3-67.1-4.5-7.2c-19.1-30.4-29.7-65.7-29.7-101.8 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

interface WhatsAppWidgetProps {
  phoneNumber: string;
  brandName: string;
  welcomeMessage: string;
  predefinedMessages: string[];
}

export function WhatsAppWidget({
  phoneNumber,
  brandName,
  welcomeMessage,
  predefinedMessages,
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleToggle = () => setIsOpen(prev => !prev);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const encodedMessage = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePredefinedMessageClick = (text: string) => {
    handleSendMessage(text);
  };

  const handleCustomMessageSend = () => {
    handleSendMessage(message);
    setMessage('');
  };

  return (
    <>
      {/* Main Chat Button */}
      <Button
        className="fixed bottom-2 right-2 z-50 flex items-center rounded-full bg-[#25D366] px-3 py-2 shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-[#128C7E] dark:hover:bg-[#128C7E] sm:bottom-4 sm:right-4 sm:px-4 sm:py-3 lg:hidden"
        onClick={handleToggle}
        aria-label="Open WhatsApp chat"
      >
        <WhatsAppIcon className="mr-1 h-6 w-6 text-white sm:mr-2 sm:h-7 sm:w-7" />
        <span className="text-sm font-medium text-white sm:text-base">
          Chat with us
        </span>
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          'fixed bottom-20 right-2 z-50 w-full max-w-sm origin-bottom-right transform rounded-lg border bg-card text-card-foreground shadow-xl transition-transform duration-300 ease-in-out overflow-hidden sm:bottom-24 sm:right-4 lg:hidden',
          {
            'translate-x-0 translate-y-0 scale-100': isOpen,
            'pointer-events-none -translate-x-8 translate-y-12 scale-0':
              !isOpen,
          },
        )}
      >
        {/* Chat Header */}
        <header className="flex items-center gap-3 rounded-t-lg bg-[#008069] p-2 text-white dark:bg-[#1F2C34] sm:gap-4 sm:p-3">
          <Image
            src="/images/logo.svg"
            alt={brandName}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold sm:text-base">{brandName}</h3>
            <p className="text-xs text-white/90">Online now</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            aria-label="Close chat"
            className="ml-auto rounded-full text-white/80 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </header>
        {/* Message Area */}
        <div
          className="h-96 overflow-y-auto bg-cover bg-center p-2 bg-[url('/images/whatsapp-bg.png')] dark:bg-[url('/images/whatsapp-bg-dark.png')] sm:p-4"
        >
          <div className="flex h-full flex-col justify-end">
            <div className="flex flex-col gap-3">
              {/* Welcome Message Bubble */}
              <div className="max-w-[85%] self-start rounded-lg rounded-tl-none bg-white p-3 shadow-md dark:bg-[#202C33] sm:p-4">
                <p className="text-sm text-gray-800 dark:text-gray-50">
                  {welcomeMessage}
                </p>
              </div>
              {/* Predefined Message Bubbles */}
              <div className="flex flex-col items-end gap-2 py-2">
                {predefinedMessages.map((text, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="rounded-lg border-transparent bg-[#DCF8C6]/90 px-3 py-2 text-sm text-gray-800 shadow-sm backdrop-blur-sm hover:bg-[#c8e6b7]/90 dark:bg-[#056162]/90 dark:text-gray-50 dark:hover:bg-[#045253]/90"
                    onClick={() => handlePredefinedMessageClick(text)}
                  >
                    {text}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Input Area */}
        <div className="flex items-center gap-2 border-t-2 border-gray-300 bg-background p-2 dark:border-gray-700 sm:p-3">
          <Input
            placeholder="Type a message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCustomMessageSend()}
            aria-label="Your message"
            className="h-10 flex-grow rounded-full border-border bg-muted px-4"
          />
          <Button
            size="icon"
            onClick={handleCustomMessageSend}
            disabled={!message.trim()}
            aria-label="Send message"
            className="h-10 w-10 shrink-0 rounded-full bg-[#00A884] text-white transition-transform hover:scale-105 hover:bg-[#008069] disabled:scale-100 disabled:bg-gray-400 dark:disabled:bg-gray-600"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
} 