import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  const handleJournalClick = (e) => {
    setIsProfileOpen(false);
    closeMobileMenu();
    if (!user) {
        e.preventDefault();
        navigate('/login', { state: { from: location } });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[rgba(15,23,42,0.95)] border-b border-[var(--border)] backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 lg:px-12 xl:px-16 h-20">
        <Link to="/" className="flex items-center gap-4" onClick={closeMobileMenu}>
          <div className="w-14 h-14 bg-[var(--primary)] rounded-xl flex items-center justify-center p-1.5 shadow-lg shadow-[var(--primary)]/20">
            <img src="/SiratAlQuranLogo.png" alt="SiratAlQuran Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-xl tracking-tight text-[var(--foreground)]">SiratAlQuran</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 text-[var(--muted-foreground)] font-medium items-center">
          <Link to="/" className="hover:text-[var(--primary)]">Home</Link>
          <Link to="/ayats" className="hover:text-[var(--primary)]">Verses</Link>
          <Link to="/about" className="hover:text-[var(--primary)]">About</Link>
          <Link to="/contact" className="hover:text-[var(--primary)]">Contact</Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link 
            to="/guidance" 
            className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get Guidance
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
            >
              <iconify-icon icon="lucide:user" width="20" height="20"></iconify-icon>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[rgba(15,23,42,0.98)] border border-[var(--border)] rounded-xl shadow-xl backdrop-blur-md overflow-hidden flex flex-col py-2 z-50">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-[var(--border)] mb-2">
                      <p className="text-sm font-medium text-[var(--foreground)] truncate">{user.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)] truncate">{user.email}</p>
                    </div>
                    
                    <Link to="/journal" onClick={() => setIsProfileOpen(false)} className="px-4 py-2 text-sm text-[var(--muted-foreground)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] flex items-center gap-2">
                      <iconify-icon icon="lucide:book" width="16"></iconify-icon>
                      Journal
                    </Link>

                    {isAdmin && (
                      <>
                        <Link to="/admin" onClick={() => setIsProfileOpen(false)} className="px-4 py-2 text-sm text-[var(--muted-foreground)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] flex items-center gap-2">
                          <iconify-icon icon="lucide:brick-wall-shield" width="16"></iconify-icon>
                          Admin Panel
                        </Link>
                        {/* <Link to="/admin/ayats" onClick={() => setIsProfileOpen(false)} className="px-4 py-2 text-sm text-[var(--muted-foreground)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] flex items-center gap-2">
                          <iconify-icon icon="lucide:book-open" width="16"></iconify-icon>
                          Ayats
                        </Link> */}
                      </>
                    )}

                    <div className="border-t border-[var(--border)] my-2"></div>
                    
                    <button onClick={() => { handleLogout(); setIsProfileOpen(false); }} className="px-4 py-2 text-sm text-left text-red-400 hover:bg-red-500/10 hover:text-red-500 flex items-center gap-2 w-full">
                      <iconify-icon icon="lucide:log-out" width="16"></iconify-icon>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/journal" onClick={handleJournalClick} className="px-4 py-2 text-sm text-[var(--muted-foreground)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] flex items-center gap-2">
                      <iconify-icon icon="lucide:book" width="16"></iconify-icon>
                      Journal
                    </Link>
                    <Link to="/login" onClick={() => setIsProfileOpen(false)} className="px-4 py-2 text-sm text-[var(--muted-foreground)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] flex items-center gap-2">
                      <iconify-icon icon="lucide:log-in" width="16"></iconify-icon>
                      Login
                    </Link>
                    <Link to="/signup" onClick={() => setIsProfileOpen(false)} className="px-4 py-2 text-sm text-[var(--muted-foreground)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] flex items-center gap-2">
                      <iconify-icon icon="lucide:user-plus" width="16"></iconify-icon>
                      Signup
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-[var(--muted-foreground)] hover:text-[var(--primary)] text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <iconify-icon icon={isMobileMenuOpen ? "lucide:x" : "lucide:menu"} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--border)] bg-[rgba(15,23,42,0.98)] backdrop-blur-md">
          <nav className="flex flex-col p-6 gap-4 text-[var(--muted-foreground)] font-medium">
            <Link to="/" onClick={closeMobileMenu} className="hover:text-[var(--primary)] py-2">Landing</Link>
            <Link to="/ayats" onClick={closeMobileMenu} className="hover:text-[var(--primary)] py-2">Ayats</Link>
            <Link to="/about" onClick={closeMobileMenu} className="hover:text-[var(--primary)] py-2">About</Link>
            <Link to="/contact" onClick={closeMobileMenu} className="hover:text-[var(--primary)] py-2">Contact</Link>
            
            <Link to="/journal" onClick={handleJournalClick} className="hover:text-[var(--primary)] py-2">Journal</Link>
            
             {user && isAdmin && (
                <>
                <Link to="/admin/themes" onClick={closeMobileMenu} className="hover:text-[var(--primary)] py-2">Manage Themes</Link>
                <Link to="/admin/ayats" onClick={closeMobileMenu} className="hover:text-[var(--primary)] py-2">Manage Ayats</Link>
                </>
             )}

             <div className="border-t border-[var(--border)] my-2"></div>

             {!user ? (
                 <>
                   <Link to="/login" onClick={closeMobileMenu} className="hover:text-[var(--primary)] py-2">Login</Link>
                   <Link to="/signup" onClick={closeMobileMenu} className="hover:text-[var(--primary)] py-2">Signup</Link>
                 </>
               ) : (
                   <button onClick={handleLogout} className="text-left hover:text-[var(--primary)] py-2">Logout</button>
               )}

            <Link 
              to="/guidance" 
              onClick={closeMobileMenu}
              className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-3 rounded text-center font-medium mt-2 hover:opacity-90 transition-opacity"
            >
              Get Guidance
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
