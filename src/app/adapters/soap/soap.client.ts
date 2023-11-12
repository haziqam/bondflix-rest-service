import {SoapUtils} from "../../utils/soap.utils";
import {UserRepository} from "../../interfaces/repositories/user.repository";

export class SoapClient {
    private static instance: SoapClient;
    private soapUtils: SoapUtils;
    private userRepository: UserRepository;

    private constructor(url: string, userRepository: UserRepository) {
        this.soapUtils = new SoapUtils(url);
        this.userRepository = userRepository;
    }

    // @ts-ignore
    public static getInstance(url?: string, userRepository?: UserRepository): SoapClient {
        if (!SoapClient.instance) {
            const soapServiceURL = process.env.SOAP_SERVICE_URL;
            if (url == null || url == '' && soapServiceURL != undefined && userRepository != undefined) {
                // @ts-ignore
                SoapClient.instance = new SoapClient(soapServiceURL);
            } else {
                // @ts-ignore
                SoapClient.instance = new SoapClient(url, userRepository);
            }
        }
        return SoapClient.instance;
    }

    public async getAdd(a: number, b: number) {
        const args = {
            arg1: a,
            arg2: b
        };
        return await this.soapUtils.call("add", args);
    }

    public async addCreatorSubscriberRelationship(creatorId: number, subscriberId: number) {
        const args= {
            creatorId: creatorId,
            subscriberId: subscriberId
        }
        return await this.soapUtils.call("addCreatorSubscriberRelationship", args)
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
}
