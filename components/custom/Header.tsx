'use client';

import { Heart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '../ui/button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className='border-b bg-white/95 backdrop-blur text-gray-950 sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <Link href="/" className="flex items-center gap-2">
          <Heart className='h-8 w-8 text-blue-600 fill-blue-600' />
          <span className='text-2xl font-bold'>Saidia</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-6'>
          <Link href="/" className='hover:text-blue-600 transition-colors'>
            Campaigns
          </Link>
          <Link href="/create-campaign" className='hover:text-blue-600 transition-colors'>
            Start Campaign
          </Link>
          <Link href="/dashboard" className='hover:text-blue-600 transition-colors'>
            Dashboard
          </Link>
          <Link href="/sign-in">
            <Button className='bg-blue-600 hover:bg-blue-700'>Sign In</Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className='md:hidden hover:bg-blue-50 hover:text-blue-600 transition-colors'
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className='flex flex-col gap-1 px-4 pb-4 bg-white border-t'>
          <Link 
            href="/" 
            className='py-3 px-4 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg'
            onClick={closeMobileMenu}
          >
            Campaigns
          </Link>
          <Link 
            href="/create-campaign" 
            className='py-3 px-4 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg'
            onClick={closeMobileMenu}
          >
            Start Campaign
          </Link>
          <Link 
            href="/dashboard" 
            className='py-3 px-4 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg'
            onClick={closeMobileMenu}
          >
            Dashboard
          </Link>
          <Link 
            href="/sign-in" 
            className='mt-2'
            onClick={closeMobileMenu}
          >
            <Button className='w-full bg-blue-600 hover:bg-blue-700'>Sign In</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;