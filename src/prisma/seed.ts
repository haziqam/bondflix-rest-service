import {PrismaClient} from '@prisma/client'
// @ts-ignore
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

async function main() {
    const alice = await prisma.user.create({
        data: {
            username: 'Alice',
            pp_url: 'default.png',
            name: 'Alice Wonderland',
            email: 'alice@example.com',
            isAdmin: false,
            hashedPassword: await bcrypt.hash('password', 10),
        },
    })

    const bob = await prisma.user.create({
        data: {
            username: 'Bob',
            pp_url: 'default.png',
            name: 'Bob Builder',
            email: 'bob@example.com',
            isAdmin: true,
            hashedPassword: await bcrypt.hash('password', 10),
        },
    })

    const content1 = await prisma.content.create({
        data: {
            user: { connect: { id: alice.id } },
            title: 'Journey to the West',
            description: 'A mystical journey story',
            content_file_path: 'uploads/content/default.mp4',
            thumbnail_file_path: 'uploads/thumbnails/default.png',
            uploaded_at: new Date(),
            visibility: true,
        },
    })

    const content2 = await prisma.content.create({
        data: {
            user: { connect: { id: bob.id } },
            title: 'Building Basics',
            description: 'A guide to basic building',
            content_file_path: 'uploads/content/default.mp4',
            thumbnail_file_path: 'uploads/thumbnails/default.png',
            uploaded_at: new Date(),
            visibility: true,
        },
    })

    const genreAdventure = await prisma.genre.create({
        data: { name: 'Adventure' },
    })

    const categoryEducation = await prisma.category.create({
        data: { name: 'Education' },
    })

    await prisma.content.update({
        where: { id: content1.id },
        data: { genres: { connect: { id: genreAdventure.id } } },
    })

    await prisma.content.update({
        where: { id: content2.id },
        data: { categories: { connect: { id: categoryEducation.id } } },
    })

    const sponsorTechCo = await prisma.sponsor.create({
        data: {
            name: 'TechCo',
            sponsor_status: 'COMPANY',
            link: 'https://techco.com',
        },
    })

    await prisma.content.update({
        where: { id: content1.id },
        data: { sponsors: { connect: { id: sponsorTechCo.id } } },
    })
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
