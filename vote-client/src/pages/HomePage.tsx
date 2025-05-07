// src/pages/HomePage.tsx
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

type Poll = {
  id: number;
  title: string;
  created_at: string;
  options: string[];
};

function HomePage() {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/polls")
      .then((res) => res.json())
      .then((data) => setPolls(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Всі голосування</h1>
      <table className="table-auto border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Назва</th>
            <th className="border px-4 py-2">Дата створення</th>
            <th className="border px-4 py-2">Кількість варіантів</th>
          </tr>
        </thead>
        <tbody>
          {polls.map((poll) => (
            <tr key={poll.id}>
              <td>
                <Link to={`/polls/${poll.id}`}>{poll.title}</Link>
              </td>
              <td>{new Date(poll.created_at).toLocaleString()}</td>
              <td>{poll.options.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
