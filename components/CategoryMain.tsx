import { useUser } from "@supabase/auth-helpers-react";
import { Table } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../util/supabase";
import EmbeddedSearchbar from "./EmbeddedSearchbar";
import ToolTableRow from "./ToolTableRow";

export default function CategoryMain(props: any) {

  const { user, error } = useUser();
  const supabaseCallUser = supabase.auth.user()

  const userInfo = user || supabaseCallUser || null


    const notifications = {
        "noLoginVote": () => toast.error('You need to login first before voting!', {icon: "🙈", position: "bottom-center", duration: 3000}),
        "voteAdded": (promise:Promise<{}>) => toast.promise(promise, {
          loading: 'Adding vote...',
          success: <b>Voted!</b>,
          error: <b>Sorry, an error happened. Please try again later.</b>
        }, {position: "bottom-center", duration: 2000}).then((r) => r).catch((error) => console.error(error)),
        "voteRemoved": (promise:Promise<{}>) => toast.promise(promise, {
            loading: 'Remove vote...',
            success: <b>Vote removed!</b>,
            error: <b>Sorry, an error happened. Please try again later.</b>
          }, {position: "bottom-center", duration: 2000}).then((r) => r).catch((error) => console.error(error)),
        "voteError": () => toast.error('An error occurred while trying to vote / unvote!', {position: "bottom-center", duration: 3000}),
    }

    // Show the tool page depending on the id of the tool
    return (
      <section className="text-white-900 body-font">
        <Toaster />
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
                                    <ToolTableRow key={tool.tools.id} notifications={notifications} userInfo={userInfo} row={tool.tools} showSubmittedBy={true} />
                                  )
                              })
                          }
                  </Table.Body>
              </Table>
            </div>
      </section>
    );
}

