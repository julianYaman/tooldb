import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NextSeo } from "next-seo";
import Script from "next/script";
import { Avatar, Button, Card } from "flowbite-react";
import { server } from '../config'
import Link from "next/link";

import { RiMailFill } from "react-icons/ri";

export default function PartnerPage({partnerData} : any) {
  return (
    <div className="text-black">
      <NextSeo
        title="🔎  tooldb - Partners"
        description="Donate to tooldb to keep the project alive"
        canonical="https://tooldb.dev/donate"
        openGraph={{
            url: `https://tooldb.dev/donate`,
            title: `🔎  tooldb - Donate`,
            description: `tooldb.dev is a free, open-source project. Donations help to cover the costs of hosting and maintaining the project.`,
            images: [
                {
                    url: `https://qrukfpaygglwznencwsz.supabase.co/storage/v1/object/public/tool-images/tooldb/logo-with-icon.png`,
                    alt: `ToolDB logo`,
                },
            ],
            site_name: 'ToolDB',
        }}
        twitter={{
            site: '@tooldbdev',
            cardType: 'summary',
        }}
        additionalLinkTags={[
            {
                rel: 'icon',
                href: '/favicon-310.png',
            },
            {
                rel: 'apple-touch-icon',
                sizes: '76x76',
                href: '/favicon-310.png',
            }
        ]}
      />
      <Head>
        <script defer data-domain="tooldb.dev" src="https://plausible.io/js/plausible.js"></script>
      </Head>
      <Script
        id="iubenda_script"
        dangerouslySetInnerHTML={{
        __html: `
        var _iub = _iub || [];
        _iub.csConfiguration = {"askConsentAtCookiePolicyUpdate":true,"ccpaAcknowledgeOnDisplay":true,"ccpaApplies":true,"consentOnContinuedBrowsing":false,"cookiePolicyInOtherWindow":true,"enableCcpa":true,"floatingPreferencesButtonDisplay":"bottom-right","invalidateConsentWithoutLog":true,"lang":"en-GB","perPurposeConsent":true,"siteId":2662972,"whitelabel":false,"cookiePolicyId":97555269, "banner":{ "acceptButtonDisplay":true,"closeButtonDisplay":false,"customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"position":"float-bottom-left","rejectButtonDisplay":true }};
        `}}
      />
      <Script type="text/javascript" src="//cdn.iubenda.com/cs/ccpa/stub.js" />
      <Script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charSet="UTF-8" async />
      <Header />
      <section className="text-white-900 body-font">
        <div className="container flex flex-wrap flex-col max-w-5xl mx-auto pt-48 pb-6 p-5">
          <div id="categoryData">
            <h1 className="text-6xl text-left font-4 lh-6 font-bold text-white mb-5 text-center">
                  Partners
            </h1>
            <p className="text-lg font-4 pb-10 text-white leading-relaxed text-center">
              ToolDB relies on the contributions of its users. Partners provide ToolDB with their tool collection or with their own created app, framework or project. <br />
              Partners are mentioned on this page and with a special badge on their provided tools, linking to their website.
            </p>
          </div>
          <div>
            <h2 className="text-xl text-center font-bold pb-3 text-white">
              To become a partner of tooldb, please contact us via mail. Tell us, which tools you would like to add.
            </h2>
            <a href="mailto:mail@yaman.pro" className="text-center mx-auto"><Button className="text-center gap-2 mx-auto" pill={true}><RiMailFill className="mr-2 h-5 w-5"/>&nbsp;<span className="gap-4">Send a mail</span></Button></a>
          </div>
          <div className="flex flex-wrap gap-3 justify-center my-10 space-y-3">
              {
                partnerData.map((partner: any, index: number) => {
                  return (
                    <div className="max-w-sm" key={index}>
                      <Card imgSrc={partner?.partner_card_image || ""} imgAlt={partner.partner}>
                        <div className="justify-center mx-auto">
                        <Link href={partner.partner_link}>
                          <div className="hover:cursor-pointer">
                            <Avatar
                              img={partner.partner_logo}
                              size="lg"
                            />
                          </div>
                        </Link>
                        </div>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {partner.partner}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                          {partner.partner_description}
                        </p>
                        <Link href={partner.partner_link}>
                        <Button>
                          Visit website
                          <svg
                            className="ml-2 -mr-1 h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Button>
                        </Link>
                      </Card>
                    </div>
                  )
                })
              }
            </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export async function getStaticProps(context: any) {

  const partner = await fetch(`${server}/api/partners`).then(res => res.json());
  
  return {
      props: {
          partnerData: JSON.parse(JSON.stringify(partner)),
      },
      revalidate: 3600
  }
}