import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <span>BMI HealthCare Pro</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                มาตรฐานไทย/เอเชีย
              </span>
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              ระบบประเมินดัชนีมวลกาย วิเคราะห์สุขภาพเฉพาะบุคคล & พิมพ์รายงาน PDF
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>กระทรวงสาธารณสุขไทย</span>
          </div>
        </div>
      </div>
    </header>
  );
};
