// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './../../db'

type StandardViewResponse = {
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
}[]

type CategoriesResponse = {
  id: number;
  category_name: string | null;
  category_icon: string | null;
  category_description: string | null;
}[]

type DefaultResponse = {
  message: string;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardViewResponse|CategoriesResponse|DefaultResponse>
) {
  const params = req.query

  if(params.get === "standard"){
    const tools = await prisma.tools.findMany({
      select: {
        id: true,
        tool_name: true,
        submitted_by: true,
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
      },
      take: 10,
    });

    return res.status(200).json(tools)
  }

  if (params.get === "categories") {
    const categories = await prisma.categories.findMany({
      select: {
        id: true,
        category_name: true,
        category_icon: true,
        category_description: true,
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
      },
      take: 10,
      orderBy: {
        created_at: "desc"
      }
    });

    return res.status(200).json(recentlyAdded)
  }

  return res.status(200).json({
    "message": "No data found"
  })

}
