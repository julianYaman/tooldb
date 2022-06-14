import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { NextSeo } from "next-seo";
import Script from "next/script";

export default function Home(props: any) {
  
  return (
    <div>
      <NextSeo
        title="🔎  tooldb"
        description="Search the tool you need for your project"
        canonical="https://tooldb.dev/"
        openGraph={{
            url: `https://tooldb.dev`,
            title: `🔎  tooldb`,
            description: `Search the tool you need to build your new application. tooldb is a (soon) massive collection of frameworks and tools.`,
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
      <Main />
      <Footer />
    </div>
  );
}