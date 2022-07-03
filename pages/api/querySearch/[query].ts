import { prisma } from './../../../db'
import { withSentry } from "@sentry/nextjs";

const handler = async function(req: any, res: any) {

    let { query } = req.query

    query = decodeURIComponent(query)

    const tools = await prisma.tools.findMany({
        include: {
            tool_categories: {
                include: {
                    categories: true
                }
            },
            collaboration_partners: true,
            tool_images: true,
            votes: true,
            _count: {
                select: {
                    votes: true
                }
            }
        },
        skip: ((parseInt(req.query.page?.toString() || "1") - 1) * 10) || 0,
        take: 10,
        where: {
            tool_name: {
                contains: query,
                mode: "insensitive"
            },
            isVerified: true
        },
        orderBy: {
            votes: {
                _count: "desc"
            }
        }
    })

    res.json(tools)

}

export default withSentry(handler);