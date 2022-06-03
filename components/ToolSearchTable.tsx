import { Avatar, Badge, Button, Table, TextInput } from 'flowbite-react'
import Link from 'next/link'
import axios from 'axios'
import { Suspense, useState } from 'react';
import { FaStar, FaTable } from 'react-icons/fa';


export default function ToolSearchTable(props: any) {

    const cachedPreviewData   = props.tablePreviewData.firstTools;
    const cachedRecentlyAdded = props.tablePreviewData.recentlyAddedData;

    const [tablePreviewData, setTablePreviewData] = useState(cachedPreviewData)
    const [standardTableViewVisible, setStandardTableViewVisible] = useState(true)
    const [recentlyAddedTableViewVisible, setRecentlyAddedTableViewVisible] = useState(false)

    const showSearchResults = async (searchTerm: string) => {

        if (searchTerm.length > 3){
    
            const response = await axios.get('/api/querySearch/' + encodeURIComponent(searchTerm))
    
            if(response.data.length > 0){
                setTablePreviewData(response.data)
            } else {
                setTablePreviewData(null)
            }

        } else {
            setTablePreviewData(cachedPreviewData)
        }
    
    }

    const changeView = (view: string) => {
        if (view === 'standard'){
            setStandardTableViewVisible(true)
            setRecentlyAddedTableViewVisible(false)
            setTablePreviewData(cachedPreviewData)
        } else if (view === 'recentlyAdded'){
            setStandardTableViewVisible(false)
            setRecentlyAddedTableViewVisible(true)
            setTablePreviewData(cachedRecentlyAdded)
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
            <Table striped={true} className="whitespace-nowrap md:whitespace-normal" >
                <Table.Head>
                    <Table.HeadCell className='px-4 md:px-6'>
                    Tool name
                    </Table.HeadCell>
                    <Table.HeadCell className='px-4 md:px-6'>
                    Categories
                    </Table.HeadCell>
                    <Table.HeadCell className='hidden sm:table-cell'>
                    Links
                    </Table.HeadCell>
                    <Table.HeadCell className='hidden sm:table-cell'>
                    Submitted by
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
                                        <Table.Cell className='px-2 md:px-6'>
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
                                            <Link href={row.tool_link}>
                                                <a className='text-blue-600 hover:text-cyan-600'>Website</a>
                                            </Link>
                                            {
                                                row.github_repo ? (
                                                    <>
                                                        <span>; </span>
                                                        <Link href={row.github_repo}>
                                                            <a className='text-blue-600 hover:text-cyan-600'>Repository</a>
                                                        </Link>
                                                    </>
                                                ) : null
                                            }
                                            {
                                                row.twitter_link ? (
                                                    <>
                                                        <span>; </span>
                                                        <Link href={row.twitter_link}>
                                                            <a className='text-blue-600 hover:text-cyan-600'>Twitter</a>
                                                        </Link>
                                                    </>
                                                ) : null
                                            }
                                        </Table.Cell>
                                        <Table.Cell className='hidden sm:table-cell px-3 md:px-6'>
                                        {
                                            row.submitted_by ? (
                                                <Badge
                                                size='xs'
                                                color='red'
                                                href={`https://github.com/${row.submitted_by}`}>
                                                    <Avatar
                                                        img={`https://avatars.githubusercontent.com/${row.submitted_by}`}
                                                        size="xs"
                                                        rounded={true}
                                                    >
                                                        <div className="space-y-1 font-medium dark:text-white">
                                                            <div>
                                                                {row.submitted_by}
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
                        ) : (
                            <Table.Row>
                                <Table.Cell>
                                    Sorry. We couldn&apos;t find your tool. 
                                    <br />Try with a few more letters, check for typos or submit your tool  <Link href={"https://app.appsmith.com/app/submit-a-tool-to-tooldb/submittool-628dfd0f7901344ba8d28334"}><a className='text-blue-600 font-bold hover:text-cyan-600'>here</a></Link>.
                                </Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell className='hidden sm:table-cell px-3 md:px-6'></Table.Cell>
                                <Table.Cell className='hidden sm:table-cell px-3 md:px-6'></Table.Cell>
                            </Table.Row>
                        )}
                        <Table.Row>
                            <Table.Cell>
                                Submit your tool <br />with <Link href={"https://app.appsmith.com/app/submit-a-tool-to-tooldb/submittool-628dfd0f7901344ba8d28334"}><a className='text-blue-600 font-bold hover:text-cyan-600'>here on AppSmith</a></Link>.
                            </Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell className='hidden sm:table-cell px-3 md:px-6'></Table.Cell>
                            <Table.Cell className='hidden sm:table-cell px-3 md:px-6'></Table.Cell>
                        </Table.Row>
                </Table.Body>
            </Table>
        </>
    )

}