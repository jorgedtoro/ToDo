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
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Storage, ref, getDownloadURL, listAll } from '@angular/fire/storage';
import { Todo } from '../interfaces/todo.interface';
import { Observable } from 'rxjs';
import { List } from '../interfaces/list.interface';

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
    try {
      const allImages = await listAll(imagesRef);

      allImages.items.forEach(async (item) => {
        const url = await getDownloadURL(item);
        const name = await item.name;

        this.images.push({ url: url, name: name });
      });
    } catch (error) {
      console.log(error);
    }

    return this.images;
  }

  //CRUD todo and List firestore
  addTodo(todo: Todo) {
    const todoRef = collection(this.firestore, 'todos');
    return addDoc(todoRef, todo);
  }
  addList(list: List) {
    const listRef = collection(this.firestore, 'Lists');
    return addDoc(listRef, list);
  }
  getTodos(): Observable<Todo[]> {
    const todoRef = collection(this.firestore, 'todos');
    return collectionData(todoRef, { idField: 'id' }) as Observable<Todo[]>;
  }
  getLists(): Observable<List[]> {
    const listRef = collection(this.firestore, 'Lists');
    return collectionData(listRef, { idField: 'id' }) as Observable<List[]>;
  }
  deleteTodo(pId: string) {
    const todoDocRef = doc(this.firestore, `todos/${pId}`);
    return deleteDoc(todoDocRef);
  }
  deleteList(pId: string) {
    const listDocRef = doc(this.firestore, `Lists/${pId}`);
    return deleteDoc(listDocRef);
  }
  updateTodo(pId: string, favourite: boolean) {
    const todoDocRef = doc(this.firestore, `todos/${pId}`);
    return updateDoc(todoDocRef, { favourite: favourite });
  }
}
