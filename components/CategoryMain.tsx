import { Avatar, Badge, Button, Table } from "flowbite-react";
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
              <Table striped={true} className="whitespace-nowrap md:whitespace-normal" >
                  <Table.Head>
                      <Table.HeadCell className='px-4 md:px-6'>
                      Tool name
                      </Table.HeadCell>
                      <Table.HeadCell className='px-3 md:px-6'>
                      Links
                      </Table.HeadCell>
                      <Table.HeadCell className='hidden sm:table-cell'>
                      Submitted by
                      </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                      {
                            props.categoryResults.map((tool: any, index: number) => {
                                  return (
                                      <Table.Row key={index}>
                                          <Table.Cell className='px-4 md:px-6'>
                                              <Link href={`/tool/${encodeURIComponent(tool.tools.id)}`}>
                                                  <a className='text-blue-600 hover:text-cyan-600'>
                                                      <img src={`${tool.tools.logo}`} alt={`Logo of ${tool.tools.tool_name}`} width="28px" height="28px" className='inline mr-1 rounded-lg' />
                                                      <span>{tool.tools.tool_name}</span>
                                                  </a>
                                              </Link>
                                          </Table.Cell>
                                          <Table.Cell className='px-3 md:px-6'>
                                            <div className="flex flex-wrap gap-2">
                                                <Link href={tool.tools.tool_link}>
                                                  <Button size="sm" gradientMonochrome="green" className="flex-auto md:w-auto">
                                                    <FaLink />
                                                    <span className="hidden md:block">Website</span>
                                                  </Button>
                                                </Link>
                                              {
                                                  tool.tools.github_repo ? (
                                                    <Link href={tool.tools.github_repo}>
                                                      <Button size="sm" color="light" className="flex-auto md:w-auto">
                                                        <FaGithub />
                                                        <span className="hidden md:block">GitHub Repository</span>
                                                      </Button>
                                                    </Link>
                                                  ) : null
                                              }
                                              {
                                                  tool.tools.twitter_link ? (
                                                    <Link href={tool.tools.twitter_link}>
                                                      <Button size="sm" gradientMonochrome="blue" className="flex-auto md:w-auto">
                                                        <FaTwitter />
                                                        <span className="hidden md:block">Twitter</span>
                                                      </Button>
                                                    </Link>
                                                  ) : null
                                              }
                                              </div>
                                          </Table.Cell>
                                          <Table.Cell className='hidden sm:table-cell px-3 md:px-6'>
                                          {
                                              tool.tools.submitted_by ? (
                                                  <Badge
                                                  size='xs'
                                                  color='red'
                                                  href={`https://github.com/${tool.tools.submitted_by}`}>
                                                      <Avatar
                                                          img={`https://avatars.githubusercontent.com/${tool.tools.submitted_by}`}
                                                          size="xs"
                                                          rounded={true}
                                                      >
                                                          <div className="space-y-1 font-medium dark:text-white">
                                                              <div>
                                                                  {tool.tools.submitted_by}
                                                              </div>
                                                          </div>
                                                      </Avatar>
                                                  </Badge>
                                                  
                                              ) : <p>No data</p>
                                          }
                                          </Table.Cell>
                                      </Table.Row>
                                  )
                              })
                          }
                  </Table.Body>
              </Table>
            </div>
      </section>
    );
}

