import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { NextSeo } from "next-seo";
import Script from "next/script";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { supabase } from "../../util/supabase";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Profile(props: any) {

    const { user } = props;

    const supabaseUserData = supabase.auth.user()

    const [supabaseInfo, setSupabaseInfo] = useState({username: "loading..."})
    const [deleteProcess, setDeleteProcess] = useState(0)

    const initialEmailData = Object.freeze({
        newEmail: "",
    });

    const [emailFormData, updateEmailFormData] = useState(initialEmailData);
    const [triggeredPasswordChange, setTriggeredPasswordChange] = useState(false);

    useEffect(() => {      

        if (supabaseUserData) {
            loadData(user)
        }else{
            window.location.href = "/"
        }

        async function loadData(user:any) {
            const { data } : any = await supabase.from('profiles').select('*').eq("user_id", user?.id)
            setSupabaseInfo(data[0])
        }

    }, [supabaseUserData])

    const deleteAccount = async () => {

        const deletion = axios.get("/api/profile/deleteAccount", {
            headers: {
                "Delete-Account": "true"
            }
        })

        toast.promise(deletion, {
            loading: 'Removing account...',
            success: <b>Removed!</b>,
            error: <b>Sorry, an error happened. Please try again later.</b>
        }, {position: "bottom-center", duration: 2000}).then(async (r) => {
            await supabase.auth.signOut()
            window.location.href = "/"
        }).catch((error) => console.error(error))

    }

    const changePassword = async (e:any) => {
        if(!triggeredPasswordChange){
            setTriggeredPasswordChange(true)
            e.preventDefault()
            const { data, error } = await supabase.auth.api.resetPasswordForEmail(user.email)

            if (error) {
                toast.error('Sorry, an unexpected error occured. Please try again later.', {position: "bottom-center", duration: 3000})
            }else{
                console.log(data)
                toast.success('Password reset link sent to your email!', {position: "bottom-center", duration: 3000})
            }

        }else{
            toast.error('You already made a recovery request.', {position: "bottom-center", duration: 3000})
        }
    }

    return (
    <div>
        <NextSeo
            title="🔎  tooldb - Profile Settings"
            description="Edit your profile"
            canonical="https://tooldb.dev/profile/settings"
            openGraph={{
                url: `https://tooldb.dev/profile/settings`,
                title: `🔎  tooldb`,
                description: `Edit your profile.`,
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
        <Toaster />
        <Header />
            <section className="text-white-900 body-font">
                <div className="container flex flex-wrap flex-col max-w-6xl mx-auto pt-48 pb-48 p-5">
                    <h1 className="text-6xl text-left font-4 lh-6 font-bold text-white mb-5">
                            Hello {user.user_metadata.full_name || supabaseInfo.username}{' '}👋
                    </h1>
                    <div className="p-5 bg-white rounded-lg flex flex-wrap">
                        <form className="basis-1/2 flex flex-col gap-4 p-5">
                            <h2 className="text-3xl font-bold text-left text-black">E-Mail</h2>
                            <div>
                                <div className="mb-2 block">
                                <label
                                    htmlFor="email1"
                                >Your current email</label>
                                </div>
                                <TextInput
                                    id="email1"
                                    type="email"
                                    placeholder="name@flowbite.com"
                                    required={true}
                                    value={user.email}
                                    disabled={true}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                <label
                                    htmlFor="newEmail"
                                >Your new email</label>
                                </div>
                                <TextInput
                                    id="newEmail"
                                    type="email"
                                    placeholder="name@flowbite.com"
                                    required={true}
                                    disabled={user.app_metadata.provider === "github"}
                                />
                            </div>
                            {
                                user.app_metadata.provider === "github" ? (
                                    <Alert color="gray">
                                        <span>
                                            You cannot change your settings here, because you are logged in with GitHub.
                                        </span>
                                    </Alert>
                                ) : (
                                    <Button type="submit">
                                        Change email
                                    </Button>
                                )
                            }
                        </form>
                        <div className="basis-1/2 flex flex-col gap-4 p-5">
                            <h2 className="text-3xl font-bold text-left text-black">Password</h2>
                            {
                                user.app_metadata.provider === "github" ? (
                                    <Alert color="gray">
                                        <span>
                                            You cannot change your settings here, because you are logged in with GitHub.
                                        </span>
                                    </Alert>
                                ) : (
                                    <Button type="button" onClick={changePassword}>
                                        Click here to change your password
                                    </Button>
                                )
                            }
                            <h2 className="text-3xl font-bold text-left text-black mt-5">Delete Account</h2>
                            {
                                supabaseUserData ? (
                                    deleteProcess === 0 ? (
                                        <Button type="button" color="red" onClick={() => setDeleteProcess(1)}>Delete your account on toolDB</Button>
                                    ) : (
                                            deleteProcess === 1 ? (
                                                <Button type="button" color="red" onClick={() => setDeleteProcess(2)}>Confirm deletion</Button>
                                            ) : (
                                                <Button type="button" color="red" onClick={() => deleteAccount()}>Confirm deletion finally</Button>
                                            )
                                    )
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </section>
        <Footer />
    </div>
    );
}

export const getServerSideProps = withPageAuth({ redirectTo: '/' });