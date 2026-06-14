import React from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, MapPin, Phone, Globe, Award, Users, Shield, Lightbulb } from 'lucide-react';
import { PageHero } from '@/components/front/PageHero';
import { FadeUp, SlideIn, StaggerChildren, StaggerItem } from '@/components/ui/Animate';

export default async function AproposPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('about');

  const values = [
    { key: 'integrity', Icon: Shield, color: 'text-blue', bg: 'bg-blue/10' },
    { key: 'quality', Icon: Award, color: 'text-green', bg: 'bg-green/10' },
    { key: 'partnership', Icon: Users, color: 'text-sky', bg: 'bg-sky/10' },
    { key: 'innovation', Icon: Lightbulb, color: 'text-amber', bg: 'bg-amber/10' },
  ] as const;

  const timeline = [
    { year: '2014', title: 'Fondation', desc: 'TOCHE & FILS est créée à Yaoundé, Cameroun, par Franklin Kuate.' },
    { year: '2016', title: 'Présence en Chine', desc: "Ouverture d'un bureau à Guangzhou pour le sourcing direct." },
    { year: '2019', title: '100 engins livrés', desc: 'Passage du cap symbolique de 100 machines livrées en Afrique.' },
    { year: '2022', title: 'Expansion régionale', desc: "Extension des activités à 12 pays d'Afrique subsaharienne." },
    { year: '2024', title: '500+ engins', desc: 'Plus de 500 engins livrés, 200+ clients fidèles.' },
  ];

  const stats = [
    { value: '500+', label: 'Engins livrés' },
    { value: '12', label: 'Pays desservis' },
    { value: '200+', label: 'Clients satisfaits' },
    { value: '10+', label: "Années d'expérience" },
  ];

  return (
    <div>
      <PageHero eyebrow="À propos" title={t('title')} subtitle={t('subtitle')} />

      {/* History */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SlideIn from="left">
              <div>
                <div className="font-head font-bold text-xs tracking-[0.14em] uppercase text-blue mb-3">Notre Histoire</div>
                <h2 className="font-head font-extrabold text-3xl text-ink mb-6 leading-tight">{t('history_title')}</h2>
                <div className="space-y-4 text-muted leading-relaxed">
                  <p>{t('history')}</p>
                  <p>
                    Franklin Kuate, fondateur et PDG, a bâti TOCHE &amp; FILS sur sa connaissance intime des marchés africains et sa maîtrise des circuits d&apos;approvisionnement chinois. Sa vision : offrir aux entrepreneurs et aux gouvernements africains un accès direct aux équipements de construction chinois, à des prix transparents et avec un service irréprochable.
                  </p>
                  <p>
                    Aujourd&apos;hui, TOCHE &amp; FILS possède une double présence stratégique : des bureaux au Cameroun pour gérer les relations clients locaux, et une équipe permanente à Guangzhou (Chine) pour superviser les achats, les contrôles qualité et les expéditions.
                  </p>
                </div>
              </div>
            </SlideIn>

            {/* Timeline */}
            <SlideIn from="right">
              <StaggerChildren staggerDelay={0.12}>
                {timeline.map((item, i) => (
                  <StaggerItem key={i}>
                    <div className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="w-11 h-11 rounded-xl bg-blue text-white font-head font-extrabold text-sm flex items-center justify-center flex-none">
                          {item.year.slice(2)}
                        </div>
                        {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-line mt-2 min-h-[24px]" />}
                      </div>
                      <div className="pb-5">
                        <div className="font-head font-bold text-ink mb-1">
                          {item.title} <span className="text-muted font-normal text-sm">— {item.year}</span>
                        </div>
                        <p className="text-sm text-muted">{item.desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Presence */}
      <section className="py-20 bg-bg-soft">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeUp className="text-center mb-12">
            <div className="font-head font-bold text-xs tracking-[0.14em] uppercase text-blue mb-3">Présence internationale</div>
            <h2 className="font-head font-extrabold text-3xl text-ink">Cameroun — Chine, un pont commercial</h2>
          </FadeUp>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.12}>
            <StaggerItem>
              <div className="bg-white rounded-2xl border border-line p-8 hover:shadow-md hover:-translate-y-1 hover:border-blue/20 transition-all h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green" />
                  </div>
                  <h3 className="font-head font-extrabold text-xl text-ink">Bureau Cameroun</h3>
                </div>
                <p className="text-muted leading-relaxed mb-5">
                  Notre siège social au Cameroun est le point d&apos;entrée pour nos clients africains. L&apos;équipe locale gère les relations clients, les formalités d&apos;importation et assure le suivi des livraisons.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted"><Phone className="w-4 h-4 text-blue" /><span>+237 694 945 547</span></div>
                  <div className="flex items-center gap-2 text-sm text-muted"><MapPin className="w-4 h-4 text-blue" /><span>Yaoundé, Cameroun</span></div>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white rounded-2xl border border-line p-8 hover:shadow-md hover:-translate-y-1 hover:border-blue/20 transition-all h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-red/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-red" />
                  </div>
                  <h3 className="font-head font-extrabold text-xl text-ink">Bureau Chine</h3>
                </div>
                <p className="text-muted leading-relaxed mb-5">
                  Notre bureau de Guangzhou est stratégiquement situé au cœur du principal hub d&apos;export de matériel lourd en Chine. Nous y gérons le sourcing, les contrôles qualité, les expéditions et les paiements fournisseurs.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted"><Phone className="w-4 h-4 text-blue" /><span>+86 183 3371 8710</span></div>
                  <div className="flex items-center gap-2 text-sm text-muted"><MapPin className="w-4 h-4 text-blue" /><span>N° 411, Zone A, 4e étage, Guangzhou, Chine</span></div>
                </div>
              </div>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeUp className="text-center mb-12">
            <div className="font-head font-bold text-xs tracking-[0.14em] uppercase text-blue mb-3">Nos valeurs</div>
            <h2 className="font-head font-extrabold text-3xl text-ink">{t('values_title')}</h2>
          </FadeUp>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {values.map(({ key, Icon, color, bg }) => (
              <StaggerItem key={key}>
                <div className="bg-white rounded-2xl border border-line p-7 hover:shadow-md hover:-translate-y-1.5 hover:border-blue/20 transition-all duration-300 h-full">
                  <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <h3 className="font-head font-extrabold text-lg text-ink mb-2">
                    {t(`values.${key}.title` as any)}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {t(`values.${key}.desc` as any)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(115deg, #063D6E 0%, #0A5FA8 100%)' }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white" staggerDelay={0.12}>
            {stats.map(stat => (
              <StaggerItem key={stat.label}>
                <div className="font-head font-extrabold text-4xl text-sky mb-2">{stat.value}</div>
                <div className="text-[#9ec8e8] text-sm">{stat.label}</div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-bg-soft">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="font-head font-extrabold text-3xl text-ink mb-4">Travaillons ensemble</h2>
            <p className="text-muted mb-8">
              Vous avez un projet d&apos;équipement ? Notre équipe est à votre disposition pour vous conseiller et vous accompagner.
            </p>
          </FadeUp>
          <FadeUp delay={0.15} className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="flex items-center gap-2 bg-blue text-white font-head font-semibold px-7 py-4 rounded-xl hover:bg-navy transition-all hover:-translate-y-0.5"
            >
              Nous contacter <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={`/${locale}/catalogue`}
              className="flex items-center gap-2 border border-blue text-blue font-head font-semibold px-7 py-4 rounded-xl hover:bg-blue hover:text-white transition-all"
            >
              Voir le catalogue
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
