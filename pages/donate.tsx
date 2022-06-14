import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NextSeo } from "next-seo";
import Script from "next/script";
import DonatedPeople from "../components/DonatedPeople";
import Link from "next/link";
import { Button } from "flowbite-react";
import { FaGithub, FaPaypal } from "react-icons/fa";
import { SiBunq, SiBuymeacoffee } from "react-icons/si";

export default function Donate() {
  return (
    <div className="text-black">
      <NextSeo
        title="🔎  tooldb - Donate"
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
                  Donate
            </h1>
            <p className="text-lg font-4 pb-10 text-white leading-relaxed">
              tooldb.dev is a free, open-source project. Donations help to cover the costs of hosting and maintaining the project.
              Currently, we cannot offer any perks for donating, but they will be added in the future. Everyone who donated will be listed here.
            </p>
          </div>
          <div>
            <h2 className="text-2xl text-center font-bold lh-6 ld-04 pb-3 text-white">
              You can donate here
            </h2>
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              <div className="flex-auto w-full md:w-auto md:flex-1">
                <Link href={"https://github.com/julianyaman/sponsors"} target={"_blank"}>
                    <Button color="light" className="min-w-full">
                      <FaGithub />&nbsp;
                      GitHub Sponsors
                    </Button>
                </Link>
              </div>
              <div className="flex-auto w-full md:w-auto md:flex-1">
                <Link href={"https://github.com/julianyaman/sponsors"} target={"_blank"}>
                    <Button color="yellow" className="min-w-full">
                      <SiBuymeacoffee />&nbsp;
                      Buy Me A Coffee
                    </Button>
                </Link>
              </div>
              <div className="flex-auto w-full md:w-auto md:flex-1">
                <Link href={"https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=SJHABMNBYCTBC&source=url"} target={"_blank"}>
                    <Button color="blue" className="min-w-full">
                      <FaPaypal />&nbsp;
                      PayPal
                    </Button>
                </Link>
              </div>
              <div className="flex-auto w-full md:w-auto md:flex-1">
                <Link href={"https://bunq.me/yaman"} target={"_blank"}>
                    <Button color="red" className="min-w-full">
                      <SiBunq />&nbsp;
                      bunq
                    </Button>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl text-center font-bold lh-6 ld-04 pb-3 text-white">
              Thanks to everyone who donated!
            </h2>
            <div className="mx-auto text-white text-center">
              <DonatedPeople/>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}