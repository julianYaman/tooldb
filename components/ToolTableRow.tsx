import axios from 'axios';
import { Avatar, Badge, BadgeColor, Button, Spinner, Table, Tooltip } from 'flowbite-react'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaArrowUp, FaDiscord, FaGithub, FaLink, FaRegTimesCircle, FaStar, FaTwitter } from 'react-icons/fa';

export default function ToolTableRow(props: any) {

    const row = props.row;
    const showCategories = props.showCategories ? true : false;
    const showSubmittedBy = props.showSubmittedBy;
    const userInfo = props.userInfo

    const [toolVotes, setVotes] = useState(row?._count.votes)
    const [isLoading, setIsLoading] = useState(true)
    const [isVoted, setIsVoted] = useState(false);

    useEffect(() => {
        if(userInfo){
            axios.get(`/api/tools/vote?id=${row.id}`).then(res => {
                if(res.data.voted){
                    setIsVoted(true)
                    setIsLoading(false)
                }else{
                    setIsVoted(false)
                    setIsLoading(false)
                }
            }).catch(err => {
                console.log(err)
                setIsLoading(false)
            })
        }else{
            setIsLoading(false)
        }
    }, [userInfo, row.id])

    async function handleVote (e:any) {
        if(userInfo && !isLoading){
            const oldVotes = toolVotes
            if(isVoted){
                try {
                    setVotes(toolVotes - 1)
                    setIsVoted(false)
                    const removeVote = axios.post(`/api/tools/vote?id=${row.id}`, {
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
                    const addVote = axios.post(`/api/tools/vote?id=${row.id}`, {
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

    return (
    <Table.Row>
        <Table.Cell className='flex flex-wrap px-4 md:px-6'>
            <div className='flex gap-2'>
                <Button size="xs" outline={!isVoted} gradientDuoTone="pinkToOrange" onClick={handleVote} data-votes={toolVotes || 0}>
                        <FaArrowUp className="mr-1 h-4 w-4 pointer-events-none" />
                        <span className='pointer-events-none'>{!(typeof row?._count.votes === "number") ? <FaRegTimesCircle /> : !isLoading ? toolVotes : <Spinner size="sm" color='red' aria-label="Default status example" />}</span>
                </Button>
                <Link href={`/tool/${encodeURIComponent(row.id)}`}>
                    <a className='text-blue-600 hover:text-cyan-600'>
                        <img src={`${row.logo}`} width="28px" height="28px" className='inline mr-2 rounded-lg' />
                        {row.tool_name}
                    </a>
                </Link>
            </div>
        </Table.Cell>
        { showCategories ? (
            <Table.Cell className='px-4 md:px-6'>
                <div className='flex flex-wrap gap-2 items-center'>
                    {
                        (row.submitted_by_type === "partner") ? (
                            <Tooltip
                                content={row.collaboration_partners.partner_description}
                                placement="top"
                            >
                                <Badge
                                color={"green"}
                                size="xs"
                                icon={FaStar}
                                href={row.collaboration_partners.partner_link}
                                >
                                    <div className='flex justify-center items-center'>
                                    {
                                        row.collaboration_partners.partner_logo ? (
                                                <Avatar
                                                    img={row.collaboration_partners.partner_logo}
                                                    size="xs"
                                                    rounded={true}
                                                />
                                                
                                        ) : null
                                    }
                                    <span className='ml-1'>{row.collaboration_partners.partner}</span>
                                    </div>
                                </Badge>
                            </Tooltip>
                        ) : null
                    }
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
            ) : null
        }   
        <Table.Cell className='hidden sm:table-cell px-4 md:px-6'>
            <div className="flex flex-wrap gap-2">
                    
                    <Link href={row.tool_link}>
                        <Button size="xs" color="green" className="flex-1 md:flex-auto">
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
        {
            showSubmittedBy ? (
                <Table.Cell className='px-4 md:px-6'>
                {
                 (row.submitted_by_type === "partner") ? (
                    <div className="w-full mt-1">
                    <Badge
                    color={"green"}
                    // @ts-ignore
                    size="xs"
                    icon={FaStar}
                    href={row.collaboration_partners.partner_link}
                    >
                      <Tooltip
                          content={`About ${row.collaboration_partners.partner}: ${row.collaboration_partners.partner_description}`}
                          placement="top"
                      >
                        <div className='flex justify-center items-center font-medium dark:text-white w-full p-1'>
                        {
                            row.collaboration_partners.partner_logo ? (
                                    <Avatar
                                        img={row.collaboration_partners.partner_logo}
                                        size="xs"
                                        rounded={true}
                                    />
                                    
                            ) : null
                        }
                        <span className='ml-1 font-bold'>{row.collaboration_partners.partner}</span>
                        </div>
                      </Tooltip>
                    </Badge>
                  </div>
                ) : row.submitted_by ? (
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
                    
                ) : <p>No data</p> }
                </Table.Cell>
            ) : null
        }
    </Table.Row>
    )

}