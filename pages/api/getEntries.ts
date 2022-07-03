// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './../../db'

type StandardViewResponse = {
  tools: {
    tool_categories: {
        categories: {
            id: number;
            category_name: string | null;
            category_icon: string | null;
        } | null;
    }[];
    id: number;
    tool_name: string | null;
    submitted_by: string | null;
    tool_link: string | null;
    logo: string | null;
    github_repo: string | null;
    twitter_link: string | null;
    submitted_by_type: string;
    discord_link: string | null;
    upvotes: number | null ;
  }[],
  count: number
}

type CategoriesResponse = {
  id: number;
  category_name: string | null;
  category_icon: string | null;
  category_description: string | null;
}[]

type DefaultResponse = {
  message: string;
}


const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse<StandardViewResponse|CategoriesResponse|DefaultResponse>
) {
  const params = req.query

  if(params.get === "standard"){
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
      skip: ((parseInt(params.page?.toString() || "1") - 1) * 10) || 0,
      take: 10,
      where: {
        isVerified: true
      },
      orderBy: {
        votes: {
          _count: "desc"
        }
      }
      
    });

    const count = await prisma.tools.count();

    return res.status(200).json({tools, count})
  }

  if (params.get === "categories") {
    const categories = await prisma.categories.findMany({
      select: {
        id: true,
        category_name: true,
        category_icon: true,
        category_description: true,
      },
      orderBy: {
        category_name: "asc"
      }
    });

    return res.status(200).json(categories)
  }

  if (params.get === "recentlyAdded") {
    const recentlyAdded = await prisma.tools.findMany({
      select: {
        id: true,
        tool_name: true,
        submitted_by: true,
        submitted_by_type: true,
        discord_link: true,
        upvotes: true,
        tool_link: true,
        logo: true,
        github_repo: true,
        twitter_link: true,
        tool_categories: {
          select: {
            categories: {
              select: {
                id: true,
                category_name: true,
                category_icon: true
              }
            }
          }
        },
        collaboration_partners: true
      },
      skip: ((parseInt(params.page?.toString() || "1") - 1) * 10) || 0,
      take: 10,
      orderBy: {
        created_at: "desc"
      },
      where: {
        isVerified: true
      }
    });

    const count = await prisma.tools.count();

    return res.status(200).json({tools: recentlyAdded, count})
  }

  return res.status(200).json({
    "message": "No data found"
  })

}

export default withSentry(handler);
