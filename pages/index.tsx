import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { NextSeo } from "next-seo";
import Script from "next/script";
import axios from "axios";
import useSWR from "swr";
import { Progress } from "flowbite-react";

const fetcher = (url:any) => axios.get(url).then(res => res.data)

export default function Home(props: any) {

  const { data: standardData, error: standardError }: any = useSWR('/api/getEntries?get=standard', fetcher)
  const { data: recentlyAddedData, error: recentlyAddedError }: any = useSWR('/api/getEntries?get=recentlyAdded', fetcher)
  const { data: categoriesData, error: categoriesError }: any = useSWR('/api/getEntries?get=categories', fetcher)

  if (!standardData ) return (
    <div className="mx-auto max-w-5xl p-5 text-white">
      <Progress
        progress={33}
        size="md"
        label="Loading tooldb..."
        labelPosition="outside"
        labelProgress={true}
      />
    </div>
  );
  if (!recentlyAddedData ) return (
    <div className="mx-auto max-w-5xl p-5 text-white">
      <Progress
        progress={66}
        size="md"
        label="Loading tooldb..."
        labelPosition="outside"
        labelProgress={true}
      />
    </div>
  );
  if (!categoriesData ) return (
    <div className="mx-auto max-w-5xl p-5 text-white">
      <Progress
        progress={100}
        size="md"
        label="Loading tooldb..."
        labelPosition="outside"
        labelProgress={true}
      />
    </div>
  );

  if (standardError || recentlyAddedError || categoriesError){
    return (
      <div className="mx-auto max-w-5xl text-white">
        <Progress
          progress={100}
          size="md"
          color="red"
          label="An error occurred while loading tooldb"
          labelPosition="outside"
          labelProgress={true}
        />
      </div>
    );
  }

  const tablePreviewData = {firstTools: standardData, recentlyAddedData}

  return (
    <div>
      <NextSeo
        title="tooldb"
        description="Search the tool you need for your project"
        canonical="https://tooldb.dev/"
        openGraph={{
          url: "https://tooldb.dev/",
        }}
      />
      <Head>
        <title>tooldb</title>
        <link rel="icon" href="/favicon.png" />
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
      <Main tablePreviewData={tablePreviewData} categories={categoriesData}/>
      <Footer />
    </div>
  );
}