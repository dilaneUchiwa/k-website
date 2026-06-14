import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import ContactForm from './ContactForm';
import { PageHero } from '@/components/front/PageHero';
import { SlideIn, StaggerChildren, StaggerItem, FadeUp } from '@/components/ui/Animate';

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('contact');

  const contactCards = [
    {
      icon: Phone,
      color: 'blue',
      bg: 'bg-blue/10',
      iconColor: 'text-blue',
      title: 'Téléphone Cameroun',
      content: <a href="tel:+237694945547" className="text-muted hover:text-blue text-sm transition-colors">+237 694 945 547</a>,
    },
    {
      icon: Phone,
      color: 'red',
      bg: 'bg-red/10',
      iconColor: 'text-red',
      title: 'Téléphone Chine',
      content: <a href="tel:+8618333718710" className="text-muted hover:text-blue text-sm transition-colors">+86 183 3371 8710</a>,
    },
    {
      icon: Mail,
      color: 'sky',
      bg: 'bg-sky/10',
      iconColor: 'text-sky',
      title: 'Email',
      content: <a href="mailto:franklin@gmail.com" className="text-muted hover:text-blue text-sm transition-colors">franklin@gmail.com</a>,
    },
    {
      icon: MessageCircle,
      color: 'green',
      bg: 'bg-green/10',
      iconColor: 'text-green',
      title: 'WhatsApp',
      content: (
        <div>
          <a href="https://wa.me/237694945547" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-green text-sm transition-colors block mb-2">+237 694 945 547</a>
          <a href="https://wa.me/237694945547" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-[#1faf54] text-white px-4 py-1.5 rounded-lg text-xs font-head font-semibold hover:bg-[#179247] transition-colors">
            <MessageCircle className="w-3.5 h-3.5" /> Écrire sur WhatsApp
          </a>
        </div>
      ),
    },
    {
      icon: MapPin,
      color: 'amber',
      bg: 'bg-amber/10',
      iconColor: 'text-amber',
      title: 'Adresse Chine',
      content: <p className="text-muted text-sm">N° 411, Zone A, 4e étage<br />Guangzhou, Chine</p>,
    },
  ];

  return (
    <div>
      <PageHero eyebrow="Contact" title={t('title')} subtitle={t('subtitle')} />

      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <SlideIn from="left">
            <div className="space-y-5">
              <h2 className="font-head font-extrabold text-2xl text-ink mb-6">Informations de contact</h2>
              <StaggerChildren staggerDelay={0.08}>
                {contactCards.map(({ icon: Icon, bg, iconColor, title, content }, i) => (
                  <StaggerItem key={i}>
                    <div className="bg-white border border-line rounded-2xl p-6 flex gap-4 hover:shadow-sm hover:border-blue/20 transition-all">
                      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-none`}>
                        <Icon className={`w-5 h-5 ${iconColor}`} />
                      </div>
                      <div>
                        <div className="font-head font-semibold text-ink mb-1">{title}</div>
                        {content}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </SlideIn>

          {/* Form */}
          <SlideIn from="right" className="lg:col-span-2">
            <div className="bg-white border border-line rounded-2xl p-8">
              <h2 className="font-head font-extrabold text-2xl text-ink mb-6">Envoyez-nous un message</h2>
              <ContactForm />
            </div>
          </SlideIn>
        </div>
      </div>
    </div>
  );
}
