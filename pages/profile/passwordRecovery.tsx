import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { NextSeo } from "next-seo";
import Script from "next/script";
import { useEffect, useState } from "react";
import { supabase } from "../../util/supabase";
import { Alert, Button, TextInput } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";

export default function PasswordRecovery(props: any) {

    const initialPasswordRecovery = Object.freeze({
        newPassword: "",
        newRepeatPassword: ""
    });

    const [passwordRecoveryData, updatePasswordRecoveryData] = useState(initialPasswordRecovery);
    const [submitted, setSubmitted] = useState(true);
    const [userData, setUserData] : any = useState({});
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {

        const hashValues = window.location.hash.substring(1).split("&").map((param) => param.split("="));

        let type;
        let accessToken;

        for (const [key, value] of hashValues) {
            if (key === "type") {
                type = value;
            } else if (key === "access_token") {
                accessToken = value;
            }
        }

        console.log(type, accessToken);
        console.log(hashValues)

        if (type !== "recovery" || !accessToken || typeof accessToken === "object") {
            toast.error("Invalid credentials. Redirecting to homepage", {
                duration: 2000
            });
            setTimeout(() => {
                window.location.href = "/";
            }, 100000);
            return;
        }

        setAccessToken(accessToken);

        const data = supabase.auth.api.getUser(
            accessToken,
        ).then((user) => {
            setUserData(user);
            if(user?.user?.app_metadata.provider === "github"){
                toast.error("Github users cannot change their password. Redirecting to homepage", {
                    duration: 2000
                });
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
                return;
            }else{
                setSubmitted(false);
                return;
            }
        }).catch((error) => {
            toast.error("An error occured. Redirecting to homepage", {
                duration: 2000
            });
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
            return;
        })

    }, []);

    const handleChange = (e:any) => {
        updatePasswordRecoveryData({
            ...passwordRecoveryData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        const notification = toast.loading("Changing password");

        setSubmitted(true);

        try {
            if (passwordRecoveryData.newPassword !== passwordRecoveryData.newRepeatPassword) {
                toast.error("Passwords do not match", {id: notification, duration: 2000});
                return;
            }

            const { error } = await supabase.auth.api.updateUser(accessToken, { password : passwordRecoveryData.newPassword })

            if (error) {
                toast.error(error.message, {
                    id: notification,
                    duration: 2000
                });
            } else if (!error) {
                toast.success("Password successfully changed. Redirecting to homepage", {
                    id: notification,
                    duration: 2000,
                });
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            }

        } catch (error) {
            toast.error("An error occured. Please request another password recovery attempt. You will be redirected", {
                id: notification,
                duration: 2000
            });
            setTimeout(() => {
                window.location.href = "/";
            }, 4000);
        }
    }
    return (
    <div>
        <NextSeo
            title="🔎  tooldb - Reset your password"
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
                            Password Recovery
                    </h1>
                    <div className="p-5 bg-white rounded-lg flex flex-wrap">
                        <form className="basis-1/2 mx-auto flex flex-col gap-4 p-5">
                            <h2 className="text-3xl font-bold text-left text-black">Password</h2>
                            <div>
                                <div className="mb-2 block">
                                <label
                                    htmlFor="newPassword"
                                >Your new password</label>
                                </div>
                                <TextInput
                                    id="newPassword"
                                    type="password"
                                    name={"newPassword"}
                                    required={true}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                <label
                                    htmlFor="newRepeatPassword"
                                >Repeat your new password</label>
                                </div>
                                <TextInput
                                    id="newRepeatPassword"
                                    type="password"
                                    name="newRepeatPassword"
                                    onChange={handleChange}
                                    required={true}
                                />
                            </div>
                            {                  
                                !submitted ? (
                                    <Button type="submit" onClick={handleSubmit}>
                                        Change password
                                    </Button>
                                ) : (
                                    null
                                )        
                            }
                        </form>
                    </div>
                </div>
            </section>
        <Footer />
    </div>
    );
}