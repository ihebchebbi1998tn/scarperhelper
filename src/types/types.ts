import { ReactElement } from "react"

export interface ExtractedData {
  type: 'name' | 'link' | 'image' | 'text';
  value: string;
  selector: string;
  icon: ReactElement;
}