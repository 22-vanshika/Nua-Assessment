import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Heart, ShoppingCart, Menu, Package, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Logo from "./Logo";

export default function Header() {

  const location = useLocation();

  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const wishlistItemsCount = wishlistItems.length;

  const navigationLinks = [
    { href: "/products", label: "Products", icon: Package },
  ];

  return (
    <header className="border-b border-white/10 px-4 md:px-6 sticky top-0 aurora-glass bg-transparent z-50 text-white">
      <div className="flex h-16 items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden text-white hover:bg-white/10 hover:border-white/20 aurora-glow-hover"
                variant="ghost"
                size="icon"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-48 p-1 md:hidden aurora-glass border border-white/20"
            >
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <NavigationMenuItem key={link.label} className="w-full">
                        <Link
                          to={link.href}
                          className={
                            navigationMenuTriggerStyle() +
                            " w-full justify-start text-white hover:text-aurora-300 hover:bg-white/10 transition-all duration-200"
                          }
                        >
                          <span className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            {link.label}
                          </span>
                        </Link>
                      </NavigationMenuItem>
                    );
                  })}
                  <NavigationMenuItem
                    role="presentation"
                    aria-hidden="true"
                    className="w-full"
                  >
                    <div className="bg-white/20 -mx-1 my-1 h-px"></div>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="w-full">
                    <Button
                      asChild
                      size="sm"
                      variant="ghost"
                      className="mt-0.5 w-full justify-start font-normal text-white hover:bg-white/10"
                    >
                      <Link to="/wishlist">
                        <span className="flex items-baseline gap-2">
                          <Heart className="h-4 w-4" />
                          Wishlist
                          {wishlistItemsCount > 0 && (
                            <span className="text-aurora-300 text-xs font-semibold bg-aurora-600 px-1.5 py-0.5 rounded-full">
                              {wishlistItemsCount}
                            </span>
                          )}
                        </span>
                      </Link>
                    </Button>
                  </NavigationMenuItem>
            
                  <NavigationMenuItem className="w-full">
                    <Button
                      asChild
                      size="sm"
                      className="mt-0.5 w-full justify-start font-normal bg-white text-aurora-900 hover:bg-aurora-50"
                    >
                      <Link to="/cart">
                        <span className="flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4" />
                          Cart
                          {cartItemsCount > 0 && (
                            <span className="text-aurora-600 text-xs font-semibold bg-aurora-100 px-1.5 py-0.5 rounded-full">
                              {cartItemsCount}
                            </span>
                          )}
                        </span>
                      </Link>
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          <div className="flex flex-1 items-center gap-6 max-md:justify-between">
            <Logo />
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <NavigationMenuItem key={link.label}>
                      <Link
                        to={link.href}
                        className={
                          navigationMenuTriggerStyle() +
                          (location.pathname === link.href
                            ? " text-aurora-300 bg-white/10 aurora-glow"
                            : " text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200")
                        }
                      >
                        <span className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          {link.label}
                        </span>
                      </Link>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>


          </div>
        </div>

        <div className="flex items-center gap-2 max-md:hidden">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-sm text-white hover:bg-white/10 hover:border-white/20"
          >
            <Link to="/wishlist">
              <span className="flex items-baseline gap-2">
                <Heart className="h-4 w-4" />
                Wishlist
                {wishlistItemsCount > 0 && (
                  <span className="text-aurora-300 text-xs font-semibold bg-aurora-600 px-1.5 py-0.5 rounded-full">
                    {wishlistItemsCount}
                  </span>
                )}
              </span>
            </Link>
          </Button>
         
          <Button
            asChild
            size="sm"
            className="text-sm bg-white text-aurora-900 hover:bg-aurora-50 aurora-glow-hover"
          >
            <Link to="/cart">
              <span className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Cart
                {cartItemsCount > 0 && (
                  <span className="text-aurora-600 text-xs font-semibold bg-aurora-100 px-1.5 py-0.5 rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
