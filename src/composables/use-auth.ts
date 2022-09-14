import { type ComputedRef, type Ref, computed, ref } from "vue";
import type { Auth, User } from "firebase/auth";

export interface UseFirebaseAuthOptions {
  isAuthenticated: ComputedRef<boolean>;
  user: Ref<User | null>;
}

export const useAuth = (auth: Auth): UseFirebaseAuthOptions => {
  const user = ref<User | null>(auth.currentUser);
  const isAuthenticated = computed(() => !!user.value);

  auth.onIdTokenChanged((authUser) => (user.value = authUser));

  return {
    isAuthenticated,
    user,
  };
};
