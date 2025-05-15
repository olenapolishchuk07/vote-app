import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import { Poll } from '../types';

export default function EditPollPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Отримання поточного голосування
  useEffect(() => {
    api.get<Poll>(`/polls/${id}`).then((res) => {
      setTitle(res.data.title);
      setOptions(res.data.options);
    });
  }, [id]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedOptions = options.map(o => o.trim()).filter(Boolean);
    if (cleanedOptions.length < 2) {
      setError('Мінімум 2 опції обов’язкові');
      return;
    }

    try {
      await api.patch(`/polls/${id}`, {
        title,
        options: cleanedOptions,
      });
      navigate(`/polls/${id}`);
    } catch (err) {
      setError('Помилка при збереженні голосування');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1>Редагувати голосування</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Заголовок</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </div>

        <div>
          <label>Опції</label>
          {options.map((option, index) => (
            <div key={index} style={{ display: 'flex', marginBottom: '0.5rem' }}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                style={{ flex: 1 }}
              />
              <button type="button" onClick={() => removeOption(index)} style={{ marginLeft: '0.5rem' }}>
                ❌
              </button>
            </div>
          ))}
          <button type="button" onClick={addOption}>
            ➕ Додати опцію
          </button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={{ marginTop: '1rem' }}>
          <button type="submit">Зберегти</button>
        </div>
      </form>
    </div>
  );
}



