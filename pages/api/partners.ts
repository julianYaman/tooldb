import { prisma } from './../../db'

export default async function handler(req: any, res: any) {

    const partners = await prisma.collaboration_partners.findMany({
        select: {
            partner: true,
            partner_description: true,
            partner_link: true,
            partner_logo: true,
        }
    })

    res.json(partners)

}