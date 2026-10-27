import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProfile, Order } from '../types';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Firestore with custom Database ID
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Connection verification test (as mandated by guidelines)
async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or initializing.');
    }
  }
}
testFirestoreConnection();

/**
 * Sign in with Google Popup
 */
export async function signInWithGoogle(): Promise<User | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Sync profile to Firestore
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        const newProfile: UserProfile = {
          uid: user.uid,
          name: user.displayName || 'Farmer',
          email: user.email || '',
          photoURL: user.photoURL || '',
          phone: user.phoneNumber || '',
          createdAt: new Date().toISOString()
        };
        await setDoc(userRef, newProfile);
      }
    }
    return user;
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
}

/**
 * Sign Out
 */
export async function logOut(): Promise<void> {
  await signOut(auth);
}

/**
 * Save Order to Firestore
 */
export async function saveOrderToFirestore(order: Order): Promise<void> {
  try {
    const orderRef = doc(db, 'orders', order.id);
    await setDoc(orderRef, order);
  } catch (error) {
    console.error('Failed to save order to Firestore:', error);
    throw error;
  }
}

/**
 * Fetch orders for current logged-in user
 */
export async function fetchUserOrders(userId: string): Promise<Order[]> {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];
    querySnapshot.forEach((docSnap) => {
      orders.push(docSnap.data() as Order);
    });
    // Sort newest first
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return orders;
  } catch (error) {
    console.error('Failed to fetch user orders:', error);
    return [];
  }
}

/**
 * Save dealer partnership inquiry to Firestore
 */
export async function saveDealerInquiry(inquiry: {
  shopName: string;
  ownerName: string;
  phone: string;
  district: string;
  taluka?: string;
  gstNumber?: string;
  annualTurnover?: string;
}): Promise<void> {
  const inquiryId = `inq_${Date.now()}`;
  const ref = doc(db, 'dealer_inquiries', inquiryId);
  await setDoc(ref, {
    id: inquiryId,
    ...inquiry,
    createdAt: new Date().toISOString()
  });
}

/**
 * Save customer contact message to Firestore
 */
export async function saveContactMessage(msg: {
  name: string;
  phone: string;
  email?: string;
  message: string;
}): Promise<void> {
  const messageId = `msg_${Date.now()}`;
  const ref = doc(db, 'contact_messages', messageId);
  await setDoc(ref, {
    id: messageId,
    ...msg,
    createdAt: new Date().toISOString()
  });
}
