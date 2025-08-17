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

### Auto-Fix Platform Issues

If you encounter platform mismatch errors, use these auto-correction commands:

1. **Auto-fix platform compatibility:**
   ```bash
   # Remove and regenerate Gemfile.lock
   rm Gemfile.lock
   bundle install

   # Or add missing platforms
   bundle lock --add-platform x86_64-linux
   bundle lock --add-platform ruby
   bundle install
   ```

2. **One-command setup (Windows/macOS/Linux):**
   ```bash
   # This works on any platform
   bundle config set --local force_ruby_platform true
   bundle install
   ```

### Local Development & Testing

1. **Quick start (auto-detects platform issues):**
   ```bash
   # Install dependencies with auto-platform detection
   gem install bundler
   bundle config set --local force_ruby_platform true
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

### Common Jekyll Build Errors & Auto-Fixes

* **Platform mismatch** - Run: `rm Gemfile.lock && bundle install`
* **Liquid syntax errors** - Check for mismatched quotes, filters, or tags in templates
* **Front matter issues** - Ensure proper YAML format with correct indentation
* **Missing dependencies** - Run `bundle install` to ensure all gems are installed
* **Path problems** - Verify file paths are correct (case-sensitive on some systems)
* **Plugin errors** - Test without plugins using `--safe` flag if issues persist

### Auto-Setup Script

Create a file `setup.sh` (Linux/macOS) or `setup.bat` (Windows) for automated setup:

**setup.sh:**
```bash
#!/bin/bash
echo "Setting up Jekyll site..."
gem install bundler
rm -f Gemfile.lock
bundle config set --local force_ruby_platform true
bundle install
echo "Setup complete! Run: bundle exec jekyll serve"
```

**setup.bat:**
```batch
@echo off
echo Setting up Jekyll site...
gem install bundler
del Gemfile.lock 2>nul
bundle config set --local force_ruby_platform true
bundle install
echo Setup complete! Run: bundle exec jekyll serve
```

### Testing in GitHub Safely

1. **Use feature branches** - Never push directly to main
2. **Check Actions logs** - After push, check Actions tab for build errors
3. **Auto-recovery**: The workflow now auto-fixes platform issues

### EmailJS Configuration

- **Production**: Automatically configured via GitHub Actions secrets
- **Development**: Configure via `.env` file (see publish-form.js for details)
- **Security**: Domain validation prevents unauthorized usage

### Troubleshooting

**If GitHub Actions still fails:**

1. Check that these secrets are set in repository settings:
   - `EMAILJS_PUBLIC_KEY`
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`

2. Verify the platform fix worked by checking the build logs

3. For persistent issues, try forcing a clean build by:
   - Deleting `Gemfile.lock` from repository
   - Pushing the change to trigger a fresh build

### License

© 2025 Delta Publications. All rights reserved.