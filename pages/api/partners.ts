import { prisma } from './../../db'

export default async function handler(req: any, res: any) {

    const partners = await prisma.collaboration_partners.findMany()

    res.json(partners)

}