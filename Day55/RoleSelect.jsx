import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import apiClient from '../lib/apiClient';

const ROLES = [
  { key: 'SDE Intern', icon: '💻', description: 'Coding, DSA, and technical fundamentals' },
  { key: 'Data Analyst', icon: '📊', description: 'SQL, statistics, and data storytelling' },
  { key: 'Core Engineering', icon: '⚙️', description: 'Discipline fundamentals and design trade-offs' },
  { key: 'HR Round', icon: '🤝', description: 'Behavioral and culture-fit questions' },
];

/**
 * RoleSelect Page (/interview)
 * Day 5: lets the user pick a track and kicks off question generation via
 * POST /api/interview/start, then routes to the chat screen with the
 * returned session_id.
 */
export default function RoleSelect() {
  const [loadingRole, setLoadingRole] = useState(null);
  const navigate = useNavigate();

  const handleSelectRole = async (role) => {
    setLoadingRole(role);
    try {
      // resume_id omitted here by design — Day 6 will let users pick
      // "personalize with my latest resume" as an optional toggle.
      const res = await apiClient.post('/interview/start', { role });
      const { session_id, current_question, total_questions } = res.data.data;

      navigate(`/interview/${session_id}`, {
        state: { role, current_question, total_questions },
      });
    } catch (err) {
      const message = err?.response?.data?.error || 'Could not start the interview. Please try again.';
      toast.error(message);
    } finally {
      setLoadingRole(null);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">Choose Your Interview Track</h1>
      <p className="mb-8 text-center text-sm text-gray-500">
        Pick a role and PrepGenie will generate a realistic mock interview for you.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ROLES.map(({ key, icon, description }) => (
          <button
            key={key}
            type="button"
            onClick={() => handleSelectRole(key)}
            disabled={loadingRole !== null}
            className="flex flex-col items-start gap-2 rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:border-indigo-400 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="text-3xl">{icon}</span>
            <span className="text-lg font-semibold text-gray-900">{key}</span>
            <span className="text-sm text-gray-500">{description}</span>
            {loadingRole === key && (
              <span className="mt-2 text-xs font-medium text-indigo-600">Generating questions…</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
