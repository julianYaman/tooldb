import { Avatar, Badge, Table, TextInput } from 'flowbite-react'
import Link from 'next/link'
import axios from 'axios'
import { Suspense, useState } from 'react';


export default function EmbeddedSearchbar(props: any) {

    const [results, setResults] = useState([])
    const [tableVisible, setTableVisibility] = useState(false)

    const showSearchResults = async (searchTerm: string) => {

        if (searchTerm.length > 3){

            setTableVisibility(true)
    
            const response = await axios.get('/api/querySearch/' + encodeURIComponent(searchTerm))
    
            if(response.data.length > 0){           
                setResults(response.data)
            } else {
                setResults([])
            }

        } else {
            setTableVisibility(false)
            setResults([])
        }
    
    }

    return (
        <div className='relative w-full'>
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
            {
                tableVisible ? (
                    <div className='absolute w-full'>
                <Table striped={true} className='max-h-96'>
                    <Table.Head>
                        <Table.HeadCell>
                        Tool name
                        </Table.HeadCell>
                        <Table.HeadCell>
                        Categories
                        </Table.HeadCell>
                        <Table.HeadCell>
                        Links
                        </Table.HeadCell>
                        <Table.HeadCell>
                        Submitted by
                        </Table.HeadCell>

                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            results.length > 0 ? (
                                results.map((row: any, index: number) => {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell>
                                                <Link href={`/tool/${encodeURIComponent(row.id)}`}>
                                                    <a className='text-blue-600 hover:text-cyan-600'>
                                                        <img src={`${row.logo}`} width="28px" height="28px" className='inline mr-2 rounded-lg' />
                                                        {row.tool_name}
                                                    </a>
                                                </Link>
                                            </Table.Cell>
                                            <Table.Cell>
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
                                            <Table.Cell>
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
                                            <Table.Cell>
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
                                        <br />Try with a few more letters, check for typos or submit your tool on GitHub with <Link href={"https://app.appsmith.com/app/submit-a-tool-to-tooldb/submittool-628dfd0f7901344ba8d28334"}><a className='text-blue-600 font-bold hover:text-cyan-600'>an issue</a></Link>.
                                    </Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell></Table.Cell>
                                </Table.Row>
                            )}
                            <Table.Row>
                                <Table.Cell>
                                    Submit your tool <br />with <Link href={"https://app.appsmith.com/app/submit-a-tool-to-tooldb/submittool-628dfd0f7901344ba8d28334"}><a className='text-blue-600 font-bold hover:text-cyan-600'>here on AppSmith</a></Link>.
                                </Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                    </Table.Body>
                </Table>
            </div>
                ) : null
            }
        </div>
    )

}