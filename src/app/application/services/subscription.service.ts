import {UserRepository} from "../../interfaces/repositories/user.repository";
import {SoapClient} from "../../adapters/soap/soap.client";

export class SubscriptionService {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async subscribe(userId: number, creatorId: number): Promise<Boolean> {
        const existingUser = await this.userRepository.findById(userId);
        if (!existingUser) {
            return false;
        }
        const existingCreator = await this.userRepository.findById(creatorId);
        if (!existingCreator){
            return false;
        }
        return await SoapClient.getInstance().addCreatorSubscriberRelationship(existingCreator.id, existingUser.id);
    }
}