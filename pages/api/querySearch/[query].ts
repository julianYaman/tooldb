import { prisma } from './../../../db'

export default async function handler(req: any, res: any) {

    let { query } = req.query

    query = decodeURIComponent(query)

    const tools = await prisma.tools.findMany({
        select: {
            id: true,
            tool_name: true,
            submitted_by: true,
            tool_link: true,
            discord_link: true,
            github_repo: true,
            twitter_link: true,
            logo: true,
            tool_categories: {
                select: {
                    categories: {
                        select: {
                            category_name: true,
                            category_icon: true,
                            id: true
                        }
                    }
                }
            },
            collaboration_partners: true,
        },
        where: {
            tool_name: {
                contains: query,
                mode: "insensitive"
            },
            isVerified: true
        },
        take: 10,
        skip: ((parseInt(req.query.page.toString()) - 1) * 10) || 0,
    })

    res.json(tools)

}