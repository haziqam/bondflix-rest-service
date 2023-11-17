import { UserRepository } from "../../interfaces/repositories/user.repository";
import { SoapClient } from "../../adapters/soap/soap.client";

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

    async getSubscribers(creatorId: number): Promise<Object | null> {
        const existingCreator = await this.userRepository.findById(creatorId);
        if (!existingCreator) {
            return false;
        }
        const subscriberIds =
            (await SoapClient.getInstance().getAllSubscriberFromCreator(
                creatorId
            )) as any;

        const subscriberIdList: number[] = [];

        for (const key in subscriberIds) {
            // console.log(subscriberIds[key]);
            subscriberIdList.push(parseInt(subscriberIds[key], 10));
        }

        // console.log(subscriberIdList)
        // return await this.userRepository.findById(subscriberIdList[0])

        return await this.userRepository.findUsersByIds(subscriberIdList);
    }
}
