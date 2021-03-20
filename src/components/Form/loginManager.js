import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';


export const initializeFirebaseApp = () => {
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
}

export const handleSignIn = (user,provider) => {
  return firebase.auth().signInWithPopup(provider).then((result) => {
      var {displayName, email} = result.user;
      const userInfo = {
          name: displayName,
          email: email,
          error: '',
          success: true
      }
      return userInfo
      
  }).catch( error => {
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo
  });
}

export const handleSignInWithEmail = (user) => {
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        const {displayName, email} = userCredential.user;
        const userInfo = {
          name: displayName,
          email: email,
          error: '',
          success: true
          }
        return userInfo
      })
      .catch((error) => {
          const newUserInfo = {...user};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;
      });
}

export const handleSignUpWithEmail = (user) => {
  return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
            var {displayName, email} = userCredential.user;
            const userInfo = {
                name: displayName,
                email: email,
                error: '',
                success: true
            }
            return userInfo
        })
        .catch((error) => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo
        });
}

export const handleLogOut = (user) => {
  return firebase.auth().signOut().then(() => {
       const userInfo = {
           name: '',
           email: '',
           error: '',
           success: false
       }
      return userInfo
     }).catch((error) => {
       const newUserInfo = {...user};
       newUserInfo.error = error.message;
       newUserInfo.success = false;
       return  newUserInfo;
     });
}

export const onBlurHandler = (user, event) => {
  const {name, value} = event.target;
        const newUserInfo = {...user};
        newUserInfo[name] = value;
        return newUserInfo;
}