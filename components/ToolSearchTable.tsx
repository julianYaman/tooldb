import { Badge, Button, Pagination, Progress, Spinner, Table, TextInput } from 'flowbite-react'
import Link from 'next/link'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react';
import { FaDiscord, FaGithub, FaLink, FaStar, FaTable, FaTwitter } from 'react-icons/fa';
import useSWR from 'swr';

const fetcher = (url:any) => axios.get(url).then(res => res.data)

export default function ToolSearchTable(props: any) {

    let maxPages = useRef(0);

    const [tablePreviewData, setTablePreviewData] = useState([])
    const [standardTableViewVisible, setStandardTableViewVisible] = useState(true)
    const [recentlyAddedTableViewVisible, setRecentlyAddedTableViewVisible] = useState(false)
    const [isSearching, setSearchState] = useState(false)
    const [page, setPage] = useState(1)

    const { data: standardData, error: standardError }: any = useSWR('/api/getEntries?get=standard', fetcher)
    const { data: recentlyAddedData, error: recentlyAddedError }: any = useSWR('/api/getEntries?get=recentlyAdded', fetcher)
    
    useEffect(() => {
        setTablePreviewData(standardData?.tools)
        maxPages.current = standardData?.count
    }, [standardData?.tools, standardData?.count])

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
    
            const response = await axios.get('/api/querySearch/' + encodeURIComponent(searchTerm) + "?page=1")
    
            if(response.data.length > 0){
                setTablePreviewData(response.data)
                setPage(1)
                maxPages.current = 1
            } else {
                setTablePreviewData([])
                setPage(1)
                maxPages.current = 1
            }

            setSearchState(true)

        } else {
            setTablePreviewData(standardData.tools)
            setSearchState(false)
            maxPages.current = standardData.count
        }
    
    }

    const changeView = (view: string) => {
        if (view === 'standard'){
            setStandardTableViewVisible(true)
            setRecentlyAddedTableViewVisible(false)
            setTablePreviewData(standardData.tools)
            setPage(1)
        } else if (view === 'recentlyAdded'){
            setStandardTableViewVisible(false)
            setRecentlyAddedTableViewVisible(true)
            setTablePreviewData(recentlyAddedData.tools)
            setPage(1)
        }
    }

    const changePage = async (pageNumber: number) => {

        let queriedTable;
        
        if(!isSearching && (pageNumber != page)){

            if(standardTableViewVisible){
                queriedTable = "standard"
            }else{
                queriedTable = "recentlyAdded"
            }
            
            try {
                const queryNextPage = await axios.get(`/api/getEntries?get=${queriedTable}&page=${pageNumber}`)
                setPage(pageNumber) 
                setTablePreviewData(queryNextPage.data.tools)
            } catch (error) {
                console.error("An error happened while trying to paginate through the results. Please inform a developer.")
            }
            
        }

    }

    return (
        <>
            <h3 className='text-center text-md text-white font-bold'>Search through {maxPages.current || <Spinner />} tools</h3>
            <div className='px-1'>
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
            </div>
            <div className='flex flex-wrap justify-center px-1'>
                <div className='xs:mt-0 mt-2 sm:flex-1 flex-auto text-center sm:text-left'>
                    <Button.Group outline={true} >
                        <Button size="md" color="alternative" disabled={standardTableViewVisible} onClick={() => changeView("standard")}>
                            <FaTable className="mr-3 h-4 w-4" />
                            {' '}Standard
                        </Button>
                        <Button size="md" color="alternative" disabled={recentlyAddedTableViewVisible} onClick={() => changeView("recentlyAdded")}>
                            <FaStar className="mr-3 h-4 w-4" />
                            {' '}Newest
                        </Button>
                    </Button.Group>
                </div>
                <div className='text-white sm:flex-1 flex-auto text-center sm:text-right gap-1'>
                    <Pagination
                        currentPage={page}
                        className="text-white text-sm"
                        layout="navigation"
                        onPageChange={(pageNumber) => changePage(pageNumber)}
                        showIcons={true}
                        totalPages={(Math.ceil(maxPages.current / 10)) || 1}
                    />
                    <p>Page <b>{page}</b> of <b>{(Math.ceil(maxPages.current / 10)) || <Spinner />}</b></p>
                </div>
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
                                                {
                                                    row.discord_link ? (
                                                        <Link href={row.discord_link}>
                                                            <Button size="xs" gradientMonochrome="purple" className="flex-1 md:flex-auto">
                                                                <FaDiscord />&nbsp;
                                                                <span className="hidden md:block">Discord</span>
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
            <div className="items-center justify-center text-center text-white gap-1">
                <Pagination
                    currentPage={page}
                    className="text-white text-sm"
                    layout="navigation"
                    onPageChange={(pageNumber) => changePage(pageNumber)}
                    showIcons={true}
                    totalPages={(Math.ceil(maxPages.current / 10)) || 1}
                />
                <p>Page <b>{page}</b> of <b>{(Math.ceil(maxPages.current / 10)) || <Spinner />}</b></p>
            </div>
        </>
    )

}