import { Avatar, Badge, Button, Table, Tooltip } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
import { FaDiscord, FaGithub, FaLink, FaStar, FaTwitter } from "react-icons/fa";
import EmbeddedSearchbar from "./EmbeddedSearchbar";
import ToolTableRow from "./ToolTableRow";

export default function CategoryMain(props: any) {

    // Show the tool page depending on the id of the tool
    return (
      <section className="text-white-900 body-font">
        <div className="container flex flex-wrap flex-col max-w-6xl mx-auto pt-40 pb-6 p-5">
          <EmbeddedSearchbar />
        </div>
        <div className="flex flex-wrap flex-col md:flex-row max-w-6xl mx-auto p-5">
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
        <div className="max-w-6xl mx-auto p-5">
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
                                    <ToolTableRow key={tool.tools.id} row={tool.tools} showSubmittedBy={true} />
                                  )
                              })
                          }
                  </Table.Body>
              </Table>
            </div>
      </section>
    );
}

