
import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Chatui } from "./chatui"

export function ChatDashboard() {
  return (
    <div className="flex flex-col  h-screen w-screen bg-gray-100 ">

     
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-8 px-4 w-[calc(100%-10rem)]">
          <div className="flex space-y-6">
          <div className="bg-white w-96 mt-6 me-10  rounded-lg shadow-sm p-4">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Recommended Next Steps</h2>
                <div className="space-y-2">
                  <div className="flex items-start gap-4">
                    <CalendarCheck2Icon className="h-6 w-6  shrink-0 " />
                    <div>
                      <h3 className="font-medium">Build a Resume or CV</h3>
                      <p className="text-gray-500 text-sm ">
                        If you&apos;re looking to get your resume or CV ready, Genie can help you with that. Just let us know what you need and we&apos;ll get you a customized document that meets your needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 py-5">
                    <PillIcon className="h-6 w-6  shrink-0 " />
                    <div>
                      <h3 className="font-medium">Analyze & Identify why your resume isn&apos;t getting callbacks.</h3>
                      <p className="text-gray-500 text-sm">
                      To understand why you&apos;re not receiving responses from job applications, evaluate your resume or CV to pinpoint areas that may need improvement. This involves checking the document for any issues with formatting, content relevance, and alignment with job descriptions, which could be causing employers to overlook your application.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <FireExtinguisherIcon className="h-6 w-6  shrink-0 " />
                    <div>
                      <h3 className="font-medium">Seek Genie&apos;s Help</h3>
                      <p className="text-gray-500 text-sm">
                      Reach out to Genie for expert guidance on career decisions, job searches, resume reviews, and more. Genie is equipped to offer personalized advice and practical solutions to help you achieve your professional goals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>

            
            <div className="bg-white  rounded-lg shadow-sm p-4">
              <div className="flex gap-4 items-center">
                <Avatar>
                  <AvatarImage alt="Health Buddy" src="/Designer.png" />
                  <AvatarFallback>CG</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">How can I help you today?</h2>
                  <p className="text-gray-500 text-sm max-w-3xl">
                  Genie is at your service, ready to guide you to success. Whether you&apos;re aiming for career advancement, seeking a new job, uncertain about career decisions, or needing assistance with your resume, rest assured, Genie has got your back.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white  rounded-lg shadow-sm p-4">
              <Chatui />
            </div>
            </div>
            
          </div>
        </div>
      </main>
      
    </div>
  )
}

function CalendarCheck2Icon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
      <path d="M3 10h18" />
      <path d="m16 20 2 2 4-4" />
    </svg>
  )
}


function CrossIcon(props) {
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
      <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
    </svg>
  )
}


function FireExtinguisherIcon(props) {
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
      <path d="M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5" />
      <path d="M9 18h8" />
      <path d="M18 3h-3" />
      <path d="M11 3a6 6 0 0 0-6 6v11" />
      <path d="M5 13h4" />
      <path d="M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z" />
    </svg>
  )
}


function PillIcon(props) {
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
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  )
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
  )
}
