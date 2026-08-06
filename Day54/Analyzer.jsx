import React, { useState } from 'react';
import toast from 'react-hot-toast';
import UploadDropzone from '../components/UploadDropzone';
import AnalysisReport from '../components/AnalysisReport';
import SkeletonLoader from '../components/SkeletonLoader';
import apiClient from '../lib/apiClient';

const ROLES = ['SDE Intern', 'Data Analyst', 'Core Engineering', 'HR Round'];

/**
 * Analyzer Page (/analyzer)
 * Day 3: upload + text preview (scaffolded).
 * Day 4: wires the /analyze AI call and renders AnalysisReport.
 */
export default function Analyzer() {
  const [resumeId, setResumeId] = useState(null);
  const [textPreview, setTextPreview] = useState('');
  const [targetRole, setTargetRole] = useState(ROLES[0]);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUploadSuccess = ({ resume_id, text_preview }) => {
    setResumeId(resume_id);
    setTextPreview(text_preview);
    setAnalysis(null);
  };

  const handleAnalyze = async () => {
    if (!resumeId) {
      toast.error('Please upload a resume first.');
      return;
    }
    setIsAnalyzing(true);
    try {
      const res = await apiClient.post('/resume/analyze', {
        resume_id: resumeId,
        target_role: targetRole,
      });
      setAnalysis(res.data.data);
      toast.success('Analysis complete!');
    } catch (err) {
      const message =
        err?.response?.data?.error || 'Something went wrong while analyzing your resume.';
      toast.error(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Resume Analyzer</h1>

      {!analysis && (
        <div className="space-y-6">
          <UploadDropzone onUploadSuccess={handleUploadSuccess} />

          {textPreview && (
            <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
              <p className="mb-1 font-medium text-gray-700">Extracted preview:</p>
              <p className="line-clamp-3">{textPreview}</p>
            </div>
          )}

          <div className="flex flex-col items-center gap-3">
            <label className="text-sm font-medium text-gray-700">
              Target Role
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="ml-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!resumeId || isAnalyzing}
              className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAnalyzing ? 'Analyzing…' : 'Analyze Resume'}
            </button>
          </div>

          {isAnalyzing && <SkeletonLoader rows={5} />}
        </div>
      )}

      {analysis && !isAnalyzing && (
        <AnalysisReport analysis={analysis} onReanalyze={handleAnalyze} />
      )}
    </div>
  );
}
