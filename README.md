# 🛍️ Nua Store - Mini E-commerce Platform

A modern, responsive e-commerce platform built with **React** (Vite) and **Aurora-inspired design theme**, consuming the **Fake Store API**.  
This project was created as part of an assessment to demonstrate frontend skills, state management, and clean architecture in a modern SPA.

---

## 🎯 Assessment Objectives

This project implements the required functionality from the assessment:

- ✅ **Product Listing** with search & category filtering  
- ✅ **Product Detail Page** with cart functionality  
- ✅ **Shopping Cart** with quantity management & removal  
- ✅ **Checkout Page** with order summary & validated form  
- ✅ **Data Caching** for products to reduce redundant fetches  
- ✅ **Global State Management** using Redux Toolkit  
- ✅ **Structured Project Architecture** with modular components  

---

## 🚀 Features

- **Aurora Design Theme**: Gradient backgrounds + glassmorphism  
- **Product Listing**: Responsive grid, search, and category filter  
- **Product Detail**: Detailed product info with "Add to Cart"  
- **Shopping Cart**: Quantity selector, removal, subtotal, grand total  
- **Checkout**: Validated form with order summary and confirmation  
- **Data Caching**: In-memory + localStorage caching  
- **Wishlist** (bonus): Save products & move to cart  
- **Responsive Design**: Optimized for all screen sizes  
- **Accessibility**: Keyboard navigation + ARIA labels  
- **Animations**: Framer Motion for smooth transitions  

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite  
- **State Management**: Redux Toolkit  
- **Data Fetching**: TanStack Query (React Query)  
- **Styling**: Tailwind CSS (Aurora theme)  
- **UI Components**: Radix UI primitives  
- **Icons**: Lucide React  
- **Animations**: Framer Motion  
- **Routing**: React Router DOM  

---

## 📁 Project Structure

```
src/
├── components/          # Reusable and feature components
│   ├── layout/         # Layout (Navbar, Header, Footer)
│   ├── product/        # Product-related UI
│   └── ui/            # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Page-level components (Home, Cart, Checkout)
├── services/           # API integrations (Fake Store API)
├── store/              # Redux slices (cart, wishlist, products)
├── utils/              # Utility helpers
└── assets/             # Static assets
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (>=16)  
- npm or yarn  

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd nua-store

# Install dependencies
npm install

# Start dev server
npm run dev
```
Visit 👉 http://localhost:5173

---

## 📜 Available Scripts

- `npm run dev` → Start dev server


---

## 🔧 Design Decisions

### Aurora Theme
- Dark backgrounds with gradient highlights
- Glassmorphism for depth
- Consistent tokens for accessibility

### State Management
- Redux Toolkit for global state (cart, wishlist, products)
- Predictable flow + DevTools debugging

### Data Layer
- TanStack Query for caching and background refresh
- LocalStorage for cart & wishlist persistence

---

## 🚀 Bonus Enhancements

- Wishlist system with "Add to Cart"
- Mobile-first responsive layout
- Accessibility improvements (ARIA + keyboard navigation)
- Optimized rendering & lazy loading
- Loading states (skeleton loaders, spinners)
- Error boundaries for better UX

---

## 🧪 Testing Strategy

### Current
- Manual testing for flows

### Planned
- Unit tests → React Testing Library
- E2E tests → Playwright

```bash
npm test
npm run test:e2e
npm run test:coverage
```

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🤝 Contributing

1. Fork this repo
2. Create a feature branch
3. Commit changes
4. Open a PR 🎉

---

## 📄 License

Licensed under the MIT License.

---

## 🙏 Acknowledgments

- Fake Store API
- Tailwind CSS
- Radix UI
- Lucide React
- Framer Motion
