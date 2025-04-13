import { db, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "./firebase";

export async function createArticle(articleData, userId) {
  const articleWithMetadata = {
    title: '',
    body: '',
    category: 'technology',
    isFeatured: false,
    readTime: 5,
    tags: [],
    ...articleData,
    date: new Date().toISOString(),
    userId,
    likes: 0,
    comments: []
  };
  
  const docRef = await addDoc(collection(db, "articles"), articleWithMetadata);
  return { id: docRef.id, ...articleWithMetadata };
}

export async function updateArticle(id, articleData) {
  await updateDoc(doc(db, "articles", id), {
    ...articleData,
    lastUpdated: new Date().toISOString()
  });
}

export async function fetchArticles() {
  const querySnapshot = await getDocs(collection(db, "articles"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}


export async function deleteArticle(id) {
  await deleteDoc(doc(db, "articles", id));
}


