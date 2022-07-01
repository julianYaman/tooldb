// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './../../../db'
import { withSentry } from "@sentry/nextjs";

type CategoryResponse = {
    // TODO: add fields
}

type DefaultResponse = {}


const handler = async function(
    req: NextApiRequest,
    res: NextApiResponse<CategoryResponse|DefaultResponse>
) {

    let id = req.query.id.toString()

    id = encodeURIComponent(id)

    if(id){

        const categoryResults = await prisma.tool_categories.findMany({
            where: {
                category_id: parseInt(id)
            },
            include: {
                tools: {
                    select: {
                        tool_name: true,
                        discord_link: true,
                        github_repo: true,
                        id: true,
                        logo: true,
                        submitted_by: true,
                        submitted_by_type: true,
                        tool_description: true,
                        tool_link: true,
                        twitter_link: true,
                        upvotes: true,
                        isVerified: true,
                        collaboration_partners: true
                    }
                },
            },
        });
    
        const categoryData = await prisma.categories.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                category_name: true,
                category_icon: true,
                category_description: true
            }
        });

        return res.status(200).json({categoryData, categoryResults});

    }

    return res.status(200).json({})

}

export default withSentry(handler);