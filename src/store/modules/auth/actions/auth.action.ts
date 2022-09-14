import {
  getUser,
  login,
  logout,
  updateProfile,
} from "@wanin/helpers/firebase/auth/services";
import { type ActionContext } from "vuex";
import { type AuthState } from "../state";
import { type RootState } from "@wanin/store";
import type { Email, Password } from "@wanin/shared/types";
import { FirebaseError } from "firebase/app";

export const getUserAction = (context: ActionContext<AuthState, RootState>) => {
  context.commit("beginLogin");
  try {
    const user = getUser();
    user
      ? context.commit("loginSuccess", user)
      : context.commit("loginError", "User not found");
  } catch (e) {
    if (e instanceof FirebaseError) {
      context.commit("loginError", e.code);
      return;
    }
    context.commit("loginError", "Login error");
  }
};

export const loginAction = async (
  context: ActionContext<AuthState, RootState>,
  { email, password }: { email: Email; password: Password }
) => {
  context.commit("beginLogin");
  try {
    const user = await login(email, password);
    user
      ? context.commit("loginSuccess", user)
      : context.commit("loginError", "User not found");
  } catch (e) {
    if (e instanceof FirebaseError) {
      context.commit("loginError", e.code);
      return;
    }
    context.commit("loginError", "Login error");
  }
};

export const logoutAction = async (
  context: ActionContext<AuthState, RootState>
) => {
  try {
    logout().then(() => context.commit("logout"));
  } catch (e) {
    if (e instanceof FirebaseError) {
      context.commit("loginError", e.code);
      return;
    }
    context.commit("loginError", "Logout error");
  }
};

export const updateProfileAction = async (
  context: ActionContext<AuthState, RootState>,
  { displayName, photoURL }: { displayName?: string; photoURL?: string }
) => {
  try {
    updateProfile(displayName, photoURL).then(() =>
      context.commit("loginSuccess", getUser())
    );
  } catch (e) {
    if (e instanceof FirebaseError) {
      context.commit("loginError", e.code);
      return;
    }
    context.commit("loginError", "Update profile error");
  }
};
