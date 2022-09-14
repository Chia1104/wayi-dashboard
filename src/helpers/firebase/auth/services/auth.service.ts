import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile as firebaseUpdateProfile,
  onIdTokenChanged,
} from "firebase/auth";
import { auth } from "../../firebase.config";
import type { Email, Password } from "@wanin/shared/types";
import type { User } from "firebase/auth";

export const login = async (
  email: Email,
  password: Password
): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUser = (): User | null => {
  try {
    return auth.currentUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const refreshToken = (): Promise<string> => {
  return new Promise((resolve) => {
    onIdTokenChanged(auth, (user) => {
      if (user) {
        const token = user.getIdToken();
        console.log("refreshToken", token);
        resolve(token);
      }
    });
  });
};

export const register = async (
  email: Email,
  password: Password,
  c_password: Password
): Promise<User | null> => {
  if (password !== c_password) return null;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProfile = async (
  displayName?: string,
  photoURL?: string
): Promise<void | null> => {
  try {
    const user = auth.currentUser;
    if (!user) return null;
    return firebaseUpdateProfile(user, { displayName, photoURL });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
