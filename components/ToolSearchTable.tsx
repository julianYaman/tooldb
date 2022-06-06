import { Badge, Button, Progress, Table, TextInput } from 'flowbite-react'
import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { FaGithub, FaLink, FaStar, FaTable, FaTwitter } from 'react-icons/fa';
import useSWR from 'swr';

const fetcher = (url:any) => axios.get(url).then(res => res.data)

export default function ToolSearchTable(props: any) {

    const [tablePreviewData, setTablePreviewData] = useState([])
    const [standardTableViewVisible, setStandardTableViewVisible] = useState(true)
    const [recentlyAddedTableViewVisible, setRecentlyAddedTableViewVisible] = useState(false)

    const { data: standardData, error: standardError }: any = useSWR('/api/getEntries?get=standard', fetcher)
    const { data: recentlyAddedData, error: recentlyAddedError }: any = useSWR('/api/getEntries?get=recentlyAdded', fetcher)
    
    useEffect(() => {
        setTablePreviewData(standardData)
    }, [standardData])

    if (!standardData) return (
        <div className="mx-auto max-w-5xl p-5 text-white">
          <Progress
            progress={50}
            size="md"
            label="Loading tooldb..."
            labelPosition="outside"
            labelProgress={true}
          />
        </div>
      );
    
      if (standardError || recentlyAddedError){
        return (
            <div className="mx-auto max-w-5xl text-white">
                <Progress
                progress={100}
                size="md"
                color="red"
                label="An error occurred while loading tooldb"
                labelPosition="outside"
                labelProgress={true}
                />
            </div>
        );
      }

    

    const showSearchResults = async (searchTerm: string) => {

        if (searchTerm.length > 3){
    
            const response = await axios.get('/api/querySearch/' + encodeURIComponent(searchTerm))
    
            if(response.data.length > 0){
                setTablePreviewData(response.data)
            } else {
                setTablePreviewData([])
            }

        } else {
            setTablePreviewData(standardData)
        }
    
    }

    const changeView = (view: string) => {
        if (view === 'standard'){
            setStandardTableViewVisible(true)
            setRecentlyAddedTableViewVisible(false)
            setTablePreviewData(standardData)
        } else if (view === 'recentlyAdded'){
            setStandardTableViewVisible(false)
            setRecentlyAddedTableViewVisible(true)
            setTablePreviewData(recentlyAddedData)
        }
    }

    return (
        <>
            <TextInput
                id="large"
                type="text"
                sizing="lg"
                placeholder='Search a tool...'
                onChange={(e) => 
                    {
                        showSearchResults(e.target.value)
                    }
                }
            />
            <div className='mx-auto'>
                <Button.Group outline={true} >
                    <Button size="xs" color="alternative" disabled={standardTableViewVisible} onClick={() => changeView("standard")}>
                        <FaTable className="mr-3 h-4 w-4" />
                        {' '}Standard
                    </Button>
                    <Button size="xs" color="alternative" disabled={recentlyAddedTableViewVisible} onClick={() => changeView("recentlyAdded")}>
                        <FaStar className="mr-3 h-4 w-4" />
                        {' '}Newest
                    </Button>
                </Button.Group>
            </div>
            <Table striped={true} className="whitespace-nowrap md:whitespace-normal table-auto" >
                <Table.Head>
                    <Table.HeadCell className='px-4 md:px-6'>
                    Tool name
                    </Table.HeadCell>
                    <Table.HeadCell className='px-4 md:px-6 w-96'>
                    Categories
                    </Table.HeadCell>
                    <Table.HeadCell className='hidden sm:table-cell px-3 md:px-6'>
                    Links
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        tablePreviewData ? (
                            tablePreviewData.map((row: any, index: number) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell className='px-4 md:px-6'>
                                            <Link href={`/tool/${encodeURIComponent(row.id)}`}>
                                                <a className='text-blue-600 hover:text-cyan-600'>
                                                    <img src={`${row.logo}`} width="28px" height="28px" className='inline mr-2 rounded-lg' />
                                                    {row.tool_name}
                                                </a>
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell className='px-4 md:px-6'>
                                            <div className='flex flex-wrap gap-2'>
                                                {
                                                    row.tool_categories.map((category: any, index: number) => {
                                                        return (
                                                            <Badge
                                                            color="blue"
                                                            size="xs"
                                                            key={index}
                                                            href={`/category/${category.categories.id}`}
                                                            >
                                                                {category.categories.category_icon} {category.categories.category_name}
                                                            </Badge>
                                                        ) 
                                                    })
                                                }
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className='hidden sm:table-cell px-3 md:px-6'>
                                            <div className="flex flex-wrap gap-2">
                                                    <Link href={row.tool_link}>
                                                        <Button size="xs" gradientMonochrome="green" className="flex-1 md:flex-auto">
                                                            <FaLink />&nbsp;
                                                            <span className="hidden md:block">Website</span>
                                                        </Button>
                                                    </Link>
                                                {
                                                    row.github_repo ? (
                                                        <Link href={row.github_repo}>
                                                            <Button size="xs" color="light" className="flex-1 md:flex-auto">
                                                                <FaGithub />&nbsp;
                                                                <span className="hidden md:block">GitHub Repo</span>
                                                            </Button>
                                                        </Link>
                                                    ) : null
                                                }
                                                {
                                                    row.twitter_link ? (
                                                        <Link href={row.twitter_link}>
                                                            <Button size="xs" gradientMonochrome="blue" className="flex-1 md:flex-auto">
                                                                <FaTwitter />&nbsp;
                                                                <span className="hidden md:block">Twitter</span>
                                                            </Button>
                                                        </Link>
                                                    ) : null
                                                }
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                        ) : (
                            <Table.Row>
                                <Table.Cell>
                                    Sorry. We couldn&apos;t find your tool. 
                                    <br />Try with a few more letters, check for typos or submit your tool <Link href={"https://app.appsmith.com/app/submit-a-tool-to-tooldb/submittool-628dfd0f7901344ba8d28334"}><a className='text-blue-600 font-bold hover:text-cyan-600'>here</a></Link>.
                                </Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell className='hidden sm:table-cell px-3 md:px-6'></Table.Cell>
                            </Table.Row>
                        )}
                        <Table.Row>
                            <Table.Cell>
                                Submit your tool <br /> <Link href={"https://app.appsmith.com/app/submit-a-tool-to-tooldb/submittool-628dfd0f7901344ba8d28334"}><a className='text-blue-600 font-bold hover:text-cyan-600'>here on AppSmith</a></Link>.
                            </Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell className='hidden sm:table-cell px-3 md:px-6'></Table.Cell>
                        </Table.Row>
                </Table.Body>
            </Table>
        </>
    )

}