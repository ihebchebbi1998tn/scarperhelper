import { Button } from "./ui/button"
import { Download } from "lucide-react"
import { useToast } from "./ui/use-toast"

interface DownloadResultsProps {
  results: Array<{
    type: 'name' | 'link' | 'image';
    value: string;
    selector: string;
  }>;
}

export function DownloadResults({ results }: DownloadResultsProps) {
  const { toast } = useToast()

  const handleDownload = () => {
    try {
      const jsonString = JSON.stringify(results, null, 2)
      const blob = new Blob([jsonString], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "scraping-results.json"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Success!",
        description: "Results downloaded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download results",
        variant: "destructive",
      })
    }
  }

  return (
    <Button
      onClick={handleDownload}
      className="bg-purple-600 hover:bg-purple-700 transition-colors"
      disabled={results.length === 0}
    >
      <Download className="mr-2 h-4 w-4" />
      Download Results
    </Button>
  )
}