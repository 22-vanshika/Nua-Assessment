import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/store";
import { queryClient } from "./services/queryClient";
import LandingPage from "./pages/LandingPage";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Info, MessageCircle, HelpCircle, Headphones, Truck, RotateCcw, Ruler, Package, Send, Bell } from "lucide-react";

import Header from "./components/layout/Header";

import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1 min-h-screen">
              <div className="min-h-full">
                <Routes>
                  <Route path="/" element={
                    
                      <LandingPage />
                    
                  } />
                  <Route path="/products" element={
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
                      <ProductListing />
                    </div>
                  } />
                  <Route path="/product/:id" element={
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
                      <ProductDetail />
                    </div>
                  } />
                  <Route path="/wishlist" element={
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
                      <Wishlist />
                    </div>
                  } />
                  <Route path="/cart" element={
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
                      <Cart />
                    </div>
                  } />
                  <Route path="/checkout" element={
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
                      <Checkout />
                    </div>
                  } />
                </Routes>
              </div>
            </main>

            <footer className="bg-card border-t border-border text-muted-foreground pt-12">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      <span className="aurora-text">Nua Store</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your trusted destination for quality products at great
                      prices.
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4 text-aurora-600" />
                        <span>support@nuastore.in</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4 text-aurora-600" />
                        <span>+91 98765 43210</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-aurora-600" />
                        <span>Mumbai, Maharashtra 400001</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      {[
                        { icon: Facebook, href: "#", label: "Facebook" },
                        { icon: Twitter, href: "#", label: "Twitter" },
                        { icon: Instagram, href: "#", label: "Instagram" },
                        { icon: Youtube, href: "#", label: "YouTube" },
                      ].map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          className="p-2 bg-muted rounded-lg hover:bg-aurora-600 hover:text-white transition-all duration-200 group"
                          aria-label={social.label}
                        >
                          <social.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                      {[
                        { icon: Info, text: "About Us", href: "#" },
                        { icon: MessageCircle, text: "Contact", href: "#" },
                        { icon: HelpCircle, text: "FAQ", href: "#" },
                        { icon: Headphones, text: "Support", href: "#" },
                      ].map((link) => (
                        <li key={link.text}>
                          <a
                            href={link.href}
                            className="flex items-center gap-2 hover:text-aurora-600 transition-colors group"
                          >
                            <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Customer Service</h4>
                    <ul className="space-y-2 text-sm">
                      {[
                        { icon: Truck, text: "Shipping Info", href: "#" },
                        { icon: RotateCcw, text: "Returns", href: "#" },
                        { icon: Ruler, text: "Size Guide", href: "#" },
                        { icon: Package, text: "Track Order", href: "#" },
                      ].map((link) => (
                        <li key={link.text}>
                          <a
                            href={link.href}
                            className="flex items-center gap-2 hover:text-aurora-600 transition-colors group"
                          >
                            <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-aurora-600" />
                      <h4 className="font-medium text-foreground">Stay Updated</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Subscribe to get updates on new products and exclusive offers.
                    </p>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="email"
                          placeholder="Your email address"
                          className="w-full pl-10 pr-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500 focus:border-aurora-400 transition-colors"
                        />
                      </div>
                      <button className="px-4 py-2 bg-aurora-500 text-white rounded-lg text-sm hover:bg-aurora-600 transition-all duration-200 aurora-glow-hover flex items-center gap-2 group">
                        <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border  py-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
                  <p>&copy; 2024 <span className="aurora-text font-semibold">Nua Store</span>. All rights reserved.</p>
                  <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-aurora-600 transition-colors">
                      Privacy Policy
                    </a>
                    <a href="#" className="hover:text-aurora-600 transition-colors">
                      Terms of Service
                    </a>
                    <a href="#" className="hover:text-aurora-600 transition-colors">
                      Cookie Policy
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
