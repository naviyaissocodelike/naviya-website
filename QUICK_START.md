# Quick Start Guide

## 🚀 Running Your Website

### Option 1: Development Server (Recommended for React Homepage)
```bash
npm run dev
```
Then open `http://localhost:5173` in your browser

### Option 2: Static Pages (For content pages)
Simply open any `.html` file in the `/pages/` directory directly in your browser:
- `/pages/imagine.html`
- `/pages/think.html`
- `/pages/build.html`
- `/pages/play.html`
- `/pages/freestyle.html`
- `/pages/vending.html`

### Option 3: Simple HTTP Server
```bash
# Using Python (if installed)
python3 -m http.server 8000

# Using Node.js serve package
npx serve
```

---

## 🎨 Testing the New Features

### 1. Test Coin Earning
1. Navigate to any content page (Think, Build, Imagine, etc.)
2. Scroll down slowly
3. Watch for coin notifications at 25%, 50%, 75%, 100%
4. Check coin count in header increases

### 2. Test Vending Machine
1. Navigate to `/pages/vending.html`
2. Click "INSERT 1 COIN" button
3. Try to solve the riddle or use hints
4. Try the "NEW RIDDLE" button (costs another coin)
5. Watch your stats update

### 3. Test Page Transitions
1. Click navigation links between pages
2. Notice smooth fade-out/fade-in transitions
3. Try cmd/ctrl+click to open in new tab (should still work)

### 4. Test Imagine Section
1. Navigate to `/pages/imagine.html`
2. Read the sci-fi content
3. Earn coins as you scroll
4. Notice the warm Organic Tech styling

---

## ✏️ Adding Your Content

### Add Articles/Essays
Edit the content pages directly:
```html
<!-- In /pages/think.html -->
<div class="page-content" id="scrollable-content">
  <p>Your content here...</p>

  <!-- Add more sections, images, etc. -->
</div>
```

### Add Images
Place images in a new `/images/` folder and reference them:
```html
<img src="../images/your-photo.jpg" alt="Description">
```

### Update Homepage
Edit `/src/components/VaultHome.jsx` to:
- Add your photo: Replace the photo placeholder
- Update bio: Change the hero text and blurbs
- Customize icons: Modify the SVG icons and labels

---

## 🎯 Customization Tips

### Change Colors
Edit CSS variables in `/css/style.css` and `/src/styles.css`:
```css
:root {
  --accent-color: #f59e0b;  /* Main accent color */
  --accent-secondary: #10b981;  /* Secondary accent */
  --peach: #ffe4d1;  /* Background tint */
}
```

### Add More Riddles
Edit `/js/riddles.js` and add to the RIDDLES array:
```javascript
{
  id: 51,
  question: "Your riddle here?",
  answer: "your answer",
  hint: "Your hint here"
}
```

### Adjust Coin Values
In `/js/scroll-coins.js`, change:
```javascript
const COIN_VALUE = 1;  // Coins awarded per milestone
const MILESTONES = [25, 50, 75, 100];  // Scroll percentages
```

---

## 🌐 Deploying to the Web

### Recommended: Vercel (Free)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy! (It auto-detects Vite)

### Alternative: Netlify (Free)
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. New site from Git
4. Build command: `npm run build`
5. Publish directory: `dist`

### Alternative: GitHub Pages (Free)
1. Build your site: `npm run build`
2. Push the `dist/` folder to `gh-pages` branch
3. Enable GitHub Pages in repo settings

---

## 📝 Immediate To-Dos

**Before Sharing:**
1. ✏️ Add your actual content to Think, Build, Play pages
2. 📸 Add your photo to homepage
3. ✍️ Write your bio/blurb for homepage
4. 🔗 Update social links (if any)
5. 🎨 Review and adjust colors to your taste
6. 🧪 Test on mobile devices

**Optional Enhancements:**
- Add more Imagine content about your future visions
- Create more riddles for the vending machine
- Add achievement badges
- Implement dark mode
- Add contact form

---

## 🐛 Troubleshooting

**Coins not earning?**
- Check browser console for errors
- Make sure JavaScript is enabled
- Try clearing localStorage: `localStorage.clear()`

**Vending machine not working?**
- Open browser console (F12)
- Check for import errors with riddles.js
- Make sure you have coins to insert

**Styling looks wrong?**
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Clear browser cache
- Check that CSS files are loading

**Page transitions not smooth?**
- Ensure page-transitions.js is loaded
- Check browser console for errors
- Try a different browser

---

## 📚 File Reference

**Main Content Pages:**
- `/pages/imagine.html` - Sci-fi & future visions
- `/pages/think.html` - Essays & frameworks
- `/pages/build.html` - Projects & experiments
- `/pages/play.html` - Design & culture
- `/pages/freestyle.html` - Misc projects
- `/pages/vending.html` - Riddle vending machine

**JavaScript:**
- `/js/scroll-coins.js` - Automatic coin earning
- `/js/riddles.js` - 50 riddles data
- `/js/vending-machine.js` - Vending machine logic
- `/js/page-transitions.js` - Smooth navigation

**Styling:**
- `/css/style.css` - Main Organic Tech styles
- `/css/vending.css` - Retro arcade styles
- `/src/styles.css` - React component styles

---

## 🎉 You're All Set!

Your website is ready to share with the world. Add your content, customize to your taste, and deploy!

Questions or want to add more features? Just ask! 🚀
