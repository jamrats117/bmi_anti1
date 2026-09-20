import React, { useState } from 'react';
import { UserInfo, BmiResultData } from './types/bmi';
import { calculateBmi } from './utils/bmiCalculator';
import { Header } from './components/Header';
import { BmiForm } from './components/BmiForm';
import { BmiResult } from './components/BmiResult';
import { PdfPreviewModal } from './components/PdfPreviewModal';
import { Sparkles, FileCheck, Github } from 'lucide-react';

export const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    gender: 'male',
    age: '',
    height: '',
    weight: '',
  });

  const [result, setResult] = useState<BmiResultData | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);

  const handleFieldChange = (field: keyof UserInfo, value: string | number) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCalculate = () => {
    const res = calculateBmi(userInfo);
    if (res) {
      setResult(res);
    }
  };

  const handleReset = () => {
    setUserInfo({
      firstName: '',
      lastName: '',
      gender: 'male',
      age: '',
      height: '',
      weight: '',
    });
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner แนะนำ */}
        <div className="no-print rounded-3xl bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white p-6 sm:p-10 shadow-lg shadow-teal-900/10 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart BMI Health Assessment System</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ตรวจเช็คดัชนีมวลกาย & สุขภาพของคุณ
            </h2>
            <p className="text-teal-100 text-sm sm:text-base leading-relaxed">
              ระบุชื่อ-นามสกุล น้ำหนัก ส่วนสูง เพื่อประเมินภาวะโภชนาการ วิเคราะห์ความเสี่ยงสุขภาพ พร้อมระบบสร้างเอกสารรายงานขนาด A4 สำหรับพรีวิวและพิมพ์เป็น PDF ได้ทันที
            </p>
          </div>
          {/* Decorative background shapes */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute right-20 top-4 w-40 h-40 rounded-full bg-emerald-400/20 blur-xl pointer-events-none" />
        </div>

        {/* ฟอร์มคำนวณ และ ส่วนแสดงผลลัพธ์ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ฝั่งซ้าย: ฟอร์มกรอกข้อมูล (5 คอลัมน์) */}
          <div className="lg:col-span-5">
            <BmiForm
              userInfo={userInfo}
              onChange={handleFieldChange}
              onCalculate={handleCalculate}
              onReset={handleReset}
            />
          </div>

          {/* ฝั่งขวา: ผลลัพธ์ หรือ คำแนะนำเริ่มต้น (7 คอลัมน์) */}
          <div className="lg:col-span-7">
            {result ? (
              <BmiResult
                result={result}
                userInfo={userInfo}
                onOpenPdfPreview={() => setIsPdfModalOpen(true)}
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 text-center space-y-5 no-print flex flex-col items-center justify-center min-h-[420px]">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-1">
                  <FileCheck className="w-8 h-8" />
                </div>
                <div className="max-w-md space-y-2">
                  <h3 className="text-lg font-bold text-slate-800">
                    รอการกรอกข้อมูลเพื่อประมวลผล
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    กรุณากรอกชื่อ นามสกุล ส่วนสูง และน้ำหนักในแบบฟอร์มด้านซ้าย จากนั้นกดปุ่ม <strong>"คำนวณดัชนีมวลกาย"</strong> เพื่อดูผลการวิเคราะห์และออกรายงาน PDF
                  </p>
                </div>

                <div className="w-full max-w-sm pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs text-slate-500">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="block font-bold text-slate-700 text-sm">เกณฑ์เอเชีย</span>
                    <span>แม่นยำตรงมาตรฐาน</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="block font-bold text-slate-700 text-sm">แนะนำเฉพาะบุคคล</span>
                    <span>อาหาร & ออกกำลังกาย</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="block font-bold text-slate-700 text-sm">พิมพ์ PDF</span>
                    <span>รายงานทางการแพทย์ A4</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="no-print border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span>พัฒนาสำหรับประเมินสุขภาพดัชนีมวลกาย</span>
            <span>•</span>
            <span className="text-slate-400">Thai & Asian Standard Reference</span>
          </div>

          <a
            href="https://github.com/jamrats117/bmi_anti1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-slate-900 transition-colors font-medium text-slate-700"
          >
            <Github className="w-4 h-4" />
            <span>jamrats117/bmi_anti1</span>
          </a>
        </div>
      </footer>

      {/* Modal สำหรับพรีวิวเอกสารขนาด A4 และสั่งพิมพ์เป็น PDF */}
      {result && (
        <PdfPreviewModal
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
          userInfo={userInfo}
          result={result}
        />
      )}
    </div>
  );
};

export default App;
