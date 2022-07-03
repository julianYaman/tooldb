import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './../../../db'

type VoteResponse = {
    id: string,
    votes: number,
}

const handler = async function(
    req: NextApiRequest,
    res: NextApiResponse<VoteResponse>
) {

    let id = req.query.id?.toString() || ""

    id = encodeURIComponent(id)

    if(id){

        const voteAmount = await prisma.votes.count({
            where: {
                tool_id: parseInt(id),
            }
        });

        const response = {
            id: id,
            votes: voteAmount
        }

        return res.status(200).json(response);

    }

    return res.status(200).json( {
        id: "Not found",
        votes: 0
    })

}

export default withSentry(handler);
