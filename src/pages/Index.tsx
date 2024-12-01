import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Search, Link, Image, User, FileText } from "lucide-react"
import { ExtractedData } from "@/types/types"
import { FilterOptions } from "@/components/FilterOptions"
import { ResultsDisplay } from "@/components/ResultsDisplay"
import { DownloadResults } from "@/components/DownloadResults"

export default function Index() {
  const [htmlContent, setHtmlContent] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<ExtractedData[]>([])
  const [dataType, setDataType] = useState("all")
  const [htmlTag, setHtmlTag] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const extractData = (html: string) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html")
    const extractedData: ExtractedData[] = []

    // Extract links
    if (dataType === "all" || dataType === "link") {
      doc.querySelectorAll("a").forEach((link) => {
        if (link.href) {
          extractedData.push({
            type: "link",
            value: link.href,
            selector: generateSelector(link),
            icon: <Link className="h-4 w-4" />,
          })
        }
      })
    }

    // Extract images
    if (dataType === "all" || dataType === "image") {
      doc.querySelectorAll("img").forEach((img) => {
        if (img.src) {
          extractedData.push({
            type: "image",
            value: img.src,
            selector: generateSelector(img),
            icon: <Image className="h-4 w-4" />,
          })
        }
      })
    }

    // Extract text content
    if (dataType === "all" || dataType === "text") {
      const textSelectors = htmlTag === "all" 
        ? "h1, h2, h3, p, span, div" 
        : htmlTag
      
      doc.querySelectorAll(textSelectors).forEach((element) => {
        const text = element.textContent?.trim()
        if (text && text.length > 1 && text.length < 100) {
          extractedData.push({
            type: "text",
            value: text,
            selector: generateSelector(element),
            icon: <FileText className="h-4 w-4" />,
          })
        }
      })
    }

    return extractedData
  }

  const generateSelector = (element: Element): string => {
    let selector = element.tagName.toLowerCase()
    if (element.id) {
      selector += `#${element.id}`
    } else if (element.className) {
      selector += `.${element.className.split(" ").join(".")}`
    }
    return selector
  }

  const handleAnalyze = async () => {
    if (!htmlContent) {
      toast({
        title: "Missing input",
        description: "Please provide HTML content to analyze.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    try {
      const extractedData = extractData(htmlContent)
      setResults(extractedData)
      toast({
        title: "Analysis complete",
        description: `Found ${extractedData.length} potential data points.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze HTML content.",
        variant: "destructive",
      })
    }
    setIsAnalyzing(false)
  }

  return (
    <div className="min-h-screen bg-editor-bg text-editor-text">
      <div className="container p-6 mx-auto space-y-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent animate-fade-in">
          AI Web Scraping Assistant
        </h1>

        <div className="grid md:grid-cols-[1fr,300px] gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block text-editor-text">
                HTML Content
              </label>
              <Textarea
                placeholder="Paste the HTML content here"
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                className="min-h-[300px] font-mono bg-editor-bg border-editor-line text-editor-text"
              />
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex-1 bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze HTML
                  </>
                )}
              </Button>
              <DownloadResults results={results} />
            </div>
          </div>

          <FilterOptions
            dataType={dataType}
            setDataType={setDataType}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            htmlTag={htmlTag}
            setHtmlTag={setHtmlTag}
          />
        </div>

        <ResultsDisplay
          results={results}
          dataType={dataType}
          htmlTag={htmlTag}
          searchQuery={searchQuery}
        />

        <footer className="text-center text-editor-line pt-8 animate-fade-in">
          <p className="hover:text-purple-400 transition-colors">
            Built and developed by{" "}
            <a
              href="https://ihebchebbi.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline decoration-dotted"
            >
              Iheb Chebbi
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}