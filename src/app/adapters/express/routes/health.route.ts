import express from 'express';
import {ResponseUtil} from "../../../utils/response.utils";
import {SoapClient} from "../../soap/soap.client";

const healthRoutes = express.Router();

healthRoutes.get('/', (req, res) => {
    res.json({ message: 'This is a simple GET request handler' });
});

healthRoutes.post('/', async (req, res) => {
    const hasil = await SoapClient.getInstance().addCreatorSubscriberRelationship(1, 123)
    if (hasil){
        console.log("yey")
    } else {
        console.log("no")
    }
    return ResponseUtil.sendResponse(res, 200, "Berhasil", hasil);

} )
export default healthRoutes;