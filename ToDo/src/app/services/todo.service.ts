import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Storage, ref, getDownloadURL, listAll } from '@angular/fire/storage';
import { Todo } from '../interfaces/todo.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  images: any[] = [];
  constructor(
    private auth: Auth,
    private storage: Storage,
    private firestore: Firestore
  ) {}

  //auth register login and logout
  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  logOut() {
    return signOut(this.auth);
  }
  //storage
  async getImages() {
    const imagesRef = ref(this.storage, 'images');

    const allImages = await listAll(imagesRef);

    allImages.items.forEach(async (item) => {
      const url = await getDownloadURL(item);
      const name = await item.name;

      this.images.push({ url: url, name: name });
    });
    return this.images;
  }

  //CRUD todo firestore
  addTodo(todo: Todo) {
    const todoRef = collection(this.firestore, 'todos');
    return addDoc(todoRef, todo);
  }

  getTodos(): Observable<Todo[]> {
    const todoRef = collection(this.firestore, 'todos');
    return collectionData(todoRef, { idField: 'id' }) as Observable<Todo[]>;
  }
}
