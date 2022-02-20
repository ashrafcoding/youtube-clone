import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AppDispatch } from "./store";
import auth from "../firebase";
import { loginRequest, loginSuccess, loginFail, loadProfile } from "./slice";

export const login = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(loginRequest());
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;
    const profile = {
      name: result.user?.displayName,
      photoUrl: result.user?.photoURL,
    };
    dispatch(loginSuccess({ accessToken, user: profile }));
    dispatch(loadProfile({ accessToken, user: profile }));
  } catch (error) {
    console.log(error);
    dispatch(loginFail(error));
  }
};
