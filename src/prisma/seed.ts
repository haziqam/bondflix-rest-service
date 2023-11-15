import {PrismaClient} from '@prisma/client'
// @ts-ignore
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

async function main() {
    const alice = await prisma.user.create({
        data: {
            username: 'Alice',
            pp_url: 'alice_profile.png',
            name: 'Alice Wonderland',
            email: 'alice@example.com',
            isAdmin: false,
            hashedPassword: await bcrypt.hash('password', 10),
        },
    })

    const bob = await prisma.user.create({
        data: {
            username: 'Bob',
            pp_url: 'bob_profile.png',
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
            release_date: new Date('2021-01-01'),
            content_file_path: 'content/journey_to_the_west.pdf',
            thumbnail_file_path: 'thumbnails/journey_to_the_west.png',
            uploaded_at: new Date(),
        },
    })

    const content2 = await prisma.content.create({
        data: {
            user: { connect: { id: bob.id } },
            title: 'Building Basics',
            description: 'A guide to basic building',
            release_date: new Date('2022-01-01'),
            content_file_path: 'content/building_basics.pdf',
            thumbnail_file_path: 'thumbnails/building_basics.png',
            uploaded_at: new Date(),
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
