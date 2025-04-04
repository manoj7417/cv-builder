'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const services = {
  'back-to-work-programmes': {
    title: "Back to Work Programs",
    description: "Specialized programs supporting mental health returnees and ex-offenders in workplace reintegration.",
    icon: "briefcase",
    category: "Inclusion",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=500&auto=format",
    price: "Custom pricing based on program size",
    fullDescription: `Our Back to Work Programmes are designed to provide comprehensive support for individuals returning to the workforce. We offer:
      • Personalised mentoring and coaching
      • Skills assessment and development
      • Workplace readiness training
      • Ongoing support during transition
      • Employer partnership programmes`,
    benefits: [
      "Increased workforce diversity",
      "Social impact contribution",
      "Access to untapped talent pool",
      "Government incentives eligibility",
      "Enhanced corporate social responsibility"
    ],
    features: [
      "Customized program development",
      "Professional support team",
      "Progress tracking and reporting",
      "Success metrics and KPIs",
      "Regular program reviews"
    ],
    pricing: {
      starter: {
        name: "Basic Program",
        price: "Starting at $5,000",
        features: [
          "Up to 5 participants",
          "Basic training modules",
          "3-month support",
          "Monthly reporting"
        ]
      },
      professional: {
        name: "Professional Program",
        price: "Starting at $12,000",
        features: [
          "Up to 15 participants",
          "Advanced training modules",
          "6-month support",
          "Bi-weekly reporting",
          "Dedicated program manager"
        ]
      },
      enterprise: {
        name: "Enterprise Program",
        price: "Custom Quote",
        features: [
          "Unlimited participants",
          "Fully customized program",
          "12-month support",
          "Weekly reporting",
          "Dedicated team",
          "Custom KPIs"
        ]
      }
    }
  },
  'recruitment-optimization': {
    title: "Recruitment Process Optimization",
    description: "Expert consultation to refine and enhance your recruitment strategies and processes.",
    icon: "business",
    category: "Recruitment",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=500&auto=format",
    fullDescription: `Transform your recruitment process with our comprehensive optimization service. We help organizations:
      • Streamline hiring workflows
      • Implement AI-powered screening
      • Reduce time-to-hire
      • Improve candidate experience
      • Enhance quality of hires`,
    benefits: [
      "Reduced recruitment costs",
      "Faster hiring process",
      "Better candidate quality",
      "Improved employer branding",
      "Data-driven decisions"
    ],
    pricing: {
      basic: {
        name: "Process Audit",
        price: "Starting at $3,000",
        features: [
          "Current process analysis",
          "Gap identification",
          "Recommendations report",
          "One revision round"
        ]
      },
      standard: {
        name: "Implementation Package",
        price: "Starting at $8,000",
        features: [
          "Process audit",
          "Tool implementation",
          "Team training",
          "3-month support",
          "Monthly performance review"
        ]
      },
      premium: {
        name: "Complete Transformation",
        price: "Custom Quote",
        features: [
          "End-to-end implementation",
          "Custom ATS integration",
          "Ongoing optimization",
          "Quarterly reviews",
          "Priority support"
        ]
      }
    }
  },
  'outplacement-support': {
    title: "Outplacement Support",
    description: "Comprehensive support for transitioning employees.",
    icon: "helping-hand",
    category: "Career Transition",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=500&auto=format",
    fullDescription: `Support your transitioning employees with dignity and care. Our outplacement service includes:
      • Career counseling and guidance
      • Resume and LinkedIn optimization
      • Interview preparation
      • Job search strategy
      • Networking opportunities`,
    benefits: [
      "Maintain positive company image",
      "Reduce legal risks",
      "Support employee wellbeing",
      "Maintain team morale",
      "Demonstrate corporate responsibility"
    ],
    pricing: {
      individual: {
        name: "Individual Support",
        price: "Starting at $2,500",
        features: [
          "3-month support",
          "1-on-1 coaching",
          "Resume writing",
          "Job search strategy",
          "Interview prep"
        ]
      },
      group: {
        name: "Group Program",
        price: "Starting at $15,000",
        features: [
          "Up to 10 employees",
          "6-month support",
          "Group workshops",
          "Individual sessions",
          "Online resources"
        ]
      },
      enterprise: {
        name: "Enterprise Solution",
        price: "Custom Quote",
        features: [
          "Unlimited employees",
          "12-month support",
          "Dedicated team",
          "Custom workshops",
          "Placement assistance"
        ]
      }
    }
  },
  'corporate-training': {
    title: "Corporate Training Programs",
    description: "Customized training sessions for specific skills and industries.",
    icon: "graduation",
    category: "Training",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=500&auto=format",
    fullDescription: `Elevate your workforce with our tailored training programs. We offer:
      • Industry-specific skill development
      • Leadership training
      • Technical certifications
      • Soft skills workshops
      • Custom curriculum development`,
    benefits: [
      "Improved employee performance",
      "Higher retention rates",
      "Enhanced productivity",
      "Better team collaboration",
      "Measurable ROI"
    ],
    pricing: {
      starter: {
        name: "Essential Training",
        price: "Starting at $4,000",
        features: [
          "Single skill focus",
          "Up to 20 participants",
          "Standard materials",
          "Basic assessment"
        ]
      },
      professional: {
        name: "Comprehensive Program",
        price: "Starting at $10,000",
        features: [
          "Multiple skills",
          "Up to 50 participants",
          "Custom materials",
          "Detailed reporting",
          "Follow-up session"
        ]
      },
      enterprise: {
        name: "Enterprise Solution",
        price: "Custom Quote",
        features: [
          "Full curriculum design",
          "Unlimited participants",
          "Custom platform",
          "Certification program",
          "Ongoing support"
        ]
      }
    }
  },
  'team-building': {
    title: "Team Building Retreats",
    description: "Engaging events to enhance team cohesion and morale.",
    icon: "users",
    category: "Team Development",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=500&auto=format",
    fullDescription: `Create stronger teams through our expertly designed retreats. Programs include:
      • Team dynamics workshops
      • Outdoor activities
      • Problem-solving challenges
      • Communication exercises
      • Strategic planning sessions`,
    benefits: [
      "Improved team communication",
      "Enhanced collaboration",
      "Stronger relationships",
      "Increased motivation",
      "Better problem-solving"
    ],
    pricing: {
      halfDay: {
        name: "Half-Day Event",
        price: "Starting at $2,500",
        features: [
          "4-hour program",
          "Up to 20 participants",
          "Basic activities",
          "Facilitation",
          "Materials"
        ]
      },
      fullDay: {
        name: "Full-Day Retreat",
        price: "Starting at $5,000",
        features: [
          "8-hour program",
          "Up to 40 participants",
          "Multiple activities",
          "Meals included",
          "Follow-up report"
        ]
      },
      multiDay: {
        name: "Multi-Day Experience",
        price: "Custom Quote",
        features: [
          "2-3 day program",
          "Custom activities",
          "Accommodation",
          "All-inclusive",
          "Strategic planning"
        ]
      }
    }
  },
  'executive-coaching': {
    title: "Executive Coaching",
    description: "One-on-one coaching sessions for leadership excellence and performance optimization.",
    icon: "workspace",
    category: "Leadership",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=500&auto=format",
    fullDescription: `Transform your leadership capabilities with our executive coaching program:
      • Personalized leadership assessment
      • One-on-one coaching sessions
      • Strategic decision-making training
      • Communication skills enhancement
      • Performance optimization strategies`,
    benefits: [
      "Enhanced leadership capabilities",
      "Improved decision-making skills",
      "Better team management",
      "Strategic thinking development",
      "Increased emotional intelligence"
    ],
    pricing: {
      basic: {
        name: "Essential Coaching",
        price: "Starting at $3,000/month",
        features: [
          "Monthly sessions",
          "Basic assessment",
          "Email support",
          "Progress tracking"
        ]
      },
      premium: {
        name: "Intensive Coaching",
        price: "Starting at $5,000/month",
        features: [
          "Bi-weekly sessions",
          "Advanced assessment",
          "24/7 support",
          "Custom development plan",
          "Monthly progress report"
        ]
      },
      executive: {
        name: "Executive Package",
        price: "Custom Quote",
        features: [
          "Weekly sessions",
          "Comprehensive assessment",
          "Priority support",
          "Team alignment sessions",
          "Quarterly retreats"
        ]
      }
    }
  },
  'corporate-wellness': {
    title: "Corporate Wellness Programs",
    description: "Holistic wellness initiatives promoting employee health and mental well-being.",
    icon: "heartbeat",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=500&auto=format",
    fullDescription: `Create a healthier, more productive workplace with our comprehensive wellness programs:
      • Mental health support
      • Physical fitness programs
      • Stress management workshops
      • Nutrition guidance
      • Work-life balance coaching`,
    benefits: [
      "Reduced employee stress",
      "Lower healthcare costs",
      "Increased productivity",
      "Better employee retention",
      "Enhanced company culture"
    ],
    pricing: {
      basic: {
        name: "Essential Wellness",
        price: "Starting at $2,500/month",
        features: [
          "Basic health assessments",
          "Monthly workshops",
          "Online resources",
          "Quarterly reports"
        ]
      },
      standard: {
        name: "Comprehensive Wellness",
        price: "Starting at $5,000/month",
        features: [
          "Full health assessments",
          "Weekly sessions",
          "Personal coaching",
          "Mental health support",
          "Monthly analytics"
        ]
      },
      premium: {
        name: "Complete Wellness",
        price: "Custom Quote",
        features: [
          "24/7 wellness support",
          "On-site facilities",
          "Custom programs",
          "Family inclusion",
          "Full program management"
        ]
      }
    }
  },
  'professional-development': {
    title: "Professional Development",
    description: "Comprehensive courses and workshops for continuous career advancement.",
    icon: "trending-up",
    category: "Development",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format",
    fullDescription: `Accelerate career growth with our professional development programmes:
      • Skill assessment and planning
      • Industry-specific training
      • Certification preparation
      • Career path mapping
      • Mentorship opportunities`,
    benefits: [
      "Enhanced skill set",
      "Career advancement",
      "Industry recognition",
      "Networking opportunities",
      "Personal growth"
    ],
    pricing: {
      individual: {
        name: "Individual Track",
        price: "Starting at $1,500",
        features: [
          "Personal assessment",
          "Custom learning path",
          "Online courses",
          "Monthly mentoring"
        ]
      },
      team: {
        name: "Team Development",
        price: "Starting at $5,000",
        features: [
          "Team assessment",
          "Group workshops",
          "Certification support",
          "Quarterly reviews",
          "Progress tracking"
        ]
      },
      enterprise: {
        name: "Enterprise Solution",
        price: "Custom Quote",
        features: [
          "Company-wide program",
          "Custom curriculum",
          "Certification programs",
          "Regular assessments",
          "ROI tracking"
        ]
      }
    }
  },
  'csr-initiatives': {
    title: "CSR Initiatives",
    description: "Meaningful programs connecting your business with community impact.",
    icon: "volunteer",
    category: "Social Impact",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=500&auto=format",
    fullDescription: `Create meaningful social impact through our CSR programs:
      • Community engagement projects
      • Environmental initiatives
      • Social responsibility planning
      • Impact measurement
      • Stakeholder engagement`,
    benefits: [
      "Enhanced brand reputation",
      "Community goodwill",
      "Employee engagement",
      "Sustainable practices",
      "Measurable social impact"
    ],
    pricing: {
      starter: {
        name: "Basic CSR",
        price: "Starting at $10,000",
        features: [
          "Program design",
          "Basic implementation",
          "Quarterly activities",
          "Impact reporting"
        ]
      },
      advanced: {
        name: "Comprehensive CSR",
        price: "Starting at $25,000",
        features: [
          "Strategic planning",
          "Full implementation",
          "Monthly activities",
          "Stakeholder engagement",
          "Detailed reporting"
        ]
      },
      premium: {
        name: "Complete CSR",
        price: "Custom Quote",
        features: [
          "Full program management",
          "Multiple initiatives",
          "Community partnerships",
          "Media coverage",
          "Annual impact report"
        ]
      }
    }
  },
  'innovation-workshops': {
    title: "Innovation Workshops",
    description: "Cutting-edge sessions on technology and innovative business practices.",
    icon: "lightbulb",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=500&auto=format",
    fullDescription: `Drive innovation in your organization through our specialized workshops:
      • Design thinking sessions
      • Technology trend analysis
      • Innovation strategy development
      • Creative problem-solving
      • Future-readiness planning`,
    benefits: [
      "Enhanced creativity",
      "Competitive advantage",
      "New solution development",
      "Team innovation skills",
      "Future-ready mindset"
    ],
    pricing: {
      halfDay: {
        name: "Half-Day Workshop",
        price: "Starting at $3,000",
        features: [
          "4-hour session",
          "Basic materials",
          "Up to 15 participants",
          "Summary report"
        ]
      },
      fullDay: {
        name: "Full-Day Workshop",
        price: "Starting at $5,500",
        features: [
          "8-hour session",
          "Complete materials",
          "Up to 25 participants",
          "Action planning",
          "Follow-up session"
        ]
      },
      series: {
        name: "Workshop Series",
        price: "Custom Quote",
        features: [
          "Multiple sessions",
          "Custom content",
          "Implementation support",
          "Progress tracking",
          "Innovation roadmap"
        ]
      }
    }
  },
  'leadership-development': {
    title: "Leadership Development",
    description: "Comprehensive programs to cultivate next-generation leaders.",
    icon: "chalkboard-teacher",
    category: "Leadership",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=500&auto=format",
    fullDescription: `Develop strong leaders through our comprehensive leadership programs:
      • Leadership style assessment
      • Strategic thinking development
      • Team management skills
      • Change management training
      • Executive presence coaching`,
    benefits: [
      "Strong leadership pipeline",
      "Improved team performance",
      "Better decision-making",
      "Enhanced communication",
      "Succession readiness"
    ],
    pricing: {
      emerging: {
        name: "Emerging Leaders",
        price: "Starting at $4,000",
        features: [
          "Basic assessment",
          "Group workshops",
          "Online modules",
          "Quarterly reviews"
        ]
      },
      advanced: {
        name: "Advanced Leadership",
        price: "Starting at $8,000",
        features: [
          "Complete assessment",
          "Individual coaching",
          "Group sessions",
          "Project work",
          "Monthly reviews"
        ]
      },
      executive: {
        name: "Executive Development",
        price: "Custom Quote",
        features: [
          "360° assessment",
          "One-on-one coaching",
          "Strategic projects",
          "Board preparation",
          "Ongoing support"
        ]
      }
    }
  },
  'mental-health-first-aid': {
    title: "Mental Health First Aid for Corporates",
    description: "Comprehensive training for workplace mental health support and crisis management.",
    icon: "heartbeat",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2000&auto=format",
    fullDescription: `Equip your organisation with essential mental health support skills:
      • Mental health first aid certification
      • Crisis intervention training
      • Stress management techniques
      • Employee wellbeing programmes
      • Support system implementation`,
    benefits: [
      "Improved employee wellbeing",
      "Reduced workplace stress",
      "Better crisis management",
      "Enhanced workplace culture",
      "Lower absenteeism rates"
    ],
    pricing: {
      basic: {
        name: "Essential Training",
        price: "Starting at $2,000",
        features: [
          "Basic MHFA certification",
          "Up to 10 participants",
          "Course materials",
          "Basic assessment"
        ]
      },
      standard: {
        name: "Comprehensive Program",
        price: "Starting at $4,500",
        features: [
          "Advanced MHFA certification",
          "Up to 20 participants",
          "Implementation support",
          "Crisis management protocols",
          "6-month follow-up"
        ]
      },
      premium: {
        name: "Enterprise Solution",
        price: "Custom Quote",
        features: [
          "Full organization coverage",
          "Custom protocols",
          "Ongoing support",
          "Regular refresher courses",
          "24/7 crisis support"
        ]
      }
    }
  },
  'disability-confident': {
    title: "Disability Confident",
    description: "Programs to create inclusive workplaces and support disability employment.",
    icon: "users",
    category: "Inclusion",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=2000&auto=format",
    fullDescription: `Create an inclusive workplace environment with our comprehensive program:
      • Disability awareness training
      • Workplace accessibility assessment
      • Inclusive recruitment practices
      • Reasonable adjustment protocols
      • Support system implementation`,
    benefits: [
      "Enhanced workplace diversity",
      "Improved accessibility",
      "Legal compliance",
      "Positive company image",
      "Access to wider talent pool"
    ],
    pricing: {
      starter: {
        name: "Basic Assessment",
        price: "Starting at $3,500",
        features: [
          "Initial assessment",
          "Basic training",
          "Compliance review",
          "Recommendations report"
        ]
      },
      professional: {
        name: "Implementation Program",
        price: "Starting at $8,000",
        features: [
          "Full assessment",
          "Staff training",
          "Policy development",
          "Implementation support",
          "6-month guidance"
        ]
      },
      enterprise: {
        name: "Complete Solution",
        price: "Custom Quote",
        features: [
          "Organization-wide program",
          "Custom policies",
          "Full implementation",
          "Ongoing support",
          "Regular reviews"
        ]
      }
    }
  },
  'sales-training': {
    title: "Sales Training",
    description: "Advanced sales techniques and strategies for revenue growth.",
    icon: "chart-line",
    category: "Training",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2000&auto=format",
    fullDescription: `Enhance your sales team's performance with our comprehensive training:
      • Modern sales techniques
      • Customer behaviour psychology
      • Digital sales tools
      • Negotiation skills
      • Programme management`,
    benefits: [
      "Increased conversion rates",
      "Higher revenue generation",
      "Improved customer relationships",
      "Better team performance",
      "Enhanced sales processes"
    ],
    pricing: {
      basic: {
        name: "Essential Sales Training",
        price: "Starting at $2,500",
        features: [
          "Basic techniques",
          "Up to 10 participants",
          "1-day workshop",
          "Basic materials"
        ]
      },
      advanced: {
        name: "Advanced Program",
        price: "Starting at $6,000",
        features: [
          "Advanced techniques",
          "Up to 20 participants",
          "3-day workshop",
          "Digital tools training",
          "3-month support"
        ]
      },
      premium: {
        name: "Elite Sales Program",
        price: "Custom Quote",
        features: [
          "Custom curriculum",
          "Unlimited participants",
          "Extended program",
          "Personal coaching",
          "Ongoing support"
        ]
      }
    }
  },
  'recruitment-days': {
    title: "Recruitment Days",
    description: "Organized recruitment events to attract and assess top talent.",
    icon: "user-plus",
    category: "Recruitment",
    image: "https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=2000&auto=format",
    fullDescription: `Streamline your hiring process with our organised recruitment events:
      • Event planning and management
      • Candidate screening
      • Assessment centres
      • Interview coordination
      • Talent pool development`,
    benefits: [
      "Efficient hiring process",
      "Access to wider talent pool",
      "Standardized assessment",
      "Time and cost savings",
      "Enhanced employer branding"
    ],
    pricing: {
      basic: {
        name: "Single Day Event",
        price: "Starting at $5,000",
        features: [
          "Full day event",
          "Up to 50 candidates",
          "Basic assessments",
          "Event management"
        ]
      },
      standard: {
        name: "Multi-Day Program",
        price: "Starting at $12,000",
        features: [
          "2-3 day event",
          "Up to 100 candidates",
          "Advanced assessments",
          "Full coordination",
          "Results analysis"
        ]
      },
      premium: {
        name: "Custom Program",
        price: "Custom Quote",
        features: [
          "Customized duration",
          "Unlimited candidates",
          "Complete assessment center",
          "Full recruitment support",
          "Talent pool creation"
        ]
      }
    }
  },
  'marketing-training': {
    title: "Marketing Training",
    description: "Modern marketing strategies and digital skills development.",
    icon: "bullhorn",
    category: "Training",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2000&auto=format",
    fullDescription: `Develop cutting-edge marketing capabilities within your organisation:
      • Digital marketing strategies
      • Social media management
      • Content creation
      • Analytics and metrics
      • Brand development`,
    benefits: [
      "Enhanced digital presence",
      "Better ROI tracking",
      "Improved brand awareness",
      "Increased engagement",
      "Data-driven decisions"
    ],
    pricing: {
      basic: {
        name: "Fundamentals",
        price: "Starting at $3,000",
        features: [
          "Basic principles",
          "Up to 10 participants",
          "2-day workshop",
          "Essential tools training"
        ]
      },
      professional: {
        name: "Comprehensive Program",
        price: "Starting at $7,500",
        features: [
          "Advanced strategies",
          "Up to 20 participants",
          "5-day program",
          "Tools and software",
          "3-month support"
        ]
      },
      enterprise: {
        name: "Custom Solution",
        price: "Custom Quote",
        features: [
          "Tailored curriculum",
          "Unlimited participants",
          "Extended program",
          "Implementation support",
          "Ongoing consultation"
        ]
      }
    }
  }
}

const ServicePage = ({ params }) => {
  const router = useRouter()
  const service = services[params.slug]

  if (!service) {
    return <div>Service not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <div className="relative h-96 w-full">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="text-white max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
                <p className="text-xl">{service.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Programme Overview</h2>
                <p className="whitespace-pre-line text-gray-600">{service.fullDescription}</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Key Benefits</h2>
                <ul className="space-y-4">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <span className="h-2 w-2 bg-blue-600 rounded-full mr-3"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Interested in this Service?</h3>
                <p className="text-gray-600 mb-6">
                  Get in touch with our team to discuss how we can customise this service to your organisation&apos;s requirements.
                </p>
                <ul className="space-y-3 mb-6">
                  {service.features?.slice(0, 5).map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => router.push(`/contact-us?message=${encodeURIComponent(`Hello, I'm interested in learning more about your ${service.title} service and how it can benefit our organisation. I would like to discuss the possibilities and receive detailed information about customisation and implementation options.`)}`)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Contact Our Team
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ServicePage 