import React, { useState, useEffect } from 'react';
import { Search, MapPin, Menu, X, ChevronDown } from 'lucide-react';
import { useEditorial, EditorialType } from '@/contexts/EditorialContext';
import { cn } from '@/lib/utils';

interface Editorial {
  id: EditorialType;
  label: string;
}

const editorials: Editorial[] = [
  { id: 'news', label: 'Notícias' },
  { id: 'sports', label: 'Esportes' },
  { id: 'business', label: 'Negócios' },
  { id: 'entertainment', label: 'Entretenimento' },
  { id: 'tech', label: 'Tecnologia' },
  { id: 'politics', label: 'Política' },
];

export function Header() {
  const { currentEditorial, setEditorial } = useEditorial();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Sul Fluminense');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-card/95 backdrop-blur-md shadow-lg'
          : 'bg-card'
      )}
    >
      {/* Top Bar */}
      <div className="editorial-gradient">
        <div className="container flex items-center justify-between h-10 text-primary-foreground">
          <div className="flex items-center gap-4 text-sm">
            <span className="font-medium opacity-90">
              {new Date().toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-1.5 text-sm font-medium hover:opacity-80 transition-opacity"
              onClick={() => {}}
            >
              <MapPin size={14} />
              <span className="hidden sm:inline">{selectedRegion}</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-black text-xl lg:text-2xl">G</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary/20 group-hover:scale-150 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-black tracking-tight text-foreground">
                GTF<span className="text-primary">News</span>
              </span>
              <span className="text-[10px] lg:text-xs text-muted-foreground font-medium tracking-widest uppercase">
                Portal de Notícias
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {editorials.map((editorial) => (
              <button
                key={editorial.id}
                onClick={() => setEditorial(editorial.id)}
                className={cn(
                  'px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200',
                  currentEditorial === editorial.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted hover:text-primary'
                )}
              >
                {editorial.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className={cn(
              'flex items-center transition-all duration-300 overflow-hidden',
              isSearchOpen ? 'w-64' : 'w-10'
            )}>
              {isSearchOpen && (
                <input
                  type="text"
                  placeholder="Buscar notícias..."
                  className="flex-1 h-10 px-4 bg-muted rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
              )}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={cn(
                  'w-10 h-10 flex items-center justify-center rounded-lg transition-colors',
                  isSearchOpen
                    ? 'bg-primary text-primary-foreground rounded-l-none'
                    : 'hover:bg-muted text-foreground'
                )}
              >
                {isSearchOpen ? <X size={18} /> : <Search size={18} />}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 bg-card border-t border-border',
          isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <nav className="container py-4 space-y-1">
          {editorials.map((editorial, index) => (
            <button
              key={editorial.id}
              onClick={() => {
                setEditorial(editorial.id);
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                'w-full px-4 py-3 text-left text-sm font-semibold rounded-lg transition-all duration-200 animate-slide-down',
                currentEditorial === editorial.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {editorial.label}
            </button>
          ))}

          {/* Mobile Region Selector */}
          <div className="pt-4 border-t border-border mt-4">
            <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <MapPin size={16} />
              <span>{selectedRegion}</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </nav>
      </div>

      {/* Editorial Indicator Bar */}
      <div className="h-1 editorial-gradient" />
    </header>
  );
}
