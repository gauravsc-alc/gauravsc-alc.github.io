# Delta Publications Website

A modern Jekyll-based website for Delta Publications featuring books, authors, and publishing services.

## Setup Instructions

### Favicon and Icons Setup

To complete the website setup, you need to add the following icon files to the root directory:

1. **favicon.ico** (32x32) - Main browser favicon
2. **favicon-16x16.png** - Small browser icon
3. **favicon-32x32.png** - Standard browser icon
4. **apple-touch-icon.png** (180x180) - iOS home screen icon
5. **android-chrome-192x192.png** - Android home screen icon
6. **android-chrome-512x512.png** - High-res Android icon

#### How to Generate Icons:

1. Use your existing logo (`/images/logo.png`) as the source
2. Visit https://realfavicongenerator.net/
3. Upload your logo image
4. Customize settings with Delta Publications branding
5. Download the generated icon package
6. Extract all files to the website root directory

### Website Features

- 📚 **Book Catalog**: Complete book listing with categories
- ✍️ **Author Profiles**: Meet our talented writers
- 📱 **Mobile Responsive**: Optimized for all devices
- 🎨 **Modern Design**: Clean and professional layout
- 🔍 **SEO Optimized**: Enhanced search engine visibility
- 📧 **Contact Forms**: Easy communication channels
- 🏷️ **Category System**: Organized book browsing
- ⭐ **Rating System**: Book reviews and ratings

### Development

```bash
# Install Jekyll and dependencies
bundle install

# Run local development server
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

### Icon Legend

The website uses consistent iconography throughout:

- 🏠 Home
- 📚 Books/All Books
- ✍️ Authors
- 📝 Blogs
- 📧 Contact
- 💪 Self Help
- 🧸 Children's Books
- 👨‍👩‍👧‍👦 Parenting
- 🛒 Buy/Amazon
- 📤 Share
- ⭐ Ratings
- 🏷️ Categories
- 💰 Price
- 📖 Read More/ISBN
- 📄 Pages
- 📅 Publication Date
- 🌍 Language

### Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## Jekyll Build & Test Guide

### Local Development & Testing

1. **Install dependencies first:**
   ```bash
   gem install bundler
   bundle install
   ```

2. **Test build locally to catch errors:**
   ```bash
   bundle exec jekyll build --safe
   ```
   Check the output for any error messages.

3. **Run local server with live reload:**
   ```bash
   bundle exec jekyll serve --livereload
   ```
   Visit http://localhost:4000 to preview your site.

4. **Debug build with verbose output:**
   ```bash
   bundle exec jekyll build --verbose
   ```
   This shows detailed information about the build process.

5. **Check for specific errors:**
   ```bash
   bundle exec jekyll doctor
   ```
   This runs diagnostics on your site.

### Common Jekyll Build Errors

* **Liquid syntax errors** - Check for mismatched quotes, filters, or tags in templates
* **Front matter issues** - Ensure proper YAML format with correct indentation
* **Missing dependencies** - Run `bundle install` to ensure all gems are installed
* **Path problems** - Verify file paths are correct (case-sensitive on some systems)
* **Plugin errors** - Test without plugins using `--safe` flag if issues persist

### Testing in GitHub Safely

1. **Use feature branches** - Never push directly to main
2. **Check Actions logs** - After push, check Actions tab for build errors
3. **Create a test workflow** - Use the workflow below to test without deploying

### License

© 2025 Delta Publications. All rights reserved.