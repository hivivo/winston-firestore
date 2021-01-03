import TransportStream, { TransportStreamOptions } from 'winston-transport';
import firebase from 'firebase/app';
import 'firebase/firestore';

export interface FirestoreTransportOptions extends TransportStreamOptions {
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
  parentCollectionName: string;
  parentDocumentId: string;
  collectionName: string;
}

export class FirestoreTransport extends TransportStream {
  protected options: FirestoreTransportOptions;
  protected store: firebase.firestore.Firestore;

  constructor(options: FirestoreTransportOptions) {
    super(options);

    this.options = options;

    if (!firebase.apps.length) {
      firebase.initializeApp(this.options.firebaseConfig);
    }
    this.store = firebase.firestore();
  }

  async log(info: any, callback: () => void) {
    try {
      await this.store
        .collection(this.options.parentCollectionName)
        .doc(this.options.parentDocumentId)
        .collection(this.options.collectionName)
        .add(info);
      this.emit('logged', info);
    } catch (error) {
      this.emit('warn', error);
    }

    if (callback) {
      setImmediate(callback);
    }
  }
}
