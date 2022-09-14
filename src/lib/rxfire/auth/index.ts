import { type Auth } from "firebase/auth";
import {
  onAuthStateChanged,
  onIdTokenChanged,
  getIdToken,
} from "firebase/auth";
import { Observable, from, of } from "rxjs";
import { switchMap } from "rxjs/operators";

type User = import("firebase/auth").User;

export const authState = (auth: Auth): Observable<User | null> => {
  return new Observable((subscriber) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      subscriber.next.bind(subscriber),
      subscriber.error.bind(subscriber),
      subscriber.complete.bind(subscriber)
    );
    return { unsubscribe };
  });
};

export const user = (auth: Auth): Observable<User | null> => {
  return new Observable((subscriber) => {
    const unsubscribe = onIdTokenChanged(
      auth,
      subscriber.next.bind(subscriber),
      subscriber.error.bind(subscriber),
      subscriber.complete.bind(subscriber)
    );
    return { unsubscribe };
  });
};

export const idToken = (auth: Auth): Observable<string | null> => {
  return user(auth).pipe(
    switchMap((user) => (user ? from(getIdToken(user)) : of(null)))
  );
};
