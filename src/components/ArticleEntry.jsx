


import { useState } from "react";

export default function ArticleEntry({ addArticle, setWriting, initialData = {} }) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    body: initialData.body || "",
    category: initialData.category || "technology",
    isFeatured: initialData.isFeatured || false,
    readTime: initialData.readTime || 5,
    tags: initialData.tags || []
  });
  const [error, setError] = useState(null);

  const categories = [
    "Web Development",
    "Mobile Development",
    "Cloud Computing",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Cybersecurity",
    "Blockchain",
    "DevOps",
    "UI/UX Design",
    "Game Development",
    "Programming Languages"
  ];

  const allTags = [
    "React",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "AWS",
    "Docker",
    "Kubernetes",
    "TensorFlow",
    "GraphQL",
    "REST API",
    "Next.js",
    "Flutter",
    "Swift"
  ];

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function handleTagChange(tag) {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  }

  function submit(e) {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim() || !formData.body.trim()) {
      setError("Title and body are required");
      return;
    }

    addArticle(formData);
  }

  return (
    <div className="article-entry">
      <form onSubmit={submit}>
        <h2>{initialData.title ? "Edit Article" : "Create New Article"}</h2>

        {error && <div className="error">{error}</div>}

        {/* Text Input */}
        <div className="form-group">
          <label htmlFor="title">Title*</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter article title"
            required
          />
        </div>

        {/* Textarea */}
        <div className="form-group">
          <label htmlFor="body">Content*</label>
          <textarea
            id="body"
            name="body"
            rows="10"
            value={formData.body}
            onChange={handleChange}
            placeholder="Write your article content here..."
            required
          />
        </div>

        {/* Select Dropdown */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat.toLowerCase().replace(/\s+/g, '-')}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Number Input */}
        <div className="form-group">
          <label htmlFor="readTime">Estimated Read Time (minutes)</label>
          <input
            id="readTime"
            name="readTime"
            type="number"
            min="1"
            max="60"
            value={formData.readTime}
            onChange={handleChange}
          />
        </div>

        {/* Checkbox */}
        <div className="form-group checkbox-group">
          <input
            id="isFeatured"
            name="isFeatured"
            type="checkbox"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
          <label htmlFor="isFeatured">Feature this article</label>
        </div>

        {/* Multiple Checkboxes (Tags) */}
        <div className="form-group">
          <label>Tags</label>
          <div className="tags-container">
            {allTags.map(tag => (
              <div key={tag} className="tag-option">
                <input
                  id={`tag-${tag}`}
                  type="checkbox"
                  checked={formData.tags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
                <label htmlFor={`tag-${tag}`}>{tag}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn" style={{ marginRight: "10px" }}>
            {initialData.title ? "Update Article" : "Publish Article"}
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setWriting(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}