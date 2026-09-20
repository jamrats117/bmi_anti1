import React from 'react';
import { BmiResultData, UserInfo } from '../types/bmi';
import { Printer, X } from 'lucide-react';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  userInfo: UserInfo;
  result: BmiResultData;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  isOpen,
  onClose,
  userInfo,
  result,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/70 backdrop-blur-sm p-3 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:w-full print:rounded-none">
        {/* Toolbar ด้านบน (ซ่อนเมื่อ Print) */}
        <div className="no-print bg-slate-800 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
              <Printer className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                ตัวอย่างเอกสารรายงานสุขภาพ A4 (Print Preview)
              </h3>
              <p className="text-xs text-slate-400">
                ตรวจสอบความถูกต้องของเอกสารก่อนพิมพ์ หรือกดพิมพ์เพื่อบันทึกเป็น PDF
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-teal-600/30 active:scale-95 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์หรือบันทึก PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              title="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ส่วนเนื้อหาเอกสาร (Scrollable ในหน้าจอ, พอดีหน้า A4 เมื่อสั่งพิมพ์) */}
        <div className="overflow-y-auto p-4 sm:p-10 bg-slate-100 flex justify-center print:p-0 print:bg-white print:overflow-visible">
          {/* แผ่นกระดาษ A4 Document Sheet */}
          <div
            id="printable-report"
            className="w-full max-w-[210mm] min-h-[297mm] bg-white p-8 sm:p-12 rounded-xl shadow-lg print:shadow-none print:p-8 print:w-full print:max-w-none text-slate-800 flex flex-col justify-between border border-slate-200 print:border-none"
          >
            <div>
              {/* Header ของเอกสารการแพทย์ */}
              <div className="border-b-2 border-slate-800 pb-5 mb-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                      🩺
                    </div>
                    <div>
                      <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        ใบรายงานผลการตรวจวัดดัชนีมวลกายและสุขภาพ
                      </h1>
                      <p className="text-xs sm:text-sm font-medium text-slate-500">
                        Body Mass Index (BMI) & Health Assessment Report
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <div className="font-semibold text-slate-700">รหัสเอกสาร: BMI-{Date.now().toString().slice(-6)}</div>
                    <div>วันที่ตรวจ: {result.calculatedAt}</div>
                  </div>
                </div>
              </div>

              {/* 1. ข้อมูลทั่วไปของผู้รับการตรวจ */}
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-teal-800 border-l-4 border-teal-600 pl-2.5 mb-3">
                  1. ข้อมูลผู้รับการประเมิน (Personal Information)
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-400 block text-xs">ชื่อ - นามสกุล:</span>
                    <span className="font-bold text-slate-800 text-base">
                      คุณ{userInfo.firstName} {userInfo.lastName}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">เพศ:</span>
                    <span className="font-semibold text-slate-800">
                      {userInfo.gender === 'male' ? 'ชาย (Male)' : 'หญิง (Female)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">อายุ:</span>
                    <span className="font-semibold text-slate-800">
                      {userInfo.age ? `${userInfo.age} ปี` : 'ไม่ระบุ'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">ส่วนสูง / น้ำหนัก:</span>
                    <span className="font-semibold text-slate-800">
                      {userInfo.height} ซม. / {userInfo.weight} กก.
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. สรุปผลการประเมิน BMI */}
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-teal-800 border-l-4 border-teal-600 pl-2.5 mb-3">
                  2. ผลการประเมินค่าดัชนีมวลกาย (Assessment Results)
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* กล่องแสดง BMI */}
                  <div className="p-4 rounded-xl bg-slate-900 text-white text-center flex flex-col items-center justify-center">
                    <span className="text-xs text-slate-300 font-medium">ค่า BMI ที่คำนวณได้</span>
                    <div className="text-4xl sm:text-5xl font-extrabold my-1 text-teal-400">
                      {result.bmi.toFixed(1)}
                    </div>
                    <span className="text-[11px] text-slate-300">kg/m²</span>
                  </div>

                  {/* กล่องสถานะสุขภาพ */}
                  <div className="sm:col-span-2 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-center space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">ระดับสุขภาพ:</span>
                      <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300">
                        {result.categoryLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {result.categoryDescription}
                    </p>
                    <div className="text-xs pt-2 border-t border-slate-200 flex flex-wrap justify-between text-slate-600">
                      <span>ช่วงน้ำหนักมาตรฐานที่เหมาะสม: <strong>{result.idealWeightMin} - {result.idealWeightMax} กก.</strong></span>
                      <span>
                        {result.weightDiff === 0 
                          ? '✅ น้ำหนักอยู่ในเกณฑ์มาตรฐาน' 
                          : result.weightDiff > 0 
                            ? `⚠️ เกินเกณฑ์มาตรฐาน ${result.weightDiff} กก.` 
                            : `⚠️ ต่ำกว่าเกณฑ์มาตรฐาน ${Math.abs(result.weightDiff)} กก.`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. ตารางเกณฑ์อ้างอิงเอเชีย (Asian BMI Classification) */}
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-teal-800 border-l-4 border-teal-600 pl-2.5 mb-3">
                  3. ตารางเกณฑ์มาตรฐานดัชนีมวลกายสำหรับคนเอเชีย (Asian BMI Reference)
                </h2>
                <div className="overflow-hidden rounded-xl border border-slate-200 text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                        <th className="py-2 px-3">ช่วงค่า BMI (kg/m²)</th>
                        <th className="py-2 px-3">เกณฑ์การแปลผล</th>
                        <th className="py-2 px-3">ภาวะความเสี่ยงต่อโรค</th>
                        <th className="py-2 px-3 text-center">สถานะของคุณ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className={result.category === 'underweight' ? 'bg-sky-50 font-semibold text-sky-900' : ''}>
                        <td className="py-2 px-3">&lt; 18.5</td>
                        <td className="py-2 px-3">น้ำหนักน้อยกว่าเกณฑ์ (ผอม)</td>
                        <td className="py-2 px-3 text-slate-600">เสี่ยงต่อภาวะขาดสารอาหาร ภูมิคุ้มกันต่ำ</td>
                        <td className="py-2 px-3 text-center">{result.category === 'underweight' ? '👈 ของคุณ' : '-'}</td>
                      </tr>
                      <tr className={result.category === 'normal' ? 'bg-emerald-50 font-semibold text-emerald-900' : ''}>
                        <td className="py-2 px-3">18.5 – 22.9</td>
                        <td className="py-2 px-3">น้ำหนักปกติ (สมส่วน)</td>
                        <td className="py-2 px-3 text-slate-600">ความเสี่ยงต่อโรคเรื้อรังระดับปกติ/ต่ำสุด</td>
                        <td className="py-2 px-3 text-center">{result.category === 'normal' ? '👈 ของคุณ' : '-'}</td>
                      </tr>
                      <tr className={result.category === 'overweight' ? 'bg-amber-50 font-semibold text-amber-900' : ''}>
                        <td className="py-2 px-3">23.0 – 24.9</td>
                        <td className="py-2 px-3">น้ำหนักเกินเกณฑ์ (ท้วม)</td>
                        <td className="py-2 px-3 text-slate-600">เริ่มมีความเสี่ยงต่อโรคเบาหวาน ความดัน</td>
                        <td className="py-2 px-3 text-center">{result.category === 'overweight' ? '👈 ของคุณ' : '-'}</td>
                      </tr>
                      <tr className={result.category === 'obese1' ? 'bg-orange-50 font-semibold text-orange-900' : ''}>
                        <td className="py-2 px-3">25.0 – 29.9</td>
                        <td className="py-2 px-3">โรคอ้วนระดับ 1 (อ้วน)</td>
                        <td className="py-2 px-3 text-slate-600">ความเสี่ยงต่อโรคหัวใจ เบาหวาน ระดับปานกลาง</td>
                        <td className="py-2 px-3 text-center">{result.category === 'obese1' ? '👈 ของคุณ' : '-'}</td>
                      </tr>
                      <tr className={result.category === 'obese2' ? 'bg-rose-50 font-semibold text-rose-900' : ''}>
                        <td className="py-2 px-3">≥ 30.0</td>
                        <td className="py-2 px-3">โรคอ้วนระดับ 2 (อ้วนอันตราย)</td>
                        <td className="py-2 px-3 text-slate-600">ความเสี่ยงต่อโรคเรื้อรังและแทรกซ้อนสูงมาก</td>
                        <td className="py-2 px-3 text-center">{result.category === 'obese2' ? '👈 ของคุณ' : '-'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4. คำแนะนำการดูแลสุขภาพเฉพาะบุคคล */}
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-teal-800 border-l-4 border-teal-600 pl-2.5 mb-3">
                  4. คำแนะนำและการปฏิบัติตัว (Personalized Recommendations)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <h3 className="font-bold text-slate-800 mb-2 text-teal-800">🥗 ด้านอาหารและโภชนาการ:</h3>
                    <ul className="space-y-1 text-slate-600 list-disc list-inside">
                      {result.dietAdvice.slice(0, 3).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <h3 className="font-bold text-slate-800 mb-2 text-emerald-800">🏃 ด้านกิจกรรมและการออกกำลังกาย:</h3>
                    <ul className="space-y-1 text-slate-600 list-disc list-inside">
                      {result.exerciseAdvice.slice(0, 3).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* ส่วนลงนามท้ายเอกสาร */}
            <div className="pt-8 border-t border-slate-300 mt-6 text-xs text-slate-600">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-48 border-b border-slate-400 mb-1 mt-6"></div>
                  <span className="font-semibold">ลงชื่อผู้รับการประเมิน</span>
                  <span className="text-[11px] text-slate-500">(คุณ{userInfo.firstName} {userInfo.lastName})</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-48 border-b border-slate-400 mb-1 mt-6"></div>
                  <span className="font-semibold">ลงชื่อผู้ประเมิน / เจ้าหน้าที่สุขภาพ</span>
                  <span className="text-[11px] text-slate-500">(........................................................)</span>
                </div>
              </div>
              <div className="mt-8 text-center text-[10px] text-slate-400">
                เอกสารนี้เป็นผลการประเมินเบื้องต้นเพื่อสุขภาวะที่ดี ไม่สามารถใช้แทนคำวินิจฉัยทางการแพทย์ของแพทย์เฉพาะทางได้
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
