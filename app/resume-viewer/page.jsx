import Template3 from '@/components/resume-templates/Template3';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react'


const ResumeViewPage = () => {
    const [scale,setScale] = useState(0.8)
  return (
    <div>
      <div className="resume_view_section">
          <Template3 scale={scale}/>
      </div>
      {/* <div className="mobile_section lg:hidden block">
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <h2>gsdngnsdlk</h2>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <h3>mdfm;ldfmg</h3>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      </div> */}
      {/* <div className="controls absolute bottom-16 left-[300px]">
      <div className="flex items-center gap-2">
        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.01}
        />
        <div className="w-10">{`${Math.round(scale * 100)}%`}</div>
        <label className="hidden items-center gap-1 lg:flex">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4"
            checked={true}
          />
          <span className="select-none">Autoscale</span>
        </label>
      </div>
      </div> */}
    </div>
  )
}

export default ResumeViewPage