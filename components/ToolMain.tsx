import { Avatar, Badge, Button, Carousel, Spinner } from "flowbite-react";
import Link from "next/link";
import { MDXRemote } from 'next-mdx-remote'
import { Suspense } from "react";
import { FaExclamationCircle, FaGithub, FaLink, FaStar, FaTwitter } from "react-icons/fa";
import { RiFilePaper2Fill } from "react-icons/ri";
import { CgGitFork } from "react-icons/cg";
import EmbeddedSearchbar from "./EmbeddedSearchbar";
import Image from "next/image";
import ImageNotLoaded from "../assets/ImageNotLoaded.png";

export default function ToolMain(props: any) {

    console.log(props.githubInfo)

    // Show the tool page depending on the id of the tool
    return (
      <section className="text-white-900 body-font static">
        <div className="container static flex flex-wrap flex-col max-w-5xl mx-auto pt-40 pb-6 p-5">
          <EmbeddedSearchbar />
        </div>
        <div className="flex flex-wrap flex-col md:flex-row max-w-5xl mx-auto pb-12 p-5">
          <div className="basis-2/3 divide-y divide-white-200 md:pr-5 mb-5">
            <div id="toolData" className="flex gap-2">
              <div className="flex-none">
                <Image src={props.toolData.logo} className="flex-1 rounded-lg" width={"96px"} height={"96px"} alt={`Logo of ${props.toolData.tool_name}`} />
              </div>
              <div className="flex-1">
                <h1 className="text-5xl text-left font-4 lh-6 ld-04 font-bold text-white mb-5">
                  {props.toolData.tool_name}
                </h1>
                <div className="flex flex-wrap gap-2 pb-5">
                  {
                    props.toolData.tool_categories.map((category: any, index: number) => {
                      return (
                        <Badge
                          color="blue"
                          size="sm"
                          key={index}
                          href={`/category/${category.categories.id}`}
                        >
                            {category.categories.category_icon} {category.categories.category_name}
                        </Badge>
                      ) 
                    })
                  }
                </div>
              </div>
            </div>
            {
              props.githubInfo ? (
                <div className="pt-2">
                  <div className="flex bg-white text-center rounded-lg flex-wrap gap-2 p-2">
                    <div className="md:flex-auto mx-auto">
                      <p><FaStar className="inline align-text-top" color="orange" /> {props.githubInfo.stargazers_count} Stars</p>
                    </div>
                    <div className="md:flex-auto mx-auto">
                      <p><a className="hover:pointer ease-in-out duration-300 hover:text-sky-500 text-sky-600 font-semibold" href={`https://github.com/${props.githubInfo.full_name}/issues`} target="_blank" rel="noreferrer"><FaExclamationCircle className="inline align-text-top" color="black" /> {props.githubInfo.open_issues_count} open issues</a></p>
                    </div>
                    <div className="md:flex-auto mx-auto">
                      <p><CgGitFork className="inline align-text-top" color="black" /> {props.githubInfo.forks} forks</p>
                    </div>
                    <div className="md:flex-auto mx-auto">
                      <p><RiFilePaper2Fill className="inline align-text-top" color="black" /> {props.githubInfo.license.name}</p>
                    </div>
                  </div>
                </div>
              ) : null
            }
            <div id="tool_images" className="my-2 py-3">
              <Suspense fallback={<div className="text-center"><Spinner aria-label="Loading Tool Table" size='xl' /></div>}>
                <Carousel slideInterval={5000} slide={true}>
                  {
                    props.toolData.tool_images.length > 0 ? (
                      props.toolData.tool_images.map((image: any, index: number) => {
                        return (
                          <div key={index} className="flex w-full h-full bg-white/30">
                            <Image
                              className="rounded-lg w-full"
                              src={image.image_link}
                              layout="fill"
                              objectFit="contain"
                              onError={(e: any) => { e.target.src = ImageNotLoaded }}
                              alt={props.toolData.tool_name}
                            />
                          </div>
                        )
                      })
                    ) : (
                      <div className="flex h-full w-full rounded-lg bg-white/30">
                        <Image 
                          className="rounded-lg"
                          layout="fill"
                          objectFit="contain"
                          src="https://dummyimage.com/16:9x720/f0f0f0/000000.png&text=Currently+there+are+no+images.+Please+submit+some+via+an+issue+on+GitHub."
                          alt="No image for this tool."
                        />
                      </div>
                    )
                  }
                  <div className="flex h-full w-full rounded-lg bg-white/30">
                    <Image 
                      className="rounded-lg"
                      layout="fill"
                      objectFit="contain"
                      src="https://dummyimage.com/16:9x720/f0f0f0/000000.png&text=Submit+new+images+with+an+issue+on+GitHub."
                      alt="No image for this tool."
                      key={9999}
                    />
                  </div>
                </Carousel>
              </Suspense>
            </div>
            <div id="tool_detailed_description" className="bg-white px-5 pb-5 rounded-lg">
              {
                props.toolDetailedDescription !== "" ? (
                  <p className="text-left text-black justify prose prose-headings:text-black prose-img:rounded-lg prose-a:text-blue-600 hover:prose-a:text-cyan-600 mt-3">
                    <MDXRemote {...props.toolDetailedDescription}></MDXRemote>
                  </p>
                ) : (
                  <>
                    <p className="text-left text-black leading-relaxed justify prose prose-headings:text-white prose-a:text-blue-600 hover:prose-a:text-cyan-600 mt-3">
                      A detailed description of the tool is currently missing.<br /> Update the tool data with a new issue on GitHub.
                    </p>
                    <Link href="https://github.com/julianyaman/tooldb/issues" target={"_blank"}>
                      <Button color="light" className="min-w-full mt-3">
                        <FaGithub />&nbsp;
                        Submit an issue on tooldb
                      </Button>
                    </Link>
                  </>
                )
              }
            </div>
          </div>
          <div className="basis-1/3">
            <div className="bg-white p-5 rounded-lg">
              <p className="text-lg font-bold pb-3">About the tool:</p>
              <p className="font-4 pb-3">
                {props.toolData.tool_description}
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-lg font-bold pb-3">
                    Submitted by:
                    <Badge
                      size='xs'
                      color='red'
                      href={`https://github.com/${props.toolData.submitted_by}`}>
                          <Avatar
                              img={`https://avatars.githubusercontent.com/${props.toolData.submitted_by}`}
                              size="xs"
                              rounded={true}
                          >
                              <div className="space-y-1 font-medium dark:text-white">
                                  <div>
                                      {props.toolData.submitted_by}
                                  </div>
                              </div>
                          </Avatar>
                      </Badge>
                  </p>
                  <p className="text-gray-500 pb-3">
                    Added on: {new Date(props.toolData.created_at).toLocaleString()}
                  </p>
                </div>
                <Link href={props.toolData.tool_link} target={"_blank"}>
                  <Button gradientMonochrome="green" className="min-w-full">
                    <FaLink />&nbsp;
                    Website
                  </Button>
                </Link>
                {
                  props.toolData.github_repo ? 
                  <Link href={props.toolData.github_repo} target={"_blank"}>
                    <Button color="light" className="min-w-full">
                      <FaGithub />&nbsp;
                      GitHub Repository
                    </Button>
                  </Link> : null
                }
                {
                    props.toolData.twitter_link ? 
                    <Link href={props.toolData.twitter_link} target={"_blank"}>
                      <Button gradientMonochrome="blue" className="min-w-full">
                        <FaTwitter />&nbsp;
                        Twitter
                      </Button>
                    </Link> : null
                  }
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

