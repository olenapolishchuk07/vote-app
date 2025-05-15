import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Poll = {
  id: number;
  title: string;
  created_at: string;
  options: string[];
};

function HomePage() {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/polls')
      .then((res) => res.json())
      .then((data) => setPolls(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <style>
        {`
          .table-wrapper {
            border: 2px solid #444;
            border-radius: 6px;
            overflow: hidden;
            background-color: #1a1a1a;
          }

          .polls-table {
            width: 100%;
            border-collapse: collapse;
          }

          .polls-table th,
          .polls-table td {
            border: 1px solid #444;
            padding: 10px 14px;
            text-align: left;
          }

          .polls-table th {
            background-color: #2d2d2d;
            color: #ddd;
            font-weight: bold;
          }

          .polls-table td {
            color: #eee;
          }

          .polls-table tr:hover {
            background-color: #2a2a2a;
          }

          .polls-table a {
            color: #6ab7ff;
            text-decoration: none;
          }

          .polls-table a:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <h1 className="text-2xl font-bold mb-4 text-white">Всі голосування</h1>
      <div className="table-wrapper">
        <table className="polls-table">
          <thead>
            <tr>
              <th>Назва</th>
              <th>Дата створення</th>
              <th>Кількість варіантів</th>
              <th>Дія</th>
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
                <td>
                  <Link to={`/polls/${poll.id}/edit`}>Редагувати</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;


