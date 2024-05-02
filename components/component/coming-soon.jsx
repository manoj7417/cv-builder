
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ComingSoon() {
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#0B2447] to-[#19376D] text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url(/water-bg.gif)] bg-cover bg-center opacity-20" />
      </div>
      <header className="z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link className="flex items-center gap-2 text-2xl font-bold" href="#">
          <AtomIcon className="h-8 w-8" />
          PharmAI
        </Link>
        <Button className="rounded-full px-4 py-2 text-sm" variant="outline">
          Learn More
        </Button>
      </header>
      <main className="z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        <div className="mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Unlock Pharma Insights with AI-Powered Data Analysis
          </h1>
          <p className="text-lg text-gray-300 md:text-xl">
            Our platform leverages generative AI and semantic search to guide pharmaceutical researchers, boasting an
            88% accuracy compared to ChatGPT4&apos;s 55%.
          </p>
          <form className="mx-auto flex w-full max-w-md items-center space-x-2">
            <Input
              className="flex-1 rounded-md border-none bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Enter your email"
              type="email"
            />
            <Button
              className="rounded-md bg-[#1B98F5] px-6 py-3 font-medium transition-colors hover:bg-[#1583d1]"
              type="submit"
            >
              Join Waitlist
            </Button>
          </form>
        </div>
      </main>
      <footer className="z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 text-sm text-gray-400">
        <p>© 2024 PharmAI. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link className="hover:text-white" href="#">
            Privacy
          </Link>
          <Link className="hover:text-white" href="#">
            Terms
          </Link>
          <Link className="hover:text-white" href="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function AtomIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
      <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
    </svg>
  )
}
