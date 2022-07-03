import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './../../../db'
import { supabase } from "././../../../util/supabase-service"

import {
    withApiAuth,
    getUser,
} from '@supabase/auth-helpers-nextjs';

type DeleteResponse = {
    user_id: string,
    deleted: boolean
}

const handler = withApiAuth(async function(
    req: NextApiRequest,
    res: NextApiResponse<DeleteResponse>
) {

    const userInfo = await getUser({ req, res })

    if (req.method === "GET"){

        if (userInfo.user && req.headers["delete-account"] === "true") {

            console.log(">>>>>>> DELETE-ACCOUNT")

            try {
                await prisma.votes.deleteMany({
                    where: {
                        user_id: userInfo.user?.id,
                    }
                });
        
                await supabase.from('profiles').delete().eq("user_id", userInfo.user.id);
                const { data: user, error } = await supabase.auth.api.deleteUser(userInfo.user.id);

                if (error){
                    console.log(error)
                    return res.status(500).json({
                        user_id: "Error happened",
                        deleted: false,
                    })
                }

                const response = {
                    user_id: userInfo.user?.id, 
                    deleted: true,
                }

                console.log(response)
        
                return res.status(200).json(response);
            } catch (error) {

                console.log(error)
                return res.status(500).json({
                    user_id: userInfo.user?.id || "Not found", 
                    deleted: false,
                })
                
            }

        } else {
            console.log("Not authorized")
            return res.status(401).json({
                user_id: "Not authorized", 
                deleted: false,
            })
        }

    } else {

        return res.status(405).json({
            user_id: "Method not allowed",
            deleted: false
        })
    }

})

export default withSentry(handler);
