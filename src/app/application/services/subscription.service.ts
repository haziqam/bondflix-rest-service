import {UserRepository} from "../../interfaces/repositories/user.repository";
import {SoapClient} from "../../adapters/soap/soap.client";

export class SubscriptionService {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async subscribe(userId: number, creatorId: number): Promise<boolean> {
        const existingUser = await this.userRepository.findById(userId);
        if (!existingUser) {
            return false;
        }
        const existingCreator = await this.userRepository.findById(creatorId);
        if (!existingCreator) {
            return false;
        }

        return await SoapClient.getInstance().addCreatorSubscriberRelationship(
            existingCreator.id,
            existingUser.id
        );
    }

    async isUserSubscribedToCreator(
        userId: number,
        creatorId: number
    ): Promise<boolean> {
        const existingUser = await this.userRepository.findById(userId);
        if (!existingUser) {
            return false;
        }
        const existingCreator = await this.userRepository.findById(creatorId);
        if (!existingCreator) {
            return false;
        }

        return await SoapClient.getInstance().isUserSubscribedToCreator(
            userId,
            creatorId
        );
    }

    async getSubscribers(
        creatorId: number
    ): Promise<Object> {
        const existingCreator = await this.userRepository.findById(creatorId);
        if (!existingCreator) {
            return false;
        }
        return await SoapClient.getInstance().getAllSubscriberFromCreator(
            creatorId
        );
    }
}
