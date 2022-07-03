import { Avatar, Badge, Button, Carousel, Modal, Spinner, Tooltip } from "flowbite-react";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { FaArrowUp, FaDiscord, FaExclamationCircle, FaGithub, FaLink, FaRegTimesCircle, FaStar, FaTwitter } from "react-icons/fa";
import { RiFilePaper2Fill } from "react-icons/ri";
import { CgGitFork } from "react-icons/cg";
import EmbeddedSearchbar from "./EmbeddedSearchbar";
import Image from "next/image";
import ImageNotLoaded from "../assets/ImageNotLoaded.png";
import Vibrant from "node-vibrant"
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Toaster } from "react-hot-toast";
import axios from "axios";
import useSWR from 'swr';

const fetcher = (url:any) => axios.get(url).then(res => res.data)

export default function ToolMain(props: any) {

    const [vibrantColors, setVibrantColors] = useState<string[]>([]);
    const [modals, setModal] = useState<boolean[]>([]);
    const [toolVotes, setVotes] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [isVoted, setIsVoted] = useState(false);
    const userInfo = props.userInfo

    const { data: votes, error: voteCountError }: any = useSWR(`/api/getVotes/${props.toolData.id}`, fetcher)

    useEffect(() => {
      if(votes){
          if(userInfo){
              axios.get(`/api/tools/vote?id=${props.toolData.id}`).then(res => {
                  if(res.data.voted){
                      setIsVoted(true)
                      setVotes(votes.votes)
                      setIsLoading(false)
                  }else{
                      setIsVoted(false)
                      setVotes(votes.votes)
                      setIsLoading(false)
                  }
              }).catch(err => {
                  console.log(err)
                  setVotes(votes.votes)
                  setIsLoading(false)
              })
          }else{
              setVotes(votes.votes)
              setIsLoading(false)
          }
      }
  }, [votes, userInfo, props.toolData.id])

    async function handleVote (e:any) {
      if(votes && userInfo && !isLoading && !voteCountError){
          const oldVotes = toolVotes
          if(isVoted){
              try {
                  setVotes(toolVotes - 1)
                  setIsVoted(false)
                  const removeVote = axios.post(`/api/tools/vote?id=${props.toolData.id}`, {
                      userId: userInfo.id,
                  })
                  props.notifications.voteRemoved(removeVote);
              } catch (error) {
                  setVotes(oldVotes)
                  props.notifications.voteError();
              }
          }else{
              try {
                  setVotes(toolVotes + 1)
                  setIsVoted(true)
                  const addVote = axios.post(`/api/tools/vote?id=${props.toolData.id}`, {
                      userId: userInfo.id,
                  })
                  props.notifications.voteAdded(addVote);
              } catch (error) {
                  setVotes(oldVotes)
                  props.notifications.voteError();
              }
          }
      }else{
          props.notifications.noLoginVote();
      }
  }

    // Show the tool page depending on the id of the tool
    return (
      <section className="text-white-900 body-font static">
        <Toaster />
        <div className="container static flex flex-wrap flex-col max-w-6xl mx-auto pt-40 pb-6 p-5">
          <EmbeddedSearchbar />
        </div>
        <div className="flex flex-wrap flex-col md:flex-row max-w-6xl mx-auto pb-12 p-5">
          <div className="basis-2/3 divide-y divide-white-200 md:pr-5 mb-2">
            <div id="toolData" className="flex gap-2">
              <div className="flex-none">
                <Image src={props.toolData.logo} className="flex-1 rounded-lg bg-white/20" width={"96px"} height={"96px"} alt={`Logo of ${props.toolData.tool_name}`} />
              </div>
              <div className="flex-1">
                <h1 className="text-5xl text-left font-4 lh-6 font-bold text-white mb-5">
                  {props.toolData.tool_name}
                  <Button size="xl" className="float-right" outline={!isVoted} gradientDuoTone="pinkToOrange" onClick={handleVote} data-votes={votes ? toolVotes : 0}>
                        <FaArrowUp className="mr-1 h-4 w-4 pointer-events-none" />
                        <span className='pointer-events-none'>{voteCountError ? <FaRegTimesCircle /> : votes && !isLoading ? toolVotes : <Spinner size="sm" color='red' aria-label="Default status example" />}</span>
                  </Button>
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
            <div id="tool_images" className="my-2 py-3">
              <Suspense fallback={<div className="text-center"><Spinner aria-label="Loading Tool Table" size='xl' /></div>}>
                <Carousel slideInterval={5000} slide={true}>
                  {
                    
                    props.toolData.tool_images.length > 0 ? (
                      props.toolData.tool_images.map((image: any, index: number) => {
                        return (
                          <div key={index} className="flex w-full h-full" style={{backgroundColor: vibrantColors[index] || "rgba(255,255,255,0.3)"}}>
                            <Modal
                              show={modals[index]}
                              onClose={() => {
                                let modifiedArray = [...modals];
                                modifiedArray[index] = false
                                setModal(modifiedArray);
                              }}
                              size="5xl"
                            >
                              <Modal.Header>
                                Image {index + 1}
                              </Modal.Header>
                              <Modal.Body>
                                <div className="h-[36rem] relative rounded-lg" style={{backgroundColor: vibrantColors[index] || "rgba(255,255,255,0.3)"}}>
                                  <Image 
                                    src={image.image_link}
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-lg"
                                    alt={`Image of ${props.toolData.tool_name}`}
                                  />
                                </div>
                              </Modal.Body>
                              <Modal.Footer>
                                Image owner: {props.toolData.tool_name}
                              </Modal.Footer>
                            </Modal>
                            <Image
                              className="rounded-lg w-full"
                              src={image.image_link}
                              layout="fill"
                              data-key={index}
                              onLoadingComplete={async (e) => {
                                Vibrant.from(image.image_link).getPalette().then(p => {
                                  setModal(prevState => {
                                    let newState = [...prevState]
                                    newState[index] = false
                                    return newState
                                  })
                                  setVibrantColors(prevState => {
                                    // Thanks to @taubi19 on https://stackoverflow.com/questions/60754088/how-to-update-a-state-array-multiple-times-faster-than-the-setstate-without-over
                                    let newState = [...prevState];
                                    newState[index] = p.Vibrant?.getHex() ?? "rgba(255,255,255,0.5)";
                                    return newState;
                                  })
                                })
                              }}
                              onClick={(e) => {
                                let modifiedArray = [...modals]
                                modifiedArray[index] = true;
                                setModal(modifiedArray);
                              }}
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
                  <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]} className="text-left text-black justify prose prose-headings:text-black prose-img:rounded-lg prose-a:text-blue-600 hover:prose-a:text-cyan-600 mt-3 mx-auto">{props.toolDetailedDescription}</ReactMarkdown>
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
          <div className="basis-1/3 space-y-2">
          {
              props.githubInfo ? (
                <div className="bg-white rounded-lg p-5">
                  <p className="text-lg font-bold pb-3 flex"><FaGithub className="my-1"/>&nbsp;GitHub Stats:</p>
                  <div className="flex flex-wrap gap-2">
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
                      <p><RiFilePaper2Fill className="inline align-text-top" color="black" /> {props.githubInfo?.license?.name || "No license"}</p>
                    </div>
                  </div>
                </div>
              ) : null
            }
            <div className="bg-white p-5 rounded-lg">
              <p className="text-lg font-bold pb-3">About the tool:</p>
              <p className="font-4 pb-3">
                {props.toolData.tool_description}
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-lg font-bold pb-3">
                    
                    {
                      props.toolData.submitted_by_type === "partner" ? (
                        
                        <div className="w-full mt-1">
                          <span>Brought to you by:</span>
                          <Badge
                          color={"green"}
                          // @ts-ignore
                          size="md"
                          icon={FaStar}
                          href={props.toolData.collaboration_partners.partner_link}
                          >
                            <Tooltip
                                content={`About ${props.toolData.collaboration_partners.partner}: ${props.toolData.collaboration_partners.partner_description}`}
                                placement="top"
                            >
                              <div className='flex justify-center items-center font-medium dark:text-white w-full p-1'>
                              {
                                  props.toolData.collaboration_partners.partner_logo ? (
                                          <Avatar
                                              img={props.toolData.collaboration_partners.partner_logo}
                                              size="sm"
                                              rounded={true}
                                          />
                                          
                                  ) : null
                              }
                              <span className='ml-1 font-bold'>{props.toolData.collaboration_partners.partner}</span>
                              </div>
                            </Tooltip>
                          </Badge>
                        </div>
                      ) : (
                        <div>
                          <span>Submitted by:</span>
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
                        </div>
                      )
                    }
                  </p>
                  <p className="text-gray-500 pb-3">
                    Added on: {new Date(props.toolData.created_at).toLocaleString()}
                  </p>
                </div>
                <Link href={props.toolData.tool_link} target={"_blank"} rel="noreferrer">
                  <Button color="green" className="min-w-full">
                    <FaLink />&nbsp;
                    Website
                  </Button>
                </Link>
                {
                  props.toolData.github_repo ? 
                  <Link href={props.toolData.github_repo} target={"_blank"} rel="noreferrer">
                    <Button color="light" className="min-w-full">
                      <FaGithub />&nbsp;
                      GitHub Repository
                    </Button>
                  </Link> : null
                }
                {
                    props.toolData.twitter_link ? 
                    <Link href={props.toolData.twitter_link} target={"_blank"} rel="noreferrer">
                      <Button gradientMonochrome="blue" className="min-w-full">
                        <FaTwitter />&nbsp;
                        Twitter
                      </Button>
                    </Link> : null
                  }
                  {
                    props.toolData.discord_link ? 
                    <Link href={props.toolData.discord_link} target={"_blank"} rel="noreferrer">
                      <Button gradientMonochrome="purple" className="min-w-full">
                        <FaDiscord />&nbsp;
                        Discord
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

