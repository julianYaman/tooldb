// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './../../../db'

type CategoryIdsResponse = {
    id: number,
}[]

type DefaultResponse = {}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CategoryIdsResponse|DefaultResponse>
) {

    const categories = await prisma.categories.findMany({
        select: {
            id: true,
        },
    });

    return res.status(200).json(categories);

}
