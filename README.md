# 🌟 Reward Page — Elegant QR Code Tipping Page

A visually stunning, responsive **reward/donation page** that allows visitors to scan a QR code to support you via WeChat or Alipay. It features animated particles, a glassmorphism card, dynamic color themes, and smooth payment method switching — all with zero dependencies.

![Reward Page Preview](images/preview.png)

## ✨ Features

- 🎨 **Modern Glassmorphism Design** — Semi-transparent card with backdrop blur and glowing accents.
- 🌈 **Dynamic Theme Switching** — Colors shift smoothly between WeChat green and Alipay blue.
- ✨ **Particle Background** — Floating particles that adapt to the current payment method's color.
- 📱 **Fully Responsive** — Looks great on desktops, tablets, and mobile devices.
- 🔄 **Smooth Animations** — Heartbeat icon, rotating glow ring around QR code, and micro-interactions.
- ⌨️ **Keyboard Shortcuts** — Press `1` or `W` for WeChat, `2` or `A` for Alipay (desktop only).
- 🔍 **QR Code Centered** — Clean, unobstructed QR display area for easy scanning.
- ⚡ **Lightweight** — Plain HTML, CSS, and vanilla JavaScript. No frameworks or libraries.

## 🚀 Live Demo

> Host this page on any static server (GitHub Pages, Netlify, Vercel, etc.) and share the link.

## 📁 File Structure
├── index.html # Main HTML structure
├── style.css # All styles, animations, and responsive rules
├── app.js # Interactive logic, particle system, theme switching
└── images/
├── bg.webp # Background image (replace with your own)
├── WeChat.jpg # Your WeChat QR code image
├── Alipay.jpg # Your Alipay QR code image
└── favicon.ico # Website icon (optional)


## 🛠️ How to Use

### 1. Prepare Your Images
Place your payment QR codes and background image inside the `images/` folder:

- **Background** → `images/bg.webp` (recommended: dark, atmospheric image)
- **WeChat QR** → `images/WeChat.jpg`
- **Alipay QR** → `images/Alipay.jpg`
- **Favicon** → `images/favicon.ico` (optional, appears in browser tab)

> 💡 **Tip:** Make sure the QR codes are clearly visible (high contrast) and not cropped.

### 2. Host the Files
Clone or download this repository, then open `index.html` in your browser.  
For production, upload all files to any static hosting service (GitHub Pages, Netlify, Vercel, etc.).

### 3. Customize (Optional)
You can edit the page text in `index.html` and adjust the QR code file paths in `app.js`:

```javascript
// app.js
const QR_CONFIG = {
    wechat: {
        imageUrl: 'images/WeChat.jpg',   // Change if your file name differs
        label: '微信',
        colorName: '微信',
    },
    alipay: {
        imageUrl: 'images/Alipay.jpg',
        label: '支付宝',
        colorName: '支付宝',
    },
};
```

The background image is set in style.css:

```
body {
    background: var(--bg-deep) url('images/bg.webp') no-repeat center/cover fixed;
}
```

### 4. Keyboard Shortcuts (Desktop)

When viewing the page in a desktop browser, you can quickly switch payment methods:

- Press 1 or W → Switch to WeChat
- Press 2 or A → Switch to Alipay

> 🎨 Customization
You can modify colors, animations, and layout by editing the CSS variables at the top of style.css:

```
:root {
    --wechat-green: #07c160;
    --alipay-blue: #1677ff;
    --card-bg: rgba(20, 20, 45, 0.75);
    --transition-speed: 0.45s;
    /* ... */
}
```

> 📄 License
This project is open source and available under the MIT License.

*Made with ❤️* — Enjoy your new tip jar!
