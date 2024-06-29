'use client'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import { GetTokens } from "../actions";

export default function Page() {
  const [questions, setQuestions] = useState({
    'Current Pursuits and Activities': {
      1: { question: "Are you studying? If yes, what are you studying? If you are working, what is your role and describe your work?", answer: "" },
      2: { question: 'What is your highest level of education?', answer: '' },
      3: { question: 'Which subjects or areas do you feel most confident in?', answer: '' },
      4: { question: 'Can you share any notable achievements or activities you have participated in recently?', answer: '' }
    },
    'Hobbies and Interests': {
      1: { question: 'What hobbies or activities do you enjoy in your free time?', answer: '' },
      2: { question: 'Are there any subjects or topics you are particularly passionate about?', answer: '' }
    },
    'Strengths and Weaknesses': {
      1: { question: 'What do you consider to be your greatest strengths or skills?', answer: '' },
      2: { question: 'Are there any areas where you feel you need improvement?', answer: '' }
    },
    'Career Aspirations': {
      1: { question: 'What are your career goals or aspirations?', answer: '' },
      2: { question: 'Is there a specific career path you are interested in?', answer: '' },
    },
    'Location and Age': {
      1: { question: 'Which country do you currently reside in?', answer: '' },
      2: { question: 'How old are you?', answer: '' }
    }
  })
  const [currentSection, setCurrentSection] = useState('')
  const [chat, setChat] = useState({
    section: "",
    chat: [ ]
  })

  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="hidden w-16 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90 md:h-8 md:w-8 md:text-base"
                  prefetch={false}
                >
                  <WebcamIcon className="h-5 w-5" />
                  <span className="sr-only">Career Counselor</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Career Counselor</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <BriefcaseIcon className="h-5 w-5" />
                  <span className="sr-only">Job Search</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Job Search</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <GraduationCapIcon className="h-5 w-5" />
                  <span className="sr-only">Education</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Education</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <CompassIcon className="h-5 w-5" />
                  <span className="sr-only">Career Exploration</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Career Exploration</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <ClipboardIcon className="h-5 w-5" />
                  <span className="sr-only">Resume Building</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Resume Building</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <SettingsIcon className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </div>
      <div className="flex flex-col flex-1 sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  prefetch={false}
                >
                  <WebcamIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Career Counselor</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <BriefcaseIcon className="h-5 w-5" />
                  Job Search
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <GraduationCapIcon className="h-5 w-5" />
                  Education
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <CompassIcon className="h-5 w-5" />
                  Career Exploration
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <ClipboardIcon className="h-5 w-5" />
                  Resume Building
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="ml-auto flex-1 md:grow-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                  <img
                    src="/placeholder.svg"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Jane Doe</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col lg:flex-row gap-4 p-4 sm:px-6 sm:py-0">
          <div className="flex-1">
            <Card className="h-full w-full overflow-hidden">
              <CardHeader className="flex items-center justify-between border-b bg-muted px-6 py-4">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8 border">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>CC</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">Career Counselor</div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoveHorizontalIcon className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-scroll p-4 h-[70%] no-scrollbar">
                <div className="grid gap-4">
                  {
                    Object.keys(questions).length > 0
                  }
                  <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1 rounded-lg bg-muted p-3 text-sm">
                      <div className="font-medium">Jane Doe</div>
                      <div>
                        Hi, I&apos;m looking for some guidance on transitioning to a new career. Can you help me explore my
                        options?
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 justify-end">
                    <div className="grid gap-1 rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                      <div className="font-medium">Career Counselor</div>
                      <div>
                        Absolutely, I&apos;d be happy to help. Let&apos;s start by discussing your current skills and interests.
                        What kind of work are you most passionate about?
                      </div>
                    </div>
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>CC</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1 rounded-lg bg-muted p-3 text-sm">
                      <div className="font-medium">Jane Doe</div>
                      <div>
                        Well, I&apos;ve always been interested in technology and problem-solving. I have a background in
                        marketing, but I&apos;ve been feeling unfulfilled lately.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 justify-end">
                    <div className="grid gap-1 rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                      <div className="font-medium">Career Counselor</div>
                      <div>
                        That&apos;s great, technology and problem-solving are valuable skills. Have you considered roles in
                        software development, product management, or user experience design? Those could be a good fit
                        based on your interests and background.
                      </div>
                    </div>
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>CC</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted px-6 py-3">
                <div className="relative">
                  <Textarea
                    placeholder="Type your message..."
                    name="message"
                    id="message"
                    rows={1}
                    className="min-h-[48px] w-full rounded-2xl resize-none p-4 pr-16 border border-neutral-400 shadow-sm"
                  />
                  <Button type="submit" size="icon" className="absolute w-8 h-8 top-3 right-3">
                    <SendIcon className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="w-full lg:w-1/3">
            <Card className="h-full w-full overflow-hidden">
              <CardHeader className="flex items-center justify-between border-b bg-muted px-6 py-4">
                <div className="font-medium">Chat History</div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoveHorizontalIcon className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto p-4">
                <div className="grid gap-4">
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-md bg-muted p-3 transition-colors hover:bg-accent hover:text-accent-foreground"
                    prefetch={false}
                  >
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 truncate">
                      <div className="font-medium">Jane Doe</div>
                      <div className="text-sm text-muted-foreground">
                        Hi, I&apos;m looking for some guidance on transitioning to a new career. Can you help me explore my
                        options?
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">2:30 PM</div>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-md bg-muted p-3 transition-colors hover:bg-accent hover:text-accent-foreground"
                    prefetch={false}
                  >
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 truncate">
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text-muted-foreground">
                        I&apos;m interested in exploring a career in data analytics. Can we discuss my options?
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">1:45 PM</div>
                  </Link>
                  {/* Add more chat history items as needed */}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function BriefcaseIcon(props) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function ClipboardIcon(props) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function CompassIcon(props) {
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
      <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function GraduationCapIcon(props) {
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
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MoveHorizontalIcon(props) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function SendIcon(props) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function WebcamIcon(props) {
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
      <circle cx="12" cy="10" r="8" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
    </svg>
  );
}
