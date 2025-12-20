interface TextInputProps {
  text: string;
  onTextChange: (text: string) => void;
}

function TextInput({ text, onTextChange }: TextInputProps) {
  return (
    <div className="p-6 h-full flex flex-col">
      <textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="絵文字にしたいテキストを入力..."
        className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-lg"
      />
    </div>
  );
}

export default TextInput;