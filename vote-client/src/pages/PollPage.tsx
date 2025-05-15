import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { cable } from '../cable';
import { Poll, Vote } from '../types';

export default function PollPage() {
  const { id } = useParams<{ id: string }>();
  const [poll, setPoll] = useState<Poll | null>(null);

  useEffect(() => {
    api.get<Poll>(`/polls/${id}`).then((res) => setPoll(res.data));
  }, [id]);

  useEffect(() => {
    if (!poll) return;

    const subscription = cable.subscriptions.create(
      { channel: 'PollChannel', poll_id: poll.id },
      {
        received: (data: Vote) => {
          setPoll((prev) => {
            if (!prev) return prev;
            return { ...prev, votes: [...prev.votes, data] };
          });
        },
      }
    );

    return () => subscription.unsubscribe();
  }, [poll?.id]);

  const handleVote = (option: string) => {
    console.log("Vote sent for:", option); // додай це
    api.post('/votes', {
      vote: { option, poll_id: poll?.id },
    });
  };

  const getCount = (option: string) =>
    poll?.votes.filter((v) => v.option === option).length ?? 0;

  if (!poll) return <p>Loading...</p>;

  return (
    <div>
      <h1>{poll.title}</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {poll.options.map((option) => (
          <button key={option} onClick={() => handleVote(option)}>
            {option} ({getCount(option)})
          </button>
        ))}
      </div>
    </div>
  );
}

