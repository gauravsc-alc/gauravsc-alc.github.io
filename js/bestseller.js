document.addEventListener("DOMContentLoaded", function() {
  // Use a global injected array (set by your template) or fallback to an empty array.
  // In your layout/template inject books like:
  // <script>window.BESTSELLER_BOOKS = {{ site.books | jsonify }};</script>
  const books = window.BESTSELLER_BOOKS || [];

  const popup = document.getElementById('bestseller-popup');
  if (!popup) return;

  if (books.length > 0) {
    setTimeout(function() {
      const idx = Math.floor(Math.random() * books.length);
      const book = books[idx] || {};

      const imgEl = document.getElementById('bestseller-img');
      const titleEl = document.getElementById('bestseller-title');
      const authorEl = document.getElementById('bestseller-author');
      const amazonEl = document.getElementById('bestseller-amazon');
      const detailsEl = document.getElementById('bestseller-view-details');

      if (imgEl && book.cover) imgEl.src = book.cover;
      if (titleEl) titleEl.textContent = book.title || '';
      if (authorEl) authorEl.textContent = book.author ? "by " + book.author : '';
      if (amazonEl && book.amazon) amazonEl.href = book.amazon;
      if (detailsEl && book.url) detailsEl.href = book.url;

      popup.style.display = 'flex';
    }, 3000); // Show after 3 seconds
  }

  // Close popup when clicking outside
  popup.addEventListener('click', function(e) {
    if (e.target === this) {
      this.style.display = 'none';
    }
  });
});