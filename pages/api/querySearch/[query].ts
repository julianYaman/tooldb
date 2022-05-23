import { PrismaClient, tools } from "@prisma/client";

const prisma = new PrismaClient()
	
export default async function handler(req: any, res: any) {

    let { query } = req.query

    query = decodeURIComponent(query)

    const tools = await prisma.tools.findMany({
        select: {
            id: true,
            tool_name: true,
            submitted_by: true,
            tool_link: true,
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
        },
        where: {
            tool_name: {
                contains: query,
                mode: "insensitive"
            },
        },
    })

    res.json(tools)

}