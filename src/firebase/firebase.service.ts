// src/firebase/firebase.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private firestore: admin.firestore.Firestore;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const firebaseConfig = {
      type: 'service_account',
      project_id: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      private_key: this.configService.get<string>('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
      client_email: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
    };

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
        projectId: firebaseConfig.project_id,
      });
    }

    this.firestore = admin.firestore();
  }

  getFirestore(): admin.firestore.Firestore {
    return this.firestore;
  }

  async createDocument(collection: string, data: any, id?: string): Promise<string> {
    try {
      if (id) {
        await this.firestore.collection(collection).doc(id).set(data);
        return id;
      } else {
        const docRef = await this.firestore.collection(collection).add(data);
        return docRef.id;
      }
    } catch (error) {
      throw new Error(`Erro ao criar documento: ${error.message}`);
    }
  }

  
}