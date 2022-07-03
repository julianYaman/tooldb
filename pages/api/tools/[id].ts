// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './../../../db'
type ToolResponse = {
    id: number,
    tool_name: string,
    tool_description: string,
    submitted_by: string,
    tool_link: string,
    logo: string,
    github_repo: string,
    twitter_link: string,
    tool_categories: {
        categories: {
            id: number;
            category_name: string | null;
            category_icon: string | null;
        } | null;
    }[],
    isVerified: boolean,
    tool_detailed_description: string,
    tool_images: {
        image_link: string | null;
    }[],
    votes: {
        id: number;
        user_id: string;
        tool_id: number;
    };
}

type DefaultResponse = {}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ToolResponse|DefaultResponse>
) {

    let id = req.query.id?.toString() || ""

    id = encodeURIComponent(id)

    if(id){

        const tool = await prisma.tools.findUnique({
            select: {
                id: true,
                tool_name: true,
                tool_description: true,
                submitted_by: true,
                discord_link: true,
                submitted_by_type: true,
                tool_link: true,
                github_repo: true,
                twitter_link: true,
                created_at: true,
                isVerified: true,
                logo: true,
                tool_detailed_description: true,
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
                tool_images: {
                    select: {
                        image_link: true
                    }
                },
                collaboration_partners: true,
                votes: true
            },
            where: {
                id: parseInt(id),
            }
        });

        return res.status(200).json(tool || {});

    }

    return res.status(200).json({})

}
