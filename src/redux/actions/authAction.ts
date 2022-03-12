import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AppDispatch } from "../store";
import auth from "../../firebase";
import { loginRequest, loginSuccess, loginFail, loadProfile, signOut } from "../slices/sliceAuth";


export const login = () => async (dispatch: AppDispatch) => {
  try {    
    dispatch(loginRequest());
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;
    const profile = {
      name: result.user?.displayName,
      photoUrl: result.user?.photoURL,
    };

    accessToken && sessionStorage.setItem("access-token", accessToken);
    sessionStorage.setItem("user", JSON.stringify(profile));
    dispatch(loginSuccess({ accessToken, user: profile }));
    dispatch(loadProfile({ accessToken, user: profile }));
  } catch (error) {
    console.log(error);
    dispatch(loginFail(error));
  }
};

export const logOut = () => async (dispatch: AppDispatch) => {
  try {
    await auth.signOut();
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("user");
    dispatch(signOut());
    
  } catch (error) {
    console.log(error);
  }
}
