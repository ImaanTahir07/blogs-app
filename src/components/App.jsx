import { useEffect, useState } from "react";
import { auth, provider, signInWithPopup, signOut } from "../services/firebase";
import Nav from "./Nav";
import Article from "./Article";
import ArticleEntry from "./ArticleEntry";
import { fetchArticles, createArticle, updateArticle, deleteArticle } from "../services/articleService";
import "./App.css";
import ErrorBoundary from "./ErrorBoundaries";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [writing, setWriting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        setUser(user);
        if (user) {
          const articlesData = await fetchArticles();
          setArticles(articlesData);
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      setError(null);
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to login. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setArticles([]);
      setArticle(null);
    } catch (error) {
      console.error("Logout error:", error);
      setError("Failed to logout");
    }
  };

  const addArticle = async (articleData) => {
    try {
      setError(null);
      const newArticle = await createArticle(articleData, user.uid);
      setArticle(newArticle);
      setArticles([newArticle, ...articles]);
      setWriting(false);
    } catch (err) {
      console.error("Error creating article:", err);
      setError("Failed to create article");
    }
  };

  const handleUpdateArticle = async (articleData) => {
    try {
      setError(null);
      await updateArticle(article.id, articleData);
      const updatedArticles = articles.map(a => 
        a.id === article.id ? { ...a, ...articleData } : a
      );
      setArticles(updatedArticles);
      setArticle({ ...article, ...articleData });
      setEditing(false);
    } catch (err) {
      console.error("Error updating article:", err);
      setError("Failed to update article");
    }
  };

  const handleDeleteArticle = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteArticle(article.id);
        const updatedArticles = articles.filter(a => a.id !== article.id);
        setArticles(updatedArticles);
        setArticle(updatedArticles[0] || null); // Select first article or null
      } catch (err) {
        console.error("Error deleting article:", err);
        setError("Failed to delete article");
      }
    }
  };

  return (
    <div className="App">
      <header>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <div className="logo">BlogSphere</div>
        <div className="auth-section">
          {user ? (
            <>
              <span className="username">Welcome, {user.displayName}</span>
              <button className="btn" onClick={() => setWriting(true)}>
                New Article
              </button>
              <button className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="btn" onClick={handleLogin}>
              Login with Google
            </button>
          )}
        </div>
      </header>

      {error && (
        <div className="global-error">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <ErrorBoundary>
        <Nav
          articles={articles}
          setArticle={setArticle}
          currentArticleId={article?.id}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : writing ? (
          <ArticleEntry 
            addArticle={addArticle} 
            setWriting={setWriting} 
          />
        ) : editing ? (
          <ArticleEntry
            addArticle={handleUpdateArticle}
            setWriting={setEditing}
            initialData={{
              title: article.title,
              body: article.body,
              category: article.category,
              isFeatured: article.isFeatured,
              readTime: article.readTime,
              tags: article.tags
            }}
          />
        ) : (
          <Article
            article={article}
            user={user}
            onEdit={() => setEditing(true)}
            onDelete={handleDeleteArticle}
          />
        )}
      </ErrorBoundary>
    </div>
  );
}