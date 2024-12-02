"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, Square } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant';
  content: string;
  audio?: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  
  const audioContextRef = useRef<AudioContext | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const audioChunksRef = useRef<Float32Array[]>([])
  const startTimeRef = useRef<number>(0)
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (audioURL) {
        URL.revokeObjectURL(audioURL)
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [audioURL])

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      const processor = audioContextRef.current.createScriptProcessor(1024, 1, 1)
      processorRef.current = processor

      source.connect(processor)
      processor.connect(audioContextRef.current.destination)

      audioChunksRef.current = []

      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0)
        audioChunksRef.current.push(new Float32Array(inputData))
      }

      setIsRecording(true)
      startTimeRef.current = Date.now()
      timerIntervalRef.current = setInterval(updateTimer, 1000)
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }

  const handleStopRecording = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
    }
    setIsRecording(false)

    // Convert to WAV and create blob
    const wavBlob = createWavBlob(audioChunksRef.current)
    const audioUrl = URL.createObjectURL(wavBlob)
    setAudioURL(audioUrl)

    // Convert to base64 and log
    blobToBase64(wavBlob).then((base64Audio) => {
      console.log('Base64 encoded audio:', base64Audio)
    })
  }

  const updateTimer = () => {
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0')
    const seconds = (elapsed % 60).toString().padStart(2, '0')
    console.log(`${minutes}:${seconds}`)
  }

  const handleSendMessage = async () => {
    if (inputValue.trim() || audioURL) {
      const newMessage: Message = {
        role: 'user',
        content: inputValue,
        audio: audioURL
      }
      setMessages(prevMessages => [...prevMessages, newMessage])
      setInputValue('')

      let base64Audio = null
      if (audioURL) {
        const response = await fetch(audioURL)
        const blob = await response.blob()
        base64Audio = await blobToBase64(blob)
      }

      const body = {
        message: inputValue,
        audio: base64Audio
      }

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error('Failed to send message');

        const data = await response.json();
        setMessages(prevMessages => [...prevMessages, {
          role: 'assistant',
          content: data.transcript || 'Audio response received',
          audio: data.audioUrl
        }]);
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setAudioURL(null)
      scrollToBottom()
    }
  }

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <ScrollArea className="flex-grow mb-4 border rounded-md p-2" ref={scrollAreaRef}>
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block bg-${message.role === 'user' ? 'blue' : 'gray'}-100 rounded-md p-2`}>
              {message.content}
            </span>
            {message.audio && (
              <audio controls src={message.audio} className="mt-2 max-w-full">
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        ))}
      </ScrollArea>
      <div className="flex space-x-2 mb-4">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
          className="flex-grow"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          variant={isRecording ? "destructive" : "default"}
          className="w-12 h-12 rounded-full p-0 flex items-center justify-center"
        >
          {isRecording ? <Square size={24} /> : <Mic size={24} />}
        </Button>
        {audioURL && (
          <audio controls src={audioURL} className="flex-grow">
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  )
}

function createWavBlob(audioChunks: Float32Array[]): Blob {
  const sampleRate = 44100
  const numChannels = 1
  const bitsPerSample = 16
  const bytesPerSample = bitsPerSample / 8
  const blockAlign = numChannels * bytesPerSample

  const buffer = mergeAudioBuffers(audioChunks)
  const dataLength = buffer.length * bytesPerSample
  const wavDataLength = 36 + dataLength

  const headerBuffer = new ArrayBuffer(44)
  const view = new DataView(headerBuffer)

  writeString(view, 0, 'RIFF')
  view.setUint32(4, wavDataLength, true)
  writeString(view, 8, 'WAVE')
  writeString(view, 12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, numChannels, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * blockAlign, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, bitsPerSample, true)
  writeString(view, 36, 'data')
  view.setUint32(40, dataLength, true)

  const wavBuffer = new Int16Array(headerBuffer.byteLength + dataLength)
  wavBuffer.set(new Int16Array(headerBuffer))
  wavBuffer.set(convertToInt16(buffer), headerBuffer.byteLength / 2)

  return new Blob([wavBuffer], { type: 'audio/wav' })
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i))
  }
}

function mergeAudioBuffers(buffers: Float32Array[]): Float32Array {
  let totalLength = 0
  for (let buffer of buffers) {
    totalLength += buffer.length
  }
  const result = new Float32Array(totalLength)
  let offset = 0
  for (let buffer of buffers) {
    result.set(buffer, offset)
    offset += buffer.length
  }
  return result
}

function convertToInt16(float32Array: Float32Array): Int16Array {
  const int16Array = new Int16Array(float32Array.length)
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]))
    int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF
  }
  return int16Array
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve((reader.result as string).split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
