import { prisma } from './../../db'
import { withSentry } from "@sentry/nextjs";

const handler = async function(req: any, res: any) {

    const partners = await prisma.collaboration_partners.findMany()

    res.json(partners)

}

export default withSentry(handler);