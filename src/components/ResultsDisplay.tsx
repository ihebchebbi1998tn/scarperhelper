import { Button } from "./ui/button"
import { Copy } from "lucide-react"
import { useToast } from "./ui/use-toast"
import { ExtractedData } from "../types/types"

interface ResultsDisplayProps {
  results: ExtractedData[]
  dataType: string
  htmlTag: string
  searchQuery: string
}

export function ResultsDisplay({
  results,
  dataType,
  htmlTag,
  searchQuery,
}: ResultsDisplayProps) {
  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Selector copied to clipboard",
    })
  }

  const filteredResults = results.filter((item) => {
    const matchesType = dataType === "all" || item.type === dataType
    const matchesTag =
      htmlTag === "all" || item.selector.toLowerCase().startsWith(htmlTag)
    const matchesSearch =
      searchQuery === "" ||
      item.value.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesTag && matchesSearch
  })

  return (
    <div className="bg-[#2d2d2d] rounded-lg p-6 border border-editor-line">
      <h2 className="text-xl font-semibold mb-4 text-editor-text">Results</h2>
      {filteredResults.length === 0 ? (
        <div className="text-editor-line text-center py-8">
          No results match your filters.
        </div>
      ) : (
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {filteredResults.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-[#363636] rounded-md hover:bg-[#404040] transition-colors animate-fade-in"
            >
              <div className="flex items-center space-x-2 overflow-hidden">
                {item.icon}
                <div className="truncate">
                  <div className="text-sm truncate">{item.value}</div>
                  <code className="text-xs text-editor-line">
                    {item.selector}
                  </code>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(item.selector)}
                className="hover:bg-[#4a4a4a]"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}