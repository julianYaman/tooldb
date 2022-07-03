import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './../../../db'

import {
    withApiAuth,
    getUser
} from '@supabase/auth-helpers-nextjs';

type VoteResponse = {
    id: string,
    tool_id: number,
    voted: boolean,
}

const handler = withApiAuth(async function(
    req: NextApiRequest,
    res: NextApiResponse<VoteResponse>
) {

    let id = req.query?.id?.toString() ?? ''
    // Get User Info from Auth
    const userInfo = await getUser({ req, res })

    if (req.method === "GET"){

        id = encodeURIComponent(id)

        if(id){

            const votes = await prisma.votes.findMany({
                where: {
                    user_id: userInfo.user?.id,
                    tool_id: parseInt(id),
                }
            });

            const response = {
                id: id,
                tool_id: parseInt(id),
                voted: votes.length > 0,
            }

            return res.status(200).json(response);

        }

        return res.status(200).json( {
            id: "Not found",
            tool_id: 0,
            voted: false,
        })

    } else if (req.method === "POST") {

        id = encodeURIComponent(id)

        console.log(id, req.method)

        if(id){

            const votes = await prisma.votes.findMany({
                where: {
                    user_id: userInfo.user?.id,
                    tool_id: parseInt(id),
                }
            });

            console.log(votes)

            const existingVote = votes.length > 0 ? votes[0] : null;

            if(existingVote){
                await prisma.votes.delete({
                    where: {
                        id: existingVote.id
                    }
                })

                return res.status(200).json({
                    id: id,
                    tool_id: parseInt(id),
                    voted: false,
                })


            }else{

                if(!userInfo.user){
                    return res.status(401).json({
                        id: "Not authorized",
                        tool_id: 0,
                        voted: false,
                    })
                }else{
                    await prisma.votes.create({
                        data: {
                            user_id: userInfo.user.id.toString(),
                            tool_id: parseInt(id),
                        }
                    })

                    return res.status(200).json({
                        id: id,
                        tool_id: parseInt(id),
                        voted: true,
                    })
            }

            }

        }

    } else {

        return res.status(405).json({
            id: "Method not allowed",
            tool_id: 0,
            voted: false,
        })
    }

})

export default withSentry(handler);
