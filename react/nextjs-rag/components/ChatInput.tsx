"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { Input } from "./ui/input";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: any) => void;
  handleSubmit: (e: any) => void;
}

export default function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
}: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        onChange={handleInputChange}
        value={input}
        placeholder="Ask me something..."
      />
      <Button type="submit">
        <ArrowUp />
        <span className="sr-only">Submit</span>
      </Button>
    </form>
  );
}