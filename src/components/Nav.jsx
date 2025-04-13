export default function Nav({ articles, setArticle, currentArticleId }) {
  return (
    <nav>
      <h3>My Articles</h3>
      <div className="article-list">
        {!articles || articles.length === 0 ? (
          <p>No articles yet</p>
        ) : (
          articles.map((a) => (
            <div 
              key={a.id} 
              className={`article-item ${a.id === currentArticleId ? 'active' : ''}`}
              onClick={() => setArticle(a)}
            >
              {a.title}
            
            </div>
          ))
        )}
      </div>
    </nav>
  );
}