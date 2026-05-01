import React, { useRef } from 'react';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const PromptInput = ({ onGenerate, isLoading }: PromptInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value.trim()) {
      onGenerate(inputRef.current.value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input 
        ref={inputRef} 
        type="text" 
        placeholder="A futuristic cyberpunk city at sunset..." 
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate'}
      </button>
    </form>
  );
};

export default PromptInput;