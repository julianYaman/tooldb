import Head from "next/head";
import Header from "../../components/Header";
import ToolMain from "../../components/ToolMain";
import Footer from "../../components/Footer";
import { NextSeo } from "next-seo";
import { useRouter } from 'next/router'
import { serialize } from 'next-mdx-remote/serialize'
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import Script from "next/script";
import { server } from '../../config'


export default function ToolPage(props: any) {

    const router = useRouter()
    const { id, isFallback } = router.query

    const [isSSR, setIsSSR] = useState(true);

    useEffect(() => {
        setIsSSR(false);
    }, []);

    if(isFallback){
        return (
            <div className="mx-auto max-w-5xl text-white bg-white p-5">
                <div className="text-center">
                    <Spinner size="lg" color="purple"/>
                </div>
            </div>
        );
    }

    return (
        <div className="text-black">
        <NextSeo
            title={`${props.toolData?.tool_name || "🤔 404"} - tooldb`}
            description={`${props.toolData?.tool_description || "Not found"}`}
            canonical={`https://tooldb.dev/tool/${id}`}
            openGraph={{
                url: `https://tooldb.dev/tool/${id}`,
                title: `${props.toolData?.tool_name || "🤔 404"} - tooldb`,
                description: `${props.toolData?.tool_description || "Sorry, this tool doesn't exist"}`,
                images: [
                    {
                        url: `${props.toolData.logo || "https://qrukfpaygglwznencwsz.supabase.co/storage/v1/object/public/tool-images/tooldb/logo-with-icon.png"}`,
                        alt: `Tool logo of ${props.toolData.tool_name}`,
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
        {
            props.toolData && props?.toolData.isVerified ?
            ( !isSSR && <Suspense fallback={<div className="text-center"><Spinner aria-label="Loading Tool" size='xl' /></div>}>
                <ToolMain toolData={props.toolData} toolDetailedDescription={props.toolDetailedDescription} githubInfo={props.githubInfo} /> 
            </Suspense>):
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

export async function getStaticProps(context: any) {

    const id = context.params.id;

    const tool = await fetch(`${server}/api/tools/${id}`).then(res => res.json());

    const toolDetailedDescription = tool?.tool_detailed_description ? await serialize(tool.tool_detailed_description) : ""

    let githubInfo = null

    if(tool.github_repo){
        
        // Parse the github username and the repo and remove the url parts
        const githubUsername = tool.github_repo.split("/")[3]
        const githubRepo = tool.github_repo.split("/")[4]

        // Get the github info
        githubInfo = await fetch(`https://api.github.com/repos/${githubUsername}/${githubRepo}`).then((res) => {
            if(!res.ok){
                return null
            }
            return res.json()
        })
    }

    
    return {
        props: {
            toolData: JSON.parse(JSON.stringify(tool)),
            toolDetailedDescription,
            githubInfo
        },
        revalidate: 600
    }
}

export async function getStaticPaths() {
    const res = await fetch(`${server}/api/tools/ids`)
    const tools = await res.json()

    if (!res.ok) {
        // If there is a server error, you might want to
        // throw an error instead of returning so that the cache is not updated
        // until the next successful request.
        throw new Error(`Failed to fetch tools, received status ${res.status}`)
    }
    

    // Get the paths we want to pre-render based on paths
    const paths = tools.map((tool:any) => ({
        params: { id: tool.id.toString() },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' }
}