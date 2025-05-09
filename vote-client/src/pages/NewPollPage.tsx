import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPollPage() {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const navigate = useNavigate();

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filteredOptions = options.filter(opt => opt.trim() !== "");

    if (title.trim() === "" || filteredOptions.length < 2) {
      alert("Введіть заголовок і принаймні 2 варіанти відповіді.");
      return;
    }

    const response = await fetch("http://localhost:3000/api/v1/polls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          options: filteredOptions,
        }),
      });      
      

    if (response.ok) {
      const poll = await response.json();
      navigate(`/polls/${poll.id}`);
    } else {
      alert("Помилка при створенні голосування.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 shadow rounded bg-white">
      <h1 className="text-2xl mb-4">Створити нове голосування</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Заголовок голосування"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder={`Варіант ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            {options.length > 2 && (
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="ml-2 text-red-500"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addOption}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Додати варіант
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Створити голосування
        </button>
      </form>
    </div>
  );
}
