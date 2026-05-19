"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "@/services/firebase";

export async function loginWithEmail(email: string, password: string) {
  if (!auth || !isFirebaseConfigured) throw new Error("Firebase غير مهيأ بعد. أضف متغيرات البيئة.");
  return signInWithEmailAndPassword(auth, email, password);
}

export async function registerWithEmail(name: string, email: string, password: string) {
  if (!auth || !isFirebaseConfigured) throw new Error("Firebase غير مهيأ بعد. أضف متغيرات البيئة.");
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName: name });
  return credential;
}

export async function loginWithGoogle() {
  if (!auth || !isFirebaseConfigured) throw new Error("Firebase غير مهيأ بعد. أضف متغيرات البيئة.");
  return signInWithPopup(auth, googleProvider);
}

export async function logout() {
  if (!auth) return;
  await signOut(auth);
}

