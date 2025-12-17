interface TextInputProps {
  text: string;
  onTextChange: (text: string) => void;
}

function TextInput({ text, onTextChange }: TextInputProps) {
  return (
    <div style={{ padding: '1rem', borderRight: '1px solid #ccc' }}>
      <h2>テキスト入力</h2>
      <textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="絵文字にしたいテキストを入力..."
        style={{
          width: '100%',
          height: '200px',
          padding: '0.5rem',
          fontSize: '1rem',
          fontFamily: 'monospace',
          resize: 'vertical',
        }}
      />
    </div>
  );
}

export default TextInput;