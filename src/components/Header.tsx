import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, ChevronDown, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/stores/useCartStore';
import SocialLinks from '@/components/SocialLinks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const getCartCount = useCartStore((state) => state.getCartCount);
  const location = useLocation();
  const cartCount = getCartCount();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Shop' },
    { path: '/shop?category=decoration', label: 'Decorations', icon: PartyPopper },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const occasions = [
    { path: '/shop?occasion=birthday', label: 'Birthday' },
    { path: '/shop?occasion=anniversary', label: 'Anniversary' },
    { path: '/shop?occasion=wedding', label: 'Wedding' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-md border-b border-border">
      {/* Top bar with social links */}
      <div className="hidden md:block bg-chocolate text-cream-dark py-2">
        <div className="container-custom flex items-center justify-between px-4 md:px-6">
          <p className="text-xs">🎂 Fresh cakes baked daily | Free delivery on orders above Rs 1000</p>
          <SocialLinks variant="header" />
        </div>
      </div>

      <div className="container-custom flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
        >
          <span className="text-2xl md:text-3xl">🎂</span>
          <span className="font-display text-xl md:text-2xl font-semibold text-chocolate">
            Blackberry Cakes
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.path) || (link.path.includes('?') && location.search === link.path.split('?')[1]) 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
              }`}
            >
              {link.icon && <link.icon className="h-4 w-4" />}
              {link.label}
            </Link>
          ))}

          {/* Occasions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Occasions
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-40">
              {occasions.map((occasion) => (
                <DropdownMenuItem key={occasion.path} asChild>
                  <Link to={occasion.path} className="w-full cursor-pointer">
                    {occasion.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Track Order Link */}
          <Link
            to="/track-order"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/track-order') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Track Order
          </Link>

          {navLinks.slice(2).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side - Cart */}
        <div className="flex items-center gap-2">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
