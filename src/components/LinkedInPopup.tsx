import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Linkedin } from "lucide-react"

export function LinkedInPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true)
    }, 30000) // Show after 30 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Let's Connect! 🚀</DialogTitle>
          <DialogDescription className="text-center">
            I would be happy if we could connect on LinkedIn! Let's grow our professional network together.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center pt-4">
          <Button asChild className="bg-[#0A66C2] hover:bg-[#084d91] transition-colors">
            <a
              href="https://www.linkedin.com/in/iheb-chebbi-bb2b28183/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <Linkedin className="h-5 w-5" />
              <span>Connect on LinkedIn</span>
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}