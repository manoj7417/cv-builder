'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaBriefcase, FaUsers, FaHandsHelping, FaGraduationCap, FaHeartbeat, FaLightbulb, FaChalkboardTeacher, FaArrowRight } from 'react-icons/fa'
import { MdBusinessCenter, MdVolunteerActivism, MdTrendingUp } from 'react-icons/md'
import { BsPersonWorkspace } from 'react-icons/bs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const CorporatePage = () => {
  const router = useRouter()
  const [hoveredService, setHoveredService] = useState(null)
  
  const handleServiceClick = (serviceSlug) => {
    router.push(`/corporate/services/${serviceSlug}`)
  }

  const services = [
    {
      title: "Back to Work Programs",
      description: "Specialized programs supporting mental health returnees and ex-offenders in workplace reintegration.",
      icon: <FaBriefcase className="text-4xl text-blue-600" />,
      category: "Inclusion",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=500&auto=format",
      slug: "back-to-work-programs"
    },
    {
      title: "Recruitment Process Optimization",
      description: "Expert consultation to refine and enhance your recruitment strategies and processes.",
      icon: <MdBusinessCenter className="text-4xl text-blue-600" />,
      category: "Recruitment",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=500&auto=format",
      slug: "recruitment-optimization"
    },
    {
      title: "Outplacement Support",
      description: "Comprehensive support for transitioning employees, ensuring smooth career changes.",
      icon: <FaHandsHelping className="text-4xl text-blue-600" />,
      category: "Career Transition",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=500&auto=format",
      slug: "outplacement-support"
    },
    {
      title: "Corporate Training Programs",
      description: "Customized training sessions tailored to your industry and skill requirements.",
      icon: <FaGraduationCap className="text-4xl text-blue-600" />,
      category: "Training",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=500&auto=format",
      slug: "corporate-training"
    },
    {
      title: "Team Building Retreats",
      description: "Engaging events designed to enhance team cohesion and workplace morale.",
      icon: <FaUsers className="text-4xl text-blue-600" />,
      category: "Team Development",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=500&auto=format",
      slug: "team-building"
    },
    {
      title: "Executive Coaching",
      description: "One-on-one coaching sessions for leadership excellence and performance optimization.",
      icon: <BsPersonWorkspace className="text-4xl text-blue-600" />,
      category: "Leadership",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=500&auto=format",
      slug: "executive-coaching"
    },
    {
      title: "Corporate Wellness Programs",
      description: "Holistic wellness initiatives promoting employee health and mental well-being.",
      icon: <FaHeartbeat className="text-4xl text-blue-600" />,
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=500&auto=format",
      slug: "corporate-wellness"
    },
    {
      title: "Professional Development",
      description: "Comprehensive courses and workshops for continuous career advancement.",
      icon: <MdTrendingUp className="text-4xl text-blue-600" />,
      category: "Development",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format",
      slug: "professional-development"
    },
    {
      title: "CSR Initiatives",
      description: "Meaningful programs connecting your business with community impact.",
      icon: <MdVolunteerActivism className="text-4xl text-blue-600" />,
      category: "Social Impact",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=500&auto=format",
      slug: "csr-initiatives"
    },
    {
      title: "Innovation Workshops",
      description: "Cutting-edge sessions on technology and innovative business practices.",
      icon: <FaLightbulb className="text-4xl text-blue-600" />,
      category: "Innovation",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=500&auto=format",
      slug: "innovation-workshops"
    },
    {
      title: "Leadership Development",
      description: "Comprehensive programs to cultivate next-generation leaders.",
      icon: <FaChalkboardTeacher className="text-4xl text-blue-600" />,
      category: "Leadership",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=500&auto=format",
      slug: "leadership-development"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format"
          alt="Corporate Office"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        
        {/* Light overlay for text readability */}
        <div className="absolute inset-0 bg-black/40">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
                Transform Your <span className="text-blue-300">Workforce</span> with Our Corporate Solutions
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                Comprehensive solutions designed to elevate your organization's performance and employee potential.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => router.push('/contact-us')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1"
                >
                  Get Started
                </button>
                <button 
                  onClick={() => router.push('/about-us')}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all"
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Corporate Clients" },
              { number: "95%", label: "Client Satisfaction" },
              { number: "10k+", label: "Professionals Trained" },
              { number: "15+", label: "Years Experience" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid with Improved Cards */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Our Corporate Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions tailored to meet your organization's unique needs and challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
              onClick={() => handleServiceClick(service.slug)}
              className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6 relative">
                <div className="flex items-center gap-3 mb-4">
                  {service.icon}
                  <span className="text-sm font-semibold text-blue-600">
                    {service.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className={`flex items-center text-blue-600 transition-opacity duration-300 ${hoveredService === index ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="mr-2">Learn More</span>
                  <FaArrowRight />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We bring expertise, innovation, and dedication to every partnership.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Team",
                description: "Industry professionals with proven track records",
                icon: <FaUsers className="text-4xl text-blue-600" />
              },
              {
                title: "Customized Solutions",
                description: "Tailored approaches for your specific needs",
                icon: <FaLightbulb className="text-4xl text-blue-600" />
              },
              {
                title: "Proven Results",
                description: "Measurable outcomes and success stories",
                icon: <MdTrendingUp className="text-4xl text-blue-600" />
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg text-center"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Transform Your Workplace?</h2>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              Let's discuss how our corporate solutions can help your organization thrive in today's competitive landscape.
            </p>
            <button 
              onClick={() => router.push('/contact-us')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
            >
              Schedule a Consultation
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CorporatePage