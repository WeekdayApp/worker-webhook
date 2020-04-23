import { SQSHandler, SQSMessageAttributes } from 'aws-lambda';
import axios from 'axios'

const receiver: SQSHandler = async (event) => {
  try {
    for (const record of event.Records) {
      console.log('ATTR: ', record.messageAttributes);
      console.log('BODY: ', record.body);

      const messageAttributes: SQSMessageAttributes = record.messageAttributes;
      const outgoing: string = messageAttributes['outgoing'].stringValue;
      const token: string = messageAttributes['token'].stringValue;
      const payload: any = JSON.parse(messageAttributes['payload'].stringValue);

      await axios.post(`${outgoing}?token=${token}`, payload, {
        headers: { 'Content-Type': 'application/json' },
      })
    }
  } catch (error) {
    console.log(error);
  }
};

export default receiver;
