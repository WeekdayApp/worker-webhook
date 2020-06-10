import { SQSHandler, SQSMessageAttributes, SQSEvent } from 'aws-lambda';
import axios from 'axios'

const receiver: SQSHandler = async (event: SQSEvent): Promise<any> => {
  console.log('SQSHandler Invoked')

  for (const record of event.Records) {
    console.log('ATTR: ', record.messageAttributes);
    console.log('BODY: ', record.body);
    console.log('SQSHandler messageId: ', record.messageId);

    const messageAttributes: SQSMessageAttributes = record.messageAttributes;
    const outgoing: string = messageAttributes['outgoing'].stringValue;
    const token: string = messageAttributes['token'].stringValue;
    const payload: any = JSON.parse(messageAttributes['payload'].stringValue);

    const promise = axios.post(`${outgoing}?token=${token}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    })

    return promise
  }
};

export default receiver;
