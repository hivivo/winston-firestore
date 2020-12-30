import Transport from 'winston-transport';
import { LoggerOptions } from 'winston';
import firebase from 'firebase/app';
import 'firebase/firestore';

export interface FirestoreTransportOptions extends LoggerOptions {
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    databaseURL?: string;
    measurementId: string;
  };
  collectionName: string;
  documentId: string;
}

export class FirestoreTransport extends Transport {
  protected options: FirestoreTransportOptions;
  protected store: firebase.firestore.Firestore;

  constructor(options: FirestoreTransportOptions) {
    super(options);

    this.options = options;

    firebase.initializeApp(this.options.firebaseConfig);
    this.store = firebase.firestore();
  }

  async log(info: any, callback: () => void) {
    console.log(info);

    this.emit('logged', info);

    if (callback) {
      setImmediate(callback);
    }
  }
}
