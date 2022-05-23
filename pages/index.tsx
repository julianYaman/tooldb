import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { NextSeo } from "next-seo";
import { PrismaClient } from "@prisma/client";
import Script from "next/script";

const prisma = new PrismaClient()

export default function Home(props: any) {

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
      <Main tablePreviewData={props.tablePreviewData} categories={props.categories}/>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: any) {

  const tools = await prisma.tools.findMany({
    select: {
      id: true,
      tool_name: true,
      submitted_by: true,
      tool_link: true,
      logo: true,
      github_repo: true,
      twitter_link: true,
      tool_categories: {
        select: {
          categories: {
            select: {
              id: true,
              category_name: true,
              category_icon: true
            }
          }
        }
      },
    },
    take: 10,
  });

  const categories = await prisma.categories.findMany({
    select: {
      id: true,
      category_name: true,
      category_icon: true,
      category_description: true,
    }
  });

  const recentlyAdded = await prisma.tools.findMany({
    select: {
      id: true,
      tool_name: true,
      submitted_by: true,
      tool_link: true,
      logo: true,
      github_repo: true,
      twitter_link: true,
      tool_categories: {
        select: {
          categories: {
            select: {
              id: true,
              category_name: true,
              category_icon: true
            }
          }
        }
      },
    },
    take: 10,
    orderBy: {
      created_at: "desc"
    }
  });

  console.log(tools)

  return {
    props: {
      tablePreviewData: {firstTools: tools, recentlyAdded},
      categories: categories
    }
  }
}