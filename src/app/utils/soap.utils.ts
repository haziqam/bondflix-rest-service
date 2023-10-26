import axios from "axios";
import {xml2json} from "xml-js";

export class SoapUtils {
    private readonly url: string;

    constructor(url: string) {
        this.url = url;
    }

    public async call(method: string, params?: Object) {
        const headers = {
            'Content-Type': 'text/xml;charset=UTF-8',
            'api-key': process.env.SOAP_API_KEY
        }

        const request = this.createRequest(method, params);
        try {
            const response = await axios.post(this.url, request, {headers})
            const val = this.unmarshall(response.data, method);
            return this.flatten(val);
        } catch (error: any) {
            console.log("Error marshalling the XML response");
        }
    }

    private createRequest(method: string, params?: Object) {
        const args = this.buildArgument(params);

        return `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://service.Bondflix.org/">
         <soapenv:Header/>
         <soapenv:Body>
            <tns:${method}>
               ${args}
            </tns:${method}>
         </soapenv:Body>
      </soapenv:Envelope>
    `;
    }


    private buildArgument(params?: Object): string {
        if (!params){
            return ''
        }

        const argsArray = Object.entries(params).map(([key, value]) => {
            return `<${key}>${value}</${key}>`;
        });

        return argsArray.join('');
    }

    private unmarshall(xml: string, method: string): JSON {
        const json = JSON.parse(xml2json(xml, {compact: true}))
        return json['S:Envelope']['S:Body'][`ns2:${method}Response`]['return'];
    }
    private flatten(json: any) {
        const response: any = {};
        if (json._text) {
            return response[0] = json._text;
        }

        Object.keys(json).forEach((key) => {
            const value = json[key];

            if (value && value._text) {
                response[key] = value._text;
            } else {
                response[key] = value;
            }
        });
        return response;
    }
}