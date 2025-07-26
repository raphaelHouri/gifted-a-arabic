import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export const getDocument = async (docPath) => {
  const refDoc = doc(FIRESTORE_DB, docPath);
  const document = await getDoc(refDoc);
  if (document.exists()) {
    // console.log(document.data());
    return document.data();
  }
};

export const getOrCreateUserDocument = async (docPath, user) => {
  const refDoc = doc(FIRESTORE_DB, docPath);
  try {
    const document = await getDoc(refDoc);
    if (document.exists()) {
      // console.log(document.data());
      return document.data();
    } else {
      const newUser = {
        email: user?.email,
        name: user?.displayName,
        isPremium: false,
        premiumEndTime: null,
        premiumStartTime: null,
        couponId: null,
        solutions: {},
        createTime: user?.metadata?.creationTime,
        phoneNumber: user?.phoneNumber,
        photoURL: user?.photoURL,
        settings: { timer: true, showResult: false, avatar: null },
      };

      await setDoc(refDoc, newUser);
      // console.log(newUser);
      return newUser;
    }
  } catch (e) {
    // need to display some error message
    return null;
  }
};

export const getUserDocument = async (docPath) => {
  const refDoc = doc(FIRESTORE_DB, docPath);
  const document = await getDoc(refDoc);
  if (document.exists()) {
    return document.data();
  }
};

export const updateDocument = async (docPath, data, internalPath) => {
  try {
    const refDoc = doc(FIRESTORE_DB, docPath);
    await updateDoc(refDoc, { [internalPath]: data });
    // console.log("update");
    return true;
  } catch (error) {
    return false;
  }
};

export const addFeedback = async (docPath, document) => {
  try {
    await addDoc(collection(FIRESTORE_DB, docPath), document);
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteDocument = async (docPath) => {
  try {
    const refDoc = doc(FIRESTORE_DB, docPath);
    await deleteDoc(refDoc);
    // console.log("delete user");
    return true;
  } catch (error) {
    return false;
  }
};
