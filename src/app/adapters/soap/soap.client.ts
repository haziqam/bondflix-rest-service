import { SoapUtils } from "../../utils/soap.utils";

export class SoapClient {
    private static instance: SoapClient;
    private soapUtils: SoapUtils;

    private constructor(url: string) {
        this.soapUtils = new SoapUtils(url);
    }

    public static getInstance(url?: string): SoapClient {
        if (!SoapClient.instance) {
            const soapServiceURL = process.env.SOAP_SERVICE_URL;
            if (url == null || (url == "" && soapServiceURL != undefined)) {
                // @ts-ignore
                SoapClient.instance = new SoapClient(soapServiceURL);
            } else {
                SoapClient.instance = new SoapClient(url);
            }
        }
        return SoapClient.instance;
    }

    public async getAdd(a: number, b: number) {
        const args = {
            arg1: a,
            arg2: b,
        };
        return await this.soapUtils.call("add", args);
    }

    public async addCreatorSubscriberRelationship(
        creatorId: number,
        subscriberId: number
    ) {
        const args = {
            creatorId,
            subscriberId,
        };

        return await this.soapUtils.call(
            "addCreatorSubscriberRelationship",
            args
        );
    }

    public async isUserSubscribedToCreator(userId: number, creatorId: number) {
        const args = {
            userId,
            creatorId,
        };

        return await this.soapUtils.call("isUserSubscribedToCreator", args);
    }

    public async getSubscribedUsers() {
        const args = {};
        return await this.soapUtils.call("getSubscribedUsers", args);
    }

    public async updateSubscriptionByCreatorId(
        creatorId: number,
        subscriptionStatus: boolean
    ) {
        const args = { creatorId, subscriptionStatus };
        return await this.soapUtils.call("updateSubscriptionByCreatorId", args);
    }

    public async getSubscribersByCreatorId(creatorId: number) {
        const args = { creatorId };
        return await this.soapUtils.call("getSubscribersByCreatorId", args);
    }

    public async getCreatorsBySubscriberId(subscriberId: number) {
        const args = { subscriberId };
        return await this.soapUtils.call("getCreatorsBySubscriberId", args);
    }
}
