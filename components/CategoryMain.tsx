import { Button } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLink, FaTwitter } from "react-icons/fa";
import EmbeddedSearchbar from "./EmbeddedSearchbar";

export default function CategoryMain(props: any) {

    // Show the tool page depending on the id of the tool
    return (
      <section className="text-white-900 body-font">
        <div className="container flex flex-wrap flex-col max-w-5xl mx-auto pt-40 pb-6 p-5">
          <EmbeddedSearchbar />
        </div>
        <div className="flex flex-wrap flex-col md:flex-row max-w-5xl mx-auto p-5">
            <div id="categoryData">
              <h1 className="text-5xl text-left font-4 lh-6 ld-04 font-bold text-white mb-5">
                    {props.categoryData.category_icon} {props.categoryData.category_name}
              </h1>
              <h2 className="text-lg font-4 lh-6 ld-04 pb-3 text-white">
                {props.categoryData.category_description}
              </h2>
              <small className="text-white">Result: {props.categoryResults.length} tool(s) found</small>
            </div>
        </div>
        <div className="max-w-5xl mx-auto p-5">
              {
                props.categoryResults.map((tool: any) => {
                  return (
                    <>
                    <div className="flex bg-white/10 mb-3 p-3 items-center" key={tool.tool_id}>
                      <div className="flex-none">
                        <Image src={tool.tools.logo} width={"120px"} height={"120px"} className="rounded-lg" alt={`Logo of ${tool.tools.tool_name}`} />
                      </div>
                      <div className="flex-auto">
                          <div className="p-3 text-white">
                            <h1 className="text-2xl text-left font-4 lh-6 ld-04 font-bold mb-3">
                              <Link href={`/tool/${tool.tool_id}`}><a className="underline">{tool.tools.tool_name}</a></Link>
                            </h1>
                            <h2 className="text-lg font-4 lh-6 ld-04 pb-3 text-justify">
                              {tool.tools.tool_description}
                            </h2>
                          </div>
                      </div>
                      <div className="flex flex-col space-y-3 flex-none pb-2 pt-2 mr-2">
                        <Link href={tool.tools.tool_link} target={"_blank"}>
                          <Button gradientMonochrome="green" className="min-w-full">
                            <FaLink />&nbsp;
                            Website
                          </Button>
                        </Link>
                        {
                          tool.tools.github_repo ? 
                          <Link href={tool.tools.github_repo} target={"_blank"}>
                            <Button color="light" className="min-w-full">
                              <FaGithub />&nbsp;
                              GitHub Repository
                            </Button>
                          </Link> : null
                        }
                        {
                          tool.tools.twitter_link ? 
                          <Link href={tool.tools.twitter_link} target={"_blank"}>
                            <Button gradientMonochrome="blue" className="min-w-full">
                              <FaTwitter />&nbsp;
                              Twitter
                            </Button>
                          </Link> : null
                        }
                      </div>
                    </div>
                    </>
                  )
                })
              }
            </div>
      </section>
    );
}

