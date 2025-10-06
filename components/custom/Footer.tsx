import { Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className='border-t bg-white mt-20'>
        <div className='container mx-auto px-4 py-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div>
                    <div className='flex items-center gap-2 mb-4'>
                        <Heart className='h-6 w-6 text-blue-600 fill-blue-600' />
                        <span className='text-xl font-bold'>Saidia</span>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                        Empowering communities through crowdfunding.
                    </p>
                </div>
                <div>
                <h3 className='font-semibold mb-4'>Quick Links</h3>
                <ul>
                    <li><Link href="/" className='hover:text-blue-600'>Browse Campaigns</Link></li>
                    <li><Link href="/create-campaign" className='hover:text-blue-600'>Start a Campaign</Link></li>
                    <li><Link href="dashboard" className='hover:text-blue-600'>Dashboard</Link></li>
                </ul>
                </div>
                <div>
                    <h3 className='font-semibold mb-4'>Contact</h3>
                    <p className='text-sm text-muted-foreground'>
                        support@saidia.riverpen.com<br />
                        Making a difference, one campaign at a time.
                    </p>
                </div>
            </div>
            <div className='mt-8 pt-8 border-t text-center text-sm text-muted-foreground'>
                <p>&copy; {currentYear} Saidia. All rights reserved.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
