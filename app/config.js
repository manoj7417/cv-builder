export const dynamicRoutes = [
  '/job-cv',
  '/resume-analyzer',
  '/resume-builder',
  '/cv-studio',
  '/career-services',
  '/recruiter',
  '/job-dashboard',
  '/coming-soon',
  '/api/recruiters/alljobs',
  '/api/recruiters/jobs',
  '/api/recruiters/applications',
  '/recruiter/applications',
  '/recruiter/jobs',
  '/recruiter/dashboard',
  '/api/sitemap',
  '/sitemap.xml'
]

export const dynamicParams = true

export const generateStaticParams = () => {
  return []
}

export const fetchCache = 'force-no-store'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.geniescareerhub.com' 