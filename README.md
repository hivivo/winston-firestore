# winston-firestore

A Winston transport to allow sending logs into Firebase Firestore

## Usage

### Set up a new Web App in Firebase (Optional)

It's a good practice to set up a new Web app in Firebase to produce logs. You can also use your existing app instead.

You'll need the following configurations later:

```javascript
var firebaseConfig = {
  apiKey: "AIzaSyAThisIsASampleAPIkeyELHHZNZu8",
  authDomain: "someapp.firebaseapp.com",
  projectId: "someapp",
  storageBucket: "someapp.appspot.com",
  messagingSenderId: "508123456421",
  appId: "1:508123456421:web:42141234c987abcdefgfcc",
  measurementId: "G-WB0ABCD1B8"
};
```

### Install winston-firestore

Install the package by

```bash
npm install winston-firestore
```

or

```bash
yarn add winston-firestore
```

Add `FirestoreTransport` transport into winston:

```typescript
import { FirestoreTransport } from 'winston-firestore';

  winston.createLogger({
    ...
    transports: [
      ...,
      new FirestoreTransport({
        firebaseConfig: {
          apiKey: "AIzaSyAThisIsASampleAPIkeyELHHZNZu8",
          authDomain: "someapp.firebaseapp.com",
          projectId: "someapp",
          storageBucket: "someapp.appspot.com",
          messagingSenderId: "508123456421",
          appId: "1:508123456421:web:42141234c987abcdefgfcc",
          measurementId: "G-WB0ABCD1B8"
        },
        parentCollectionName: '<collection>',
        parentDocumentId: '<doucment>',
        collectionName: '<name of the logs collection>',
        ...other transport options...
      }),
      ...,
    ],
    ...
  })
```

Use `firebaseConfig` from the previous step.

Now we need to configure three necessary variables to make it work.

Our transport will push any log into a sub collection of a specified firestore document.

For example, if you want to save all logs into `logs` sub collection of `/Computers/mycomputer` document, you will need to configure like this:

```typescript
parentCollectionName: 'Computers',
parentDocumentId: 'mycomputer',
collectionName: 'logs',
```

and all logs will be pushed into `/Computers/mycomputer/logs` sub collection with auto generated ids.

### Setup proper rules for Firestore

You'll need to setup proper rules for Firestore to receive those logs. An easy but dangerous way could be:

```
match /Computers/{computer} {
  match /logs/{log} {
    allow write: if true;
  }
  allow read, write: if false;
}
```

Please consider security risks thoughtfully.
