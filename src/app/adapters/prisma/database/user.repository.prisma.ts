import {PrismaClient, User} from '@prisma/client';
import {UserRepository} from '../../../interfaces/repositories/user.repository';

const prisma = new PrismaClient();
export class UserRepositoryPrisma implements UserRepository {
    async create(user: User) {
        await prisma.user.create({ data: user });
    }

    async delete(id: number) {
        await prisma.user.delete({ where: { id } });
    }

    async findByEmail(email: string) {
        return prisma.user.findFirst({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        //@ts-ignore
        return prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                username: true,
                pp_url: true,
                name: true,
                email: false,
                isAdmin: false,
                hashedPassword: false,
            }
        });
    }

    async findByUsername(username: string): Promise<User | null> {
        //@ts-ignore
        return prisma.user.findFirst({
            where: {
                username: username,
            },
            select: {
                id: true,
                username: true,
                pp_url: true,
                name: true,
                email: false,
                isAdmin: false,
                hashedPassword: false,
            }
        });
    }

    async update(user : Partial<User>) {
        const userId = user.id;

        if (userId === undefined) {
            throw new Error('User ID is required for update.');
        }
        await prisma.user.update({
            where: { id: user.id },
            data: user,
        });
    }

    async findUserByName(name: string): Promise<User[] | null> {
        // @ts-ignore
        return prisma.user.findMany({
            where: {
                name: {
                    contains: name
                }
            },
            select: {
                id: true,
                username: true,
                pp_url: true,
                name: true,
                email: false,
                isAdmin: false,
                hashedPassword: false,
            }
        });
    }

    async findUserByIdentifier(identifier: string) {
        return prisma.user.findFirst({
            where: {
                OR: [
                    { username: identifier },
                    { email: identifier },
                ],
            },
        });
    }

    async findAll() {
        return prisma.user.findMany();
    }

    async findUsersByIds(userIds: number[]): Promise<Object> {
        const users = await prisma.user.findMany({
          where: {
            id: {
              in: userIds,
            },
          },
          select: {
            id: true,
            username: true,
            pp_url: true,
            name: true,
            email: false,
            isAdmin: false,
            hashedPassword: false,
          },
        });
      
        return users;
      }
}
