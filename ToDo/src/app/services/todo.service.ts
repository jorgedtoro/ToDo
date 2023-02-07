import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
//import { Storage, ref, getDownloadURL, listAll } from '@angular/fire/storage';
import { Todo } from '../interfaces/todo.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  images: any[] = [];
  arrTodos:Todo[]=[];
  listTitle:string='';
  
  constructor(
    
    //private storage: Storage,
    private firestore: Firestore
  ) {}

  //CRUD ToDo firestore
  addTodo(todo: Todo):Promise<any> {
    const todoRef = collection(this.firestore, 'todos');
    return addDoc(todoRef, todo);
  }
  
  //también podríamos gestionarlo con promesas
  getTodos(): Observable<Todo[]> {
    const todoRef = collection(this.firestore, 'todos');
    return collectionData(todoRef, { idField: 'id' }) as Observable<Todo[]>;
  }
  
  deleteTodo(pId: string) {
    const todoDocRef = doc(this.firestore, `todos/${pId}`);
    return deleteDoc(todoDocRef);
  }
  
  updateTodo(pId: string, favourite: boolean) {
    const todoDocRef = doc(this.firestore, `todos/${pId}`);
    return updateDoc(todoDocRef, { favourite: favourite });
  }
  
 
}


  //storage
  // async getImages() {
  //   const imagesRef = ref(this.storage, 'images');
  //   try {
  //     const allImages = await listAll(imagesRef);

  //     allImages.items.forEach(async (item) => {
  //       const url = await getDownloadURL(item);
  //       const name = await item.name;

  //       this.images.push({ url: url, name: name });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   return this.images;
  // }