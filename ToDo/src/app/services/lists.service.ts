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

import { List } from '../interfaces/list.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(private firestore: Firestore) { }

  addList(list: List) {
    const listRef = collection(this.firestore, 'Lists');
    return addDoc(listRef, list);
  }
  getLists(): Observable<List[]> {
    const listRef = collection(this.firestore, 'Lists');
    return collectionData(listRef, { idField: 'id' }) as Observable<List[]>;
  }
  deleteList(pId: string) {
    const listDocRef = doc(this.firestore, `Lists/${pId}`);
    return deleteDoc(listDocRef);
  }
}
