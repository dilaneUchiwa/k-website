import React from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Ship, Truck, CreditCard, ShieldCheck, Search, FileText, Globe } from 'lucide-react';
import { PageHero } from '@/components/front/PageHero';
import { FadeUp, StaggerChildren, StaggerItem } from '@/components/ui/Animate';

export default async function ServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('services');

  const services = [
    {
      key: 'import',
      Icon: Ship,
      title: "Vente d'équipements",
      desc: "Nous commercialisons une large gamme de machines de construction et d'équipements lourds directement importés des meilleurs fabricants chinois : SINOTRUK, SHACMAN, SANY, SDLG, XCMG et bien d'autres. Camions bennes, excavateurs, chargeuses, bulldozers, compacteurs — chaque engin est soigneusement sélectionné pour sa fiabilité et ses performances en conditions africaines.",
    },
    {
      key: 'transport',
      Icon: Truck,
      title: 'Fret maritime & logistique',
      desc: "De l'usine en Chine jusqu'à votre chantier en Afrique, nous gérons l'intégralité de la chaîne logistique. Chargement en conteneur ou Ro-Ro, fret maritime, dédouanement, transit douanier et convoyage final. Nos partenaires armateurs et transitaires garantissent des délais maîtrisés et une sécurité optimale pour vos engins.",
    },
    {
      key: 'financing',
      Icon: CreditCard,
      title: 'Paiement fournisseurs',
      desc: "Fort de notre présence à Guangzhou, nous facilitons les transactions financières avec les fabricants chinois. Nous agissons comme intermédiaire de confiance pour les transferts internationaux, les lettres de crédit et les paiements sécurisés. Vous bénéficiez de notre connaissance du marché pour négocier les meilleures conditions de paiement.",
    },
    {
      key: 'warranty',
      Icon: ShieldCheck,
      title: 'Assistance aux achats',
      desc: "Vous souhaitez acquérir des équipements en Chine mais ne savez pas par où commencer ? Notre équipe basée à Guangzhou vous accompagne dans toutes vos démarches : identification des fournisseurs fiables, négociation des prix, vérification des spécifications techniques, rédaction des contrats et suivi de production.",
    },
    {
      key: 'inspection',
      Icon: Search,
      title: 'Contrôle qualité',
      desc: "Avant chaque expédition, nos techniciens procèdent à une inspection rigoureuse de chaque engin directement chez le fabricant. Contrôle mécanique, test de fonctionnement, vérification des équipements de sécurité, vérification de la conformité aux spécifications commandées. Vous recevez un rapport complet avec photos et vidéos avant embarquement.",
    },
    {
      key: 'consulting',
      Icon: FileText,
      title: 'Gestion documentaire',
      desc: "Les procédures administratives pour l'import de matériel lourd sont complexes. Nous prenons en charge la gestion complète de vos documents : certificats d'origine, documents douaniers, homologation, carnet de bord, certificats de conformité. Notre expertise administrative vous évite les blocages en douane et les retards coûteux.",
    },
    {
      key: 'training',
      Icon: Globe,
      title: 'Sourcing en Chine',
      desc: "Profitez de notre réseau de contacts à Guangzhou et dans toute la Chine pour trouver les meilleures opportunités. Nous visitons les salons professionnels, maintenons des relations directes avec les fabricants et pouvons sourcer pratiquement tout type d'équipement ou de pièces détachées selon vos besoins spécifiques.",
    },
  ];

  return (
    <div>
      <PageHero eyebrow="Nos Services" title={t('title')} subtitle={t('subtitle')} />

      {/* Services list */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.09}>
          {services.map(({ key, Icon, title, desc }) => (
            <StaggerItem key={key}>
              <div className="bg-white rounded-2xl border border-line p-8 hover:shadow-lg hover:-translate-y-1 hover:border-blue/20 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-blue" />
                </div>
                <h2 className="font-head font-extrabold text-xl text-ink mb-3">{title}</h2>
                <p className="text-muted leading-relaxed text-[15px]">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* CTA */}
        <FadeUp delay={0.1} className="mt-16 text-center bg-bg-soft rounded-2xl p-12">
          <h2 className="font-head font-extrabold text-2xl md:text-3xl text-ink mb-4">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-muted mb-8 max-w-lg mx-auto">
            Contactez notre équipe pour une consultation gratuite. Nous analysons vos besoins et vous proposons la solution adaptée.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`/${locale}/devis`}
              className="flex items-center gap-2 bg-cta text-white font-head font-semibold px-7 py-4 rounded-xl hover:bg-cta-dark transition-all shadow-[0_8px_24px_rgba(224,90,0,.3)] hover:-translate-y-0.5"
            >
              Demander un devis <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="flex items-center gap-2 border border-blue text-blue font-head font-semibold px-7 py-4 rounded-xl hover:bg-blue hover:text-white transition-all"
            >
              Nous contacter
            </Link>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
