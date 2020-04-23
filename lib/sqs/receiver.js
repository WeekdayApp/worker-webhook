"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const receiver = async (event) => {
    try {
        for (const record of event.Records) {
            console.log('ATTR: ', record.messageAttributes);
            console.log('BODY: ', record.body);
            const messageAttributes = record.messageAttributes;
            const outgoing = messageAttributes['outgoing'].stringValue;
            const token = messageAttributes['token'].stringValue;
            const payload = JSON.parse(messageAttributes['payload'].stringValue);
            await axios_1.default.post(`${outgoing}?token=${token}`, payload, {
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = receiver;
//# sourceMappingURL=receiver.js.map