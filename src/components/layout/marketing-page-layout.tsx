import React from 'react';
import { Section } from '@/components/ui/section';
import { FadeIn } from '@/components/ui/fade-in';
import { SectionHeader } from '@/components/blocks/section-header';
import { CallToAction } from '@/components/blocks/call-to-action';

interface MarketingPageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const MarketingPageLayout: React.FC<MarketingPageLayoutProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <>
      <Section spacing="md">
        <FadeIn>
          <SectionHeader title={title} subtitle={subtitle} />
        </FadeIn>
      </Section>
      <Section spacing="md">
        <FadeIn>{children}</FadeIn>
      </Section>
      <FadeIn>
        <CallToAction />
      </FadeIn>
    </>
  );
};
