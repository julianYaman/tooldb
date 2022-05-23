import Head from "next/head";
import Header from "../../components/Header";
import CategoryMain from "../../components/CategoryMain";
import Footer from "../../components/Footer";
import { NextSeo } from "next-seo";
import { useRouter } from 'next/router'
import { PrismaClient } from "@prisma/client";
import Script from "next/script";

const prisma = new PrismaClient();

export default function ToolPage(props: any) {

    const router = useRouter()
    const {id} = router.query

    return (
        <div className="text-black">
        <NextSeo
            title={`${props.categoryData.category_name} - tooldb`}
            description={`${props.categoryData.category_description}`}
            canonical={`https://tooldb.dev/category/${id}`}
            openGraph={{
                url: `https://tooldb.dev/category/${id}`,
            }}
        />
        <Head>
            <title>{props.categoryData.category_name} - tooldb</title>
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
            props.categoryResults.length > 0 ?
            <CategoryMain categoryResults={props.categoryResults} categoryData={props.categoryData} /> :
            (
            <section className="text-white-900 body-font">
                <div className="container flex flex-wrap flex-col max-w-5xl mx-auto pt-48 pb-6 p-5">
                <div id="categoryData">
                    <h1 className="text-5xl text-left font-4 lh-6 ld-04 font-bold text-white mb-5">
                        Sorry, no results found.<br />
                        You can add tools to this category by submitting an issue on GitHub.
                    </h1>
                </div>
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

    const categoryTools = await prisma.tool_categories.findMany({
        where: {
            category_id: parseInt(id)
        },
        include: {
            tools: true,
        },
    });

    const categoryData = await prisma.categories.findUnique({
        where: {
            id: parseInt(id)
        },
        select: {
            id: true,
            category_name: true,
            category_icon: true,
            category_description: true
        }
    });

    return {
        props: {
            categoryData, 
            categoryResults: JSON.parse(JSON.stringify(categoryTools))
        }
    }
}