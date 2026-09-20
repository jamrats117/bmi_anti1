import React from 'react';
import { BmiResultData, UserInfo } from '../types/bmi';
import { 
  FileText, 
  Printer, 
  Utensils, 
  Dumbbell, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface BmiResultProps {
  result: BmiResultData;
  userInfo: UserInfo;
  onOpenPdfPreview: () => void;
}

export const BmiResult: React.FC<BmiResultProps> = ({
  result,
  userInfo,
  onOpenPdfPreview,
}) => {
  // Gauge marker position in % (from BMI 15 to 35)
  const clampedBmi = Math.min(Math.max(result.bmi, 15), 35);
  const gaugePercent = ((clampedBmi - 15) / (35 - 15)) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 space-y-6 no-print">
      {/* ส่วนหัวแสดงผลลัพธ์และชื่อ-นามสกุล */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60">
            ผลการประเมินสุขภาพ
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-2">
            คุณ {userInfo.firstName} {userInfo.lastName}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            เพศ: {userInfo.gender === 'male' ? 'ชาย' : 'หญิง'} {userInfo.age ? `• อายุ: ${userInfo.age} ปี` : ''} • ประเมินเมื่อ: {result.calculatedAt}
          </p>
        </div>

        {/* ปุ่มดูตัวอย่างและพิมพ์ PDF */}
        <button
          type="button"
          onClick={onOpenPdfPreview}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-5 py-3 rounded-xl font-medium shadow-md shadow-teal-600/20 active:scale-[0.98] transition-all cursor-pointer text-sm"
        >
          <Printer className="w-4 h-4" />
          <span>ดูตัวอย่าง & พิมพ์ PDF</span>
        </button>
      </div>

      {/* บล็อกตัวเลข BMI และสถานะ */}
      <div className={`p-6 rounded-2xl border ${result.bgColorClass} ${result.borderColorClass} flex flex-col md:flex-row items-center justify-between gap-6`}>
        <div className="text-center md:text-left">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            ค่าดัชนีมวลกายของคุณ (BMI)
          </span>
          <div className="flex items-baseline justify-center md:justify-start gap-2 mt-1">
            <span className={`text-5xl sm:text-6xl font-black ${result.colorClass}`}>
              {result.bmi.toFixed(1)}
            </span>
            <span className="text-sm font-medium text-slate-500">kg/m²</span>
          </div>
          <div className="mt-2">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold border ${result.badgeClass}`}>
              {result.categoryLabel}
            </span>
          </div>
        </div>

        <div className="flex-1 max-w-md text-sm text-slate-600 border-t md:border-t-0 md:border-l border-slate-200/60 pt-4 md:pt-0 md:pl-6">
          <p className="leading-relaxed">
            {result.categoryDescription}
          </p>
          <div className="mt-3 pt-3 border-t border-slate-200/60 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block">น้ำหนักเหมาะสมของคุณ:</span>
              <span className="font-bold text-slate-700">{result.idealWeightMin} - {result.idealWeightMax} กก.</span>
            </div>
            <div>
              <span className="text-slate-400 block">ส่วนต่างจากเกณฑ์:</span>
              <span className="font-bold text-slate-700">
                {result.weightDiff === 0 
                  ? 'อยู่ในเกณฑ์พอดี' 
                  : result.weightDiff > 0 
                    ? `เกินอยู่ +${result.weightDiff} กก.` 
                    : `ขาดอยู่ ${result.weightDiff} กก.`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* แถบเกจสีระดับ BMI (Gauge Meter) */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <span>เกณฑ์ระดับ BMI คนเอเชีย (Asian BMI Standards)</span>
          <span className="text-teal-600 font-bold">{result.bmi.toFixed(1)} kg/m²</span>
        </div>

        {/* แถบสี 5 ช่วง */}
        <div className="relative pt-6 pb-2">
          {/* หมุดชี้ตำแหน่ง */}
          <div
            className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-500"
            style={{ left: `${gaugePercent}%` }}
          >
            <span className="text-[11px] font-extrabold bg-slate-900 text-white px-2 py-0.5 rounded shadow">
              {result.bmi.toFixed(1)}
            </span>
            <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900" />
          </div>

          <div className="h-4 w-full rounded-full overflow-hidden flex shadow-inner">
            <div className="h-full bg-sky-400 flex-1" title="ผอม (< 18.5)" />
            <div className="h-full bg-emerald-500 flex-1" title="ปกติ (18.5 - 22.9)" />
            <div className="h-full bg-amber-400 flex-1" title="ท้วม (23.0 - 24.9)" />
            <div className="h-full bg-orange-500 flex-1" title="อ้วน 1 (25.0 - 29.9)" />
            <div className="h-full bg-rose-500 flex-1" title="อ้วน 2 (≥ 30.0)" />
          </div>

          {/* สเกลตัวเลข */}
          <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1.5 px-0.5">
            <span>ผอม (&lt;18.5)</span>
            <span>ปกติ (18.5-22.9)</span>
            <span>ท้วม (23-24.9)</span>
            <span>อ้วน 1 (25-29.9)</span>
            <span>อ้วน 2 (≥30)</span>
          </div>
        </div>
      </div>

      {/* คำแนะนำด้านโภชนาการ และ ออกกำลังกาย */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ข้อแนะนำโภชนาการ */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm text-teal-700">
            <Utensils className="w-4 h-4" />
            ข้อแนะนำการรับประทานอาหาร
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            {result.dietAdvice.map((advice, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                <span>{advice}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ข้อแนะนำการออกกำลังกาย */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm text-emerald-700">
            <Dumbbell className="w-4 h-4" />
            ข้อแนะนำการออกกำลังกาย & ไลฟ์สไตล์
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            {result.exerciseAdvice.map((advice, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{advice}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* แถบความเสี่ยงสุขภาพ */}
      <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900">
          <span className="font-bold">ภาวะสุขภาพที่ควรเฝ้าระวัง: </span>
          <span>{result.healthRisks.join(' • ')}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onOpenPdfPreview}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-medium shadow-md active:scale-[0.98] transition-all cursor-pointer text-sm"
        >
          <FileText className="w-4 h-4" />
          <span>เปิดหน้าต่างตัวอย่างรายงานขนาด A4 สำหรับพิมพ์ / เซฟ PDF</span>
        </button>
      </div>
    </div>
  );
};
