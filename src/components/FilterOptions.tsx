import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

interface FilterOptionsProps {
  dataType: string
  setDataType: (value: string) => void
  searchQuery: string
  setSearchQuery: (value: string) => void
  htmlTag: string
  setHtmlTag: (value: string) => void
}

export function FilterOptions({
  dataType,
  setDataType,
  searchQuery,
  setSearchQuery,
  htmlTag,
  setHtmlTag,
}: FilterOptionsProps) {
  return (
    <div className="space-y-6 bg-[#2d2d2d] p-6 rounded-lg border border-editor-line animate-fade-in">
      <div className="space-y-2">
        <Label>Data Type</Label>
        <RadioGroup
          value={dataType}
          onValueChange={setDataType}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All Data</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="image" id="image" />
            <Label htmlFor="image">Images Only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="text" id="text" />
            <Label htmlFor="text">Text Only</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>HTML Tag Filter</Label>
        <Select value={htmlTag} onValueChange={setHtmlTag}>
          <SelectTrigger>
            <SelectValue placeholder="Select HTML tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            <SelectItem value="h1">h1</SelectItem>
            <SelectItem value="h2">h2</SelectItem>
            <SelectItem value="h3">h3</SelectItem>
            <SelectItem value="p">p</SelectItem>
            <SelectItem value="span">span</SelectItem>
            <SelectItem value="div">div</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Search Results</Label>
        <Input
          type="text"
          placeholder="Search in results..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#363636] border-editor-line text-editor-text"
        />
      </div>
    </div>
  )
}