import {
  cert,
  getApps,
  initializeApp,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps()?.length) {
  initializeApp({
    credential: cert(
      JSON.parse(process.env.SERVICE_ACCOUNT as string) as ServiceAccount
    ),
  });
}

export const db = getFirestore();
