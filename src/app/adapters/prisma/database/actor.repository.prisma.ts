import {Actor, PrismaClient} from '@prisma/client';
import {ActorRepository} from '../../../interfaces/repositories/actor.repository';

const prisma = new PrismaClient();

export class ActorRepositoryPrisma implements ActorRepository {
    async create(actor: Actor) {
        await prisma.actor.create({ data: actor });
    }

    async update(actor: Actor) {
        await prisma.actor.update({
            where: { id: actor.id },
            data: actor,
        });
    }

    async delete(id: number) {
        await prisma.actor.delete({ where: { id } });
    }

    async findById(id: number) {
        return prisma.actor.findUnique({ where: { id } });
    }

    async findByName(name: string) {
        return prisma.actor.findFirst({ where: { name } });
    }

    async findAll() {
        return prisma.actor.findMany();
    }
}
