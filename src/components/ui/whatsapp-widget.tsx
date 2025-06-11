'use client';

import { Send, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useCallback, memo, useMemo, startTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { WhatsAppIcon } from '@/lib/icons';

interface WhatsAppWidgetProps {
  phoneNumber: string;
  brandName: string;
  welcomeMessage: string;
  predefinedMessages: readonly string[];
}

export const WhatsAppWidget = memo(function WhatsAppWidget({
  phoneNumber,
  brandName,
  welcomeMessage,
  predefinedMessages,
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Use functional updates for state changes
  const handleToggle = useCallback(() => {
    startTransition(() => {
      setIsOpen(prev => !prev);
    });
  }, []);

  // Memoize the WhatsApp URL base to avoid recalculations
  const whatsappUrlBase = useMemo(() => 
    `https://wa.me/${phoneNumber}?text=`, 
  [phoneNumber]);

  const handleSendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    
    const encodedMessage = encodeURIComponent(text);
    const whatsappUrl = `${whatsappUrlBase}${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }, [whatsappUrlBase]);

  const handlePredefinedMessageClick = useCallback((text: string) => {
    handleSendMessage(text);
  }, [handleSendMessage]);

  const handleCustomMessageSend = useCallback(() => {
    if (!message.trim()) return;
    
    handleSendMessage(message);
    setMessage('');
  }, [handleSendMessage, message]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && message.trim()) {
      handleCustomMessageSend();
    }
  }, [handleCustomMessageSend, message]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);

  // Memoize the predefined message buttons to avoid re-renders
  const predefinedMessageButtons = useMemo(() => 
    predefinedMessages.map((text, index) => (
      <Button
        key={`preset-msg-${index}`}
        variant="outline"
        size="sm"
        className="rounded-full border-transparent bg-background/60 text-foreground backdrop-blur-sm hover:bg-accent/80"
        onClick={() => handlePredefinedMessageClick(text)}
      >
        {text}
      </Button>
    ))
  , [predefinedMessages, handlePredefinedMessageClick]);

  // Memoize the widget header for better performance
  const widgetHeader = useMemo(() => (
    <header className="flex items-center gap-4 rounded-t-lg bg-[#008069] p-3 text-white dark:bg-[#1F2C34]">
      <Image
        src="/images/logo.svg"
        alt={brandName}
        width={40}
        height={40}
        className="rounded-full"
        priority
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{brandName}</h3>
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
  ), [brandName, handleToggle]);

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 z-50 flex items-center rounded-full bg-[#25D366] px-4 py-3 shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-[#128C7E] dark:hover:bg-[#128C7E]"
        onClick={handleToggle}
        aria-label="Open WhatsApp chat"
      >
        <WhatsAppIcon className="mr-2 h-7 w-7 text-white" />
        <span className="text-base font-medium text-white">Chat with us</span>
      </Button>

      <div
        className={cn(
          'fixed bottom-24 right-4 z-50 w-full max-w-sm origin-bottom-right transform rounded-lg border bg-card text-card-foreground shadow-xl transition-transform duration-300 ease-in-out',
          isOpen 
            ? 'translate-x-0 translate-y-0 scale-100' 
            : 'pointer-events-none -translate-x-8 translate-y-12 scale-0'
        )}
      >
        {widgetHeader}
        
        <div
          className="h-96 bg-cover bg-center p-4 bg-[url('/images/whatsapp-bg.png')] dark:bg-[url('/images/whatsapp-bg-dark.png')]"
        >
          <div className="flex h-full flex-col justify-end">
            <div className="flex flex-col gap-3">
              <div className="max-w-[85%] self-start rounded-lg rounded-tl-none bg-white p-3 shadow-md dark:bg-[#202C33]">
                <p className="text-sm text-gray-800 dark:text-gray-50">
                  {welcomeMessage}
                </p>
              </div>
              <div className="flex flex-wrap justify-end gap-2 py-2">
                {predefinedMessageButtons}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 border-t bg-background p-3">
          <Input
            placeholder="Type a message"
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
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
}); 