

export default function Article({ article, user, onEdit, onDelete }) {
  if (!article) {
    return (
      <article className="empty-state">
        <h2>Welcome to BlogSphere</h2>
        <p>Select an article from the sidebar or create a new one to get started.</p>
      </article>
    );
  }

  return (
    <article>
      <section>
        {article.isFeatured && (
          <div className="featured-badge">⭐ Featured</div>
        )}
        <h2>{article.title}</h2>

        <div className="article-meta">
          <span className="category-badge">
            {article.category.split('-').map(word =>
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </span>
          <span className="read-time">{article.readTime} min read</span>
          <span className="date">
            Posted: {new Date(article.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        {article.tags?.length > 0 && (
          <div className="tags">
            {article.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="body">{article.body}</div>

        {user?.uid === article.userId && (
          <div className="article-actions" style={{ marginTop: "20px" }}>
            <button className="btn" onClick={onEdit} style={{ marginRight: "10px" }}>
              Edit
            </button>
            <button className="btn btn-outline" onClick={onDelete}>
              Delete
            </button>
          </div>
        )}
      </section>
    </article>
  );
}