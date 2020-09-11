import * as admin from 'firebase-admin';
import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';

import { check, validationResult } from 'express-validator';

admin.initializeApp();

const welcomeMessage = (token: string) => {
  const title = 'Prog blog';
  const body = 'Welcome aboard. We\'ll be in touch. :)';
  const icon = 'https://rayros.github.io/assets/icons/192x192.png'
  const imageUrl = 'https://rayros.github.io/assets/home/title-image.png';
  const message: admin.messaging.Message = {
    notification: {
      title,
      body,
      imageUrl,
    },
    webpush: {
      notification: {
        title,
        body,
        imageUrl,
        icon
      },
    },
    token,
  };
  return message;
}

const app = express();
app.use(cors({ origin: true }));
const path = '/subscribe/topic/all';
app.get(path, (_, res) => res.send('ok'));
app.post(
  path,
  [check('token').isString()],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      await admin.messaging().subscribeToTopic(req.body.token, 'all')
      await admin.messaging().send(welcomeMessage(req.body.token))
      console.log(req.body.token);
      return res.status(200).send({ message: 'Successfully subscribed to topic: all' });
    } catch (error) {
      return res.status(500).json({ errors: [error] });
    }
  }
);

exports.notifications = functions.https.onRequest(app);