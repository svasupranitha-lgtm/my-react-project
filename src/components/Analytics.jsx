import React from 'react';
import { SUBJECTS } from '../data/mockData';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function Analytics() {
  const totalWeightedMarks = SUBJECTS.reduce((acc, sub) => acc + (sub.marksObtained * sub.credits), 0);
  const totalCredits = SUBJECTS.reduce((acc, sub) => acc + sub.credits, 0);
  const estimatedPercentage = (totalWeightedMarks / totalCredits).toFixed(1);
  const estimatedGPA = (estimatedPercentage / 10).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400">Estimated CGPA</span>
          <h3 className="text-3xl font-extrabold text-amber-400 mt-1">{estimatedGPA} / 10</h3>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400">Average Percentage</span>
          <h3 className="text-3xl font-extrabold text-white mt-1">{estimatedPercentage}%</h3>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400">Total Enrolled Credits</span>
          <h3 className="text-3xl font-extrabold text-white mt-1">{totalCredits} Credits</h3>
        </div>
      </div>

      {/* Attendance Guard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Subject Performance & Attendance Guard</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs uppercase text-slate-400 bg-slate-950 border-b border-slate-800">
              <tr>
                <th className="p-3">Subject</th>
                <th className="p-3">Credits</th>
                <th className="p-3">Marks</th>
                <th className="p-3">Attendance</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {SUBJECTS.map((sub) => {
                const attendancePct = Math.round((sub.attendedClasses / sub.totalClasses) * 100);
                const isSafe = attendancePct >= 75;

                return (
                  <tr key={sub.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-medium text-white">{sub.name}</td>
                    <td className="p-3">{sub.credits}</td>
                    <td className="p-3">{sub.marksObtained} / {sub.totalMarks}</td>
                    <td className="p-3 font-semibold">{attendancePct}%</td>
                    <td className="p-3">
                      {isSafe ? (
                        <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md w-fit">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Safe (&gt;= 75%)
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-md w-fit">
                          <AlertTriangle className="w-3.5 h-3.5" /> Shortage Risk!
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}