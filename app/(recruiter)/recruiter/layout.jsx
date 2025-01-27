'use client'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'

const RecruiterLayout = ({ children }) => {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [recruiter, setRecruiter] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(null)

  // Public routes that don't need the sidebar
  const publicRoutes = ['/recruiter/signin', '/recruiter/signup']

  // Fetch recruiter data
  useEffect(() => {
    const fetchRecruiter = async () => {
      try {
        const token = Cookies.get('token')

        if (!token) {
          window.location.href = '/recruiter/signin'
          return
        }

        const response = await fetch('/api/recruiters/verify', {
          headers: {
            'token': token
          }
        })

        if (!response.ok) {
          throw new Error('Failed to verify token')
        }

        const data = await response.json()

        if (data.success && data.recruiter) {
          setRecruiter(data.recruiter)
        } else {
          console.error('Invalid response format:', data)
          throw new Error('Invalid response format')
        }
      } catch (error) {
        console.error('Error fetching recruiter:', error)
        Cookies.remove('token')
        window.location.href = '/recruiter/signin'
      }
    }

    if (!publicRoutes.includes(pathname)) {
      fetchRecruiter()
    }
  }, [pathname])

  // Navigation items
  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/recruiter/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: 'Jobs',
      href: '/recruiter/jobs',
      isDropdown: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      subItems: [
        {
          name: 'All Jobs',
          href: '/recruiter/jobs',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          )
        },
        {
          name: 'Create Job',
          href: '/recruiter/jobs/post',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )
        }
      ]
    },
    {
      name: 'Applications',
      href: '/recruiter/applications',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ]

  // Return a simple wrapper for public routes
  if (publicRoutes.includes(pathname)) {
    return <div className="min-h-screen bg-white">{children}</div>
  }

  // Return the full layout with sidebar for authenticated routes
  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg className="w-6 h-6 text-[#0d3572]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-10 w-64 bg-[#0d3572] transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        {/* Recruiter Profile */}
        <div className="p-6 bg-[#0a2a5e]">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {recruiter?.name?.charAt(0)?.toUpperCase() || '?'}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {recruiter?.name || 'Loading...'}
              </p>
              <p className="text-xs text-gray-300 truncate">
                {recruiter?.company || 'Loading...'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.subItems && item.subItems.some(subItem => pathname === subItem.href));
              return (
                <div key={item.name}>
                  {item.isDropdown ? (
                    <>
                      {/* Make the dropdown header a button */}
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          isActive
                            ? 'bg-[#0a2a5e] text-white'
                            : 'text-gray-300 hover:bg-[#0a2a5e] hover:text-white'
                        }`}
                      >
                        {item.icon}
                        <span className="ml-3 flex-1 text-left">{item.name}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openDropdown === item.name ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Sub-items with animation */}
                      <div
                        className={`ml-4 mt-2 space-y-1 overflow-hidden transition-all duration-200 ${
                          openDropdown === item.name ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                              pathname === subItem.href
                                ? 'bg-[#0a2a5e] text-white'
                                : 'text-gray-300 hover:bg-[#0a2a5e] hover:text-white'
                            }`}
                          >
                            {subItem.icon}
                            <span className="ml-3">{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    // Regular link
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#0a2a5e] text-white'
                          : 'text-gray-300 hover:bg-[#0a2a5e] hover:text-white'
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            onClick={() => {
              Cookies.remove('token')
              window.location.href = '/recruiter/signin'
            }}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-white hover:bg-red-700 hover:text-white bg-red-600 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="ml-3 font-bold">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`lg:ml-64 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {children}
      </div>
    </div>
  )
}

export default RecruiterLayout 