import { firebaseServiceAccount } from "./firebase-admin-creds";
import * as admin from "firebase-admin";

let app = !admin.apps.length
  ? admin.initializeApp(
      {
        credential: admin.credential.cert({
          privateKey: firebaseServiceAccount.private_key.replace(/\\n/g, "\n"),
          clientEmail: firebaseServiceAccount.client_email,
          projectId: firebaseServiceAccount.project_id,
        }),
      },
      "admin-app"
    )
  : admin.app("admin-app");

const adminFirestore = admin.firestore(app);

export default adminFirestore;
