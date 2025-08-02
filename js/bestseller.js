document.addEventListener("DOMContentLoaded", function() {
  // Bestseller random pop-up
  const books = [
    {% for book in site.books %}
      {
        title: "{{ book.title | escape }}",
        author: "{{ book.author | escape }}",
        cover: "{{ book.cover }}",
        amazon: "{{ book.amazon_link }}"
      }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
  if (books.length > 0) {
    setTimeout(function() {
      const idx = Math.floor(Math.random() * books.length);
      const book = books[idx];
      document.getElementById('bestseller-img').src = book.cover;
      document.getElementById('bestseller-title').textContent = book.title;
      document.getElementById('bestseller-author').textContent = "by " + book.author;
      document.getElementById('bestseller-amazon').href = book.amazon;
      document.getElementById('bestseller-popup').style.display = 'flex';
    }, 3000); // Show after 3 seconds
  }
});