import firebase from '@firebase/app'
import '@firebase/firestore'

const config = {
  apiKey: 'AIzaSyAxKYfYxUQd03MiVRvNNjH_Tl82s_2KZN4',
  authDomain: '<authDomain>',
  databaseUrl: '<databaseURL>',
  projectId: 'misimi-79c83',
  storageBucket: '',
  messagingSenderId: '<messageingSenderId>',
}

const app = firebase.initializeApp(config)
const firestore = firebase.firestore(app)

export default firestore
