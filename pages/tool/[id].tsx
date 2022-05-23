import Head from "next/head";
import Header from "../../components/Header";
import ToolMain from "../../components/ToolMain";
import Footer from "../../components/Footer";
import { NextSeo } from "next-seo";
import { useRouter } from 'next/router'
import { PrismaClient } from "@prisma/client";
import { serialize } from 'next-mdx-remote/serialize'
import Image from "next/image";
import { Suspense } from "react";
import { Spinner } from "flowbite-react";
import Script from "next/script";

const prisma = new PrismaClient();

export default function ToolPage(props: any) {

    const router = useRouter()
    const { id } = router.query

    return (
        <div className="text-black">
        <NextSeo
            title={`${props.toolData.tool_name} - tooldb`}
            description={`${props.toolData.tool_description}`}
            canonical={`https://tooldb.dev/category/${id}`}
            openGraph={{
                url: `https://tooldb.dev/category/${id}`,
            }}
        />
        <Head>
            <title>{props.toolData.tool_name} - tooldb</title>
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
        {
            props.toolData ?
            <Suspense fallback={<div className="text-center"><Spinner aria-label="Loading Tool" size='xl' /></div>}>
                <ToolMain toolData={props.toolData} toolDetailedDescription={props.toolDetailedDescription}/> 
            </Suspense>:
            (
            <section className="text-white-900 body-font">
                <div className="container flex w-full max-w-5xl mx-auto pt-48 pb-6 p-5">
                        <Image src="https://http.cat/404" alt="A 404 error message with a cat on it." width={"300px"} height={"300px"}/>
                </div>
            </section>
            )
        }
        <Footer />
        </div>
    );
}

export async function getServerSideProps(context: any) {

    const id = context.query.id

    const tool = await prisma.tools.findUnique({
        select: {
          id: true,
          tool_name: true,
          tool_description: true,
          submitted_by: true,
          tool_link: true,
          github_repo: true,
          twitter_link: true,
          created_at: true,
          logo: true,
          tool_detailed_description: true,
          tool_categories: {
            select: {
              categories: {
                select: {
                  category_name: true,
                  category_icon: true,
                  id: true
                }
              }
            }
          },
          tool_images: {
              select: {
                  image_link: true
              }
          }
        },
        where: {
            id: parseInt(id)
        }
      });

    const toolDetailedDescription = tool?.tool_detailed_description ? await serialize(tool.tool_detailed_description) : ""
    return {
        props: {
            toolData: JSON.parse(JSON.stringify(tool)),
            toolDetailedDescription
        }
    }
}