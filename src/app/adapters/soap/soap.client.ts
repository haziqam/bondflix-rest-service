import {SoapUtils} from "../../utils/soap.utils";
export class SoapClient {
    private static instance: SoapClient;
    private soapUtils: SoapUtils;

    private constructor(url: string) {
        this.soapUtils = new SoapUtils(url);
    }

    public static getInstance(url?: string): SoapClient {
        if (!SoapClient.instance) {
            const soapServiceURL = process.env.SOAP_SERVICE_URL;
            if (url == null || url == '' && soapServiceURL != undefined) {
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
            arg2: b
        };
        return await this.soapUtils.call("add", args);
    }
}
