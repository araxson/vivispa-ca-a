'use client';

import { Send, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { WhatsAppIcon } from './icons';

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
    setIsOpen(false);
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
      <Button
        className="fixed bottom-6 right-4 z-50 flex items-center rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-transform duration-300 ease-in-out hover:bg-[#128C7E] dark:hover:bg-[#128C7E] md:hidden"
        onClick={handleToggle}
        aria-label="Open WhatsApp chat"
      >
        <WhatsAppIcon className="mr-2 h-7 w-7" />
        <span className="text-sm font-normal">Chat with us</span>
      </Button>

      <div
        className={cn(
          'fixed bottom-24 right-4 z-50 w-[calc(100%-2rem)] max-w-sm origin-bottom-right transform rounded-lg border bg-card text-card-foreground shadow-xl transition-all duration-300 ease-in-out md:hidden',
          {
            'translate-y-0 opacity-100': isOpen,
            'pointer-events-none translate-y-4 opacity-0': !isOpen,
          },
        )}
      >
        <header className="flex items-center gap-4 rounded-t-lg bg-[#075E54] p-3 text-white dark:bg-[#2a3942]">
          <div className="flex items-center justify-center rounded-full bg-white p-1.5">
            <Image
              src="/images/logo.svg"
              alt={brandName}
              width={36}
              height={36}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold">{brandName}</h3>
            <p className="text-xs text-white/90">Typically replies instantly</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            aria-label="Close chat"
            className="ml-auto size-8 rounded-full text-white/80 hover:bg-white/10 hover:text-white"
          >
            <X className="size-5" />
          </Button>
        </header>
        <div className="relative h-96 bg-gray-100 bg-cover bg-center p-4 bg-[url('/static/whatsapp-light-bg.jpg')] dark:bg-[#0b141a] dark:bg-[url('/static/whatsapp-dark-bg.jpg')]">
          <div className="absolute inset-0 hidden bg-black/50 dark:block" />
          <div className="relative flex h-full flex-col justify-end">
            <div className="flex flex-col gap-3">
              <div className="max-w-[85%] self-start rounded-xl rounded-tl-none bg-white p-3 shadow-md dark:bg-[#202C33]">
                <p className="text-sm text-gray-800 dark:text-gray-50">
                  {welcomeMessage}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap justify-end gap-2">
                {predefinedMessages.map((text, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="rounded-lg border-gray-300 bg-white text-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    onClick={() => handlePredefinedMessageClick(text)}
                  >
                    {text}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-gray-200 bg-gray-100 p-3 rounded-b-lg dark:border-gray-700 dark:bg-[#202c33]">
          <Input
            placeholder="Type a message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCustomMessageSend()}
            aria-label="Your message"
            className="h-10 flex-grow rounded-full border-border bg-transparent px-4"
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