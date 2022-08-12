import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();
  const providerGitHub = new GithubAuthProvider();

  const googleAuthentication = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      }).catch((error) => {
        console.log('error', error)
      });

  }
  const handelSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      }).catch((error) => {
        setUser({});
      });
  }

  //github
  const handelSignInGithub = () => {
    signInWithPopup(auth, providerGitHub)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        setUser(user);
        console.log(user)
        // ...
      }).catch((error) => {
        console.log('error with Github', error)
      });
  }

  return (
    <div className="App">
      {
        user.uid ? <button onClick={handelSignOut}>Sign Out</button>
          :
          <>
            <button onClick={googleAuthentication}>Google Sign In</button>
            <button onClick={handelSignInGithub}>GitHub Sign In</button>
          </>

      }

      <h2>Name: {user.displayName}</h2>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="" />

    </div>
  );
}

export default App;
