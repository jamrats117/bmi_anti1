import React from 'react';
import { UserInfo } from '../types/bmi';
import { User, Scale, Ruler, Calendar, RefreshCw, Calculator } from 'lucide-react';

interface BmiFormProps {
  userInfo: UserInfo;
  onChange: (field: keyof UserInfo, value: string | number) => void;
  onCalculate: () => void;
  onReset: () => void;
}

export const BmiForm: React.FC<BmiFormProps> = ({
  userInfo,
  onChange,
  onCalculate,
  onReset,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate();
  };

  const isFormValid =
    userInfo.firstName.trim() !== '' &&
    userInfo.lastName.trim() !== '' &&
    Number(userInfo.height) > 0 &&
    Number(userInfo.weight) > 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 no-print">
      <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600 font-semibold text-sm">
              1
            </span>
            กรอกข้อมูลผู้รับการประเมิน
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            กรุณากรอกข้อมูลส่วนตัวและสัดส่วนร่างกายเพื่อประเมินค่าดัชนีมวลกาย
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-slate-500 hover:text-slate-700 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          title="ล้างข้อมูลทั้งหมด"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>ล้างข้อมูล</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ชื่อ และ นามสกุล */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-teal-600" />
              ชื่อ <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={userInfo.firstName}
              onChange={(e) => onChange('firstName', e.target.value)}
              placeholder="เช่น สมชาย"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-teal-600" />
              นามสกุล <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={userInfo.lastName}
              onChange={(e) => onChange('lastName', e.target.value)}
              placeholder="เช่น ใจดี"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* เพศ และ อายุ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              เพศ
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onChange('gender', 'male')}
                className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all ${
                  userInfo.gender === 'male'
                    ? 'border-teal-500 bg-teal-50 text-teal-800 ring-2 ring-teal-300/40 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                👨 ชาย
              </button>
              <button
                type="button"
                onClick={() => onChange('gender', 'female')}
                className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all ${
                  userInfo.gender === 'female'
                    ? 'border-pink-500 bg-pink-50 text-pink-800 ring-2 ring-pink-300/40 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                👩 หญิง
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal-600" />
              อายุ (ปี)
            </label>
            <input
              type="number"
              min="1"
              max="120"
              value={userInfo.age}
              onChange={(e) =>
                onChange('age', e.target.value === '' ? '' : parseInt(e.target.value, 10))
              }
              placeholder="เช่น 30"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* ส่วนสูง และ น้ำหนัก */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Ruler className="w-4 h-4 text-teal-600" />
              ส่วนสูง (เซนติเมตร) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="50"
                max="250"
                required
                value={userInfo.height}
                onChange={(e) =>
                  onChange('height', e.target.value === '' ? '' : parseFloat(e.target.value))
                }
                placeholder="เช่น 170"
                className="w-full px-4 py-2.5 pr-14 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all text-slate-800 placeholder:text-slate-400"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                ซม.
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-teal-600" />
              น้ำหนัก (กิโลกรัม) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="20"
                max="300"
                required
                value={userInfo.weight}
                onChange={(e) =>
                  onChange('weight', e.target.value === '' ? '' : parseFloat(e.target.value))
                }
                placeholder="เช่น 65"
                className="w-full px-4 py-2.5 pr-14 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all text-slate-800 placeholder:text-slate-400"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                กก.
              </span>
            </div>
          </div>
        </div>

        {/* ปุ่มคำนวณ */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3.5 px-6 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all shadow-lg ${
            isFormValid
              ? 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-emerald-600/20 active:scale-[0.99] cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <Calculator className="w-5 h-5" />
          <span>คำนวณดัชนีมวลกาย (Calculate BMI)</span>
        </button>
      </form>
    </div>
  );
};
