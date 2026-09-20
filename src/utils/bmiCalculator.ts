import { BmiResultData, UserInfo } from '../types/bmi';

export function calculateBmi(info: UserInfo): BmiResultData | null {
  const weight = typeof info.weight === 'number' ? info.weight : parseFloat(info.weight);
  const heightCm = typeof info.height === 'number' ? info.height : parseFloat(info.height);

  if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
    return null;
  }

  const heightM = heightCm / 100;
  const bmiRaw = weight / (heightM * heightM);
  const bmi = Math.round(bmiRaw * 10) / 10;

  // Ideal weight range based on BMI 18.5 - 22.9 (Asian standard)
  const idealWeightMin = Math.round(18.5 * (heightM * heightM) * 10) / 10;
  const idealWeightMax = Math.round(22.9 * (heightM * heightM) * 10) / 10;

  let weightDiff = 0;
  if (weight < idealWeightMin) {
    weightDiff = Math.round((weight - idealWeightMin) * 10) / 10;
  } else if (weight > idealWeightMax) {
    weightDiff = Math.round((weight - idealWeightMax) * 10) / 10;
  }

  const now = new Date();
  const calculatedAt = now.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  if (bmi < 18.5) {
    return {
      bmi,
      category: 'underweight',
      categoryLabel: 'น้ำหนักน้อยกว่าเกณฑ์ (ผอม)',
      categoryDescription: 'ดัชนีมวลกายต่ำกว่ามาตรฐาน อาจส่งผลให้ร่างกายได้รับสารอาหารไม่เพียงพอ ภูมิคุ้มกันลดลง และอ่อนเพลียได้ง่าย',
      colorClass: 'text-sky-600',
      bgColorClass: 'bg-sky-50',
      borderColorClass: 'border-sky-300',
      badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
      idealWeightMin,
      idealWeightMax,
      weightDiff,
      healthRisks: [
        'ภาวะขาดสารอาหารหรือวิตามิน',
        'ระบบภูมิคุ้มกันในร่างกายต่ำ ติดเชื้อง่าย',
        'ภาวะกระดูกบาง กระดูกพรุน',
        'กล้ามเนื้ออ่อนแรง เหนื่อยล้าง่าย'
      ],
      dietAdvice: [
        'รับประทานอาหารให้ครบ 5 หมู่ในปริมาณที่เพียงพอต่อความต้องการของร่างกาย',
        'เพิ่มปริมาณโปรตีนคุณภาพสูง เช่น เนื้อปลา ไข่ นม ถั่วเมล็ดแห้ง และเต้าหู้',
        'แบ่งมื้ออาหารเป็นมื้อย่อย 4-5 มื้อต่อวัน พร้อมของว่างที่มีประโยชน์ เช่น ถั่ว อัลมอนด์ กล้วยหอม',
        'ดื่มนมหรือนมถั่วเหลืองเสริมระหว่างมื้อ'
      ],
      exerciseAdvice: [
        'เน้นการออกกำลังกายแบบมีแรงต้าน (Resistance/Strength Training) เพื่อสร้างมวลกล้ามเนื้อ',
        'หลีกเลี่ยงการออกกำลังกายแบบคาร์ดิโอหนักเกินไปเพื่อไม่ให้ร่างกายเผาผลาญพลังงานมากเกินไป',
        'พักผ่อนให้เพียงพอ 7-8 ชั่วโมงต่อวัน'
      ],
      calculatedAt,
    };
  } else if (bmi <= 22.9) {
    return {
      bmi,
      category: 'normal',
      categoryLabel: 'น้ำหนักปกติ (สมส่วน)',
      categoryDescription: 'ยินดีด้วย! ค่าดัชนีมวลกายของคุณอยู่ในเกณฑ์มาตรฐาน มีความเสี่ยงต่อการเกิดโรคเรื้อรังน้อยที่สุด ควรรักษามาตรฐานสุขภาพนี้ต่อไป',
      colorClass: 'text-emerald-600',
      bgColorClass: 'bg-emerald-50',
      borderColorClass: 'border-emerald-300',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      idealWeightMin,
      idealWeightMax,
      weightDiff: 0,
      healthRisks: [
        'มีความเสี่ยงต่ำต่อโรคหัวใจ เบาหวาน และความดันโลหิตสูง',
        'สุขภาพร่างกายโดยรวมอยู่ในเกณฑ์ดีเยี่ยม'
      ],
      dietAdvice: [
        'รับประทานอาหารครบ 5 หมู่ในสัดส่วน 2:1:1 (ผัก 2 ส่วน : ข้าวแป้ง 1 ส่วน : เนื้อสัตว์ 1 ส่วน)',
        'ลดอาหารรสหวาน มัน เค็ม ดื่มน้ำเปล่าวันละ 8-10 แก้ว',
        'รับประทานผักผลไม้สดหลากหลายสีเป็นประจำ'
      ],
      exerciseAdvice: [
        'ออกกำลังกายแบบแอโรบิกอย่างสม่ำเสมอสัปดาห์ละ 150 นาที (เช่น เดินเร็ว วิ่ง ปั่นจักรยาน)',
        'เสริมการฝึกความแข็งแรงของกล้ามเนื้อ 2 วันต่อสัปดาห์',
        'ตรวจสุขภาพประจำปีอย่างสม่ำเสมอ'
      ],
      calculatedAt,
    };
  } else if (bmi <= 24.9) {
    return {
      bmi,
      category: 'overweight',
      categoryLabel: 'น้ำหนักเกินเกณฑ์ (ท้วม)',
      categoryDescription: 'ค่าดัชนีมวลกายเริ่มสูงกว่าเกณฑ์ปกติ มีความเสี่ยงเริ่มต้นต่อโรคเมแทบอลิก ควรเริ่มปรับเปลี่ยนพฤติกรรมการกินและการออกกำลังกาย',
      colorClass: 'text-amber-600',
      bgColorClass: 'bg-amber-50',
      borderColorClass: 'border-amber-300',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
      idealWeightMin,
      idealWeightMax,
      weightDiff,
      healthRisks: [
        'ความเสี่ยงเริ่มสูงขึ้นสำหรับโรคเบาหวานชนิดที่ 2',
        'ความดันโลหิตสูง',
        'ภาวะไขมันในเลือดผิดปกติ',
        'อาการปวดเมื่อยข้อต่อหรือหัวเข่า'
      ],
      dietAdvice: [
        'ควบคุมปริมาณแคลอรี่ในแต่ละวัน หลีกเลี่ยงของทอด ของหวาน และเครื่องดื่มรสหวาน',
        'เปลี่ยนข้าวขาวเป็นข้าวกล้องหรือธัญพืชไม่ขัดสีเพื่อเพิ่มกากใย',
        'หลีกเลี่ยงการรับประทานอาหารมื้อดึกและงดของกินจุกจิก'
      ],
      exerciseAdvice: [
        'ออกกำลังกายระดับปานกลางอย่างน้อย 150-200 นาทีต่อสัปดาห์ เช่น เดินเร็ว ว่ายน้ำ',
        'ขยับร่างกายระหว่างวัน เดินขึ้นบันไดแทนการใช้ลิฟต์',
        'ชั่งน้ำหนักสัปดาห์ละ 1 ครั้งเพื่อติดตามผล'
      ],
      calculatedAt,
    };
  } else if (bmi <= 29.9) {
    return {
      bmi,
      category: 'obese1',
      categoryLabel: 'โรคอ้วนระดับ 1 (อ้วน)',
      categoryDescription: 'คุณมีภาวะอ้วนระดับที่ 1 ร่างกายสะสมไขมันส่วนเกินมาก มีความเสี่ยงปานกลางถึงสูงต่อโรคเรื้อรัง ควรตั้งเป้าหมายลดน้ำหนักอย่างจริงจัง',
      colorClass: 'text-orange-600',
      bgColorClass: 'bg-orange-50',
      borderColorClass: 'border-orange-300',
      badgeClass: 'bg-orange-100 text-orange-800 border-orange-300',
      idealWeightMin,
      idealWeightMax,
      weightDiff,
      healthRisks: [
        'โรคเบาหวาน ความดันโลหิตสูง',
        'ไขมันพอกตับ และโรคหลอดเลือดหัวใจ',
        'ภาวะหยุดหายใจขณะหลับ (นอนกรน)',
        'โรคข้อเข่าเสื่อมจากน้ำหนักกดทับ'
      ],
      dietAdvice: [
        'ลดปริมาณพลังงานจากอาหารลง 500 แคลอรี่ต่อวันจากปกติ',
        'งดน้ำอัดลม ชานม ชาเขียวหวาน และเบเกอรี่อย่างเด็ดขาด',
        'เน้นผักต้ม ผักนึ่ง เนื้อสัตว์ไม่ติดมัน ไข่ขาว และปลา'
      ],
      exerciseAdvice: [
        'เลือกการออกกำลังกายที่ลดแรงกระแทกต่อข้อต่อ เช่น ว่ายน้ำ ปั่นจักรยาน เดินในน้ำ',
        'ออกกำลังกายต่อเนื่องอย่างน้อย 30-45 นาที วันเว้นวัน หรือ 4-5 วันต่อสัปดาห์',
        'ปรึกษาแพทย์หรือนักโภชนาการเพื่อวางแผนการดูแลอย่างเหมาะสม'
      ],
      calculatedAt,
    };
  } else {
    return {
      bmi,
      category: 'obese2',
      categoryLabel: 'โรคอ้วนระดับ 2 (อันตราย)',
      categoryDescription: 'คุณมีภาวะอ้วนรุนแรงหรืออ้วนอันตราย มีความเสี่ยงสูงมากต่อภาวะแทรกซ้อนที่คุกคามชีวิต แนะนำให้พบแพทย์หรือผู้เชี่ยวชาญเพื่อรับการรักษาอย่างถูกต้อง',
      colorClass: 'text-rose-600',
      bgColorClass: 'bg-rose-50',
      borderColorClass: 'border-rose-300',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
      idealWeightMin,
      idealWeightMax,
      weightDiff,
      healthRisks: [
        'โรคหัวใจขาดเลือดและโรคหลอดเลือดสมอง (Stroke)',
        'ภาวะหยุดหายใจขณะหลับขั้นรุนแรง (Sleep Apnea)',
        'โรคไตวายเรื้อรัง และโรคเบาหวานรุนแรง',
        'ความผิดปกติของระบบฮอร์โมนและข้อต่อทั่วร่างกาย'
      ],
      dietAdvice: [
        'ควรได้รับการวางแผนโภชนาบำบัดจากนักกำหนดอาหารหรือแพทย์',
        'จำกัดการบริโภคแป้ง ไขมันอิ่มตัว และน้ำตาลอย่างเข้มงวด',
        'จดบันทึกอาหารที่รับประทานทุกมื้อเพื่อปรับพฤติกรรม'
      ],
      exerciseAdvice: [
        'ตรวจเช็คร่างกายและการทำงานของหัวใจก่อนเริ่มออกกำลังกาย',
        'เริ่มจากกิจกรรมเบาๆ เช่น การยืดเหยียด เดินช้าๆ ในน้ำ หรือแกว่งแขน',
        'ไม่ควรหักโหมออกกำลังกายหนักทันทีเพื่อป้องกันอุบัติเหตุและภาวะหัวใจล้มเหลว'
      ],
      calculatedAt,
    };
  }
}
