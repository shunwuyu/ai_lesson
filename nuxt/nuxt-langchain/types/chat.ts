export interface Message {
  type: 'bot' | 'user'
  message: string
  dateTime?: string
}

export interface AttachmentType {
  id: string
  title: string
  downloadLink: string
  webLink: string
  version: number
}

export interface Content {
  id: string
  title: string
  content: string
  link: string
  attachments: AttachmentType[]
}