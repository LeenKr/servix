// src/pages/driver/DriverForm.jsx
import React, { useEffect, useMemo, useState } from "react";
import useOnlineStatus from "./useOnlineStatus";
import { submitMaintenance } from "./driverApi";

const TRANSLATIONS = {
  ar: {
    appTitle: "صيانة السائق",
    subtitle: "يرجى تعبئة بيانات ما قبل الانطلاق وفحص النقاط السريعة.",
    group: "المجموعة",
    chooseGroup: "اختر المجموعة",
    trucks: "الشاحنات",
    vans: "الفانات",
    excavators: "الحفّارات",
    vehicle: "المركبة",
    chooseVehicle: "اختر المركبة",
    odometer: "قراءة العداد (كم)",
    odoPH: "مثال: 128540",
    engineHours: "ساعات عمل المحرّك",
    engineHoursPH: "اختياري",
    checklist: "قائمة التحقق",
    checkFluids: "فحص السوائل",
    checkBrakes: "فحص الفرامل",
    checkBattery: "اختبار البطارية",
    notes: "ملاحظات",
    notesPH: "اكتب أي ملاحظات أو أعطال…",
    addPhotos: "أضف صوراً (مثلاً صورة العطل)",
    photosHint: "يمكنك إضافة حتى 5 صور. يدعم الالتقاط المباشر من الكاميرا على الهاتف.",
    status: "الحالة",
    online: "متصل",
    offline: "غير متصل (سيتم المزامنة لاحقاً)",
    submit: "إرسال",
    sentOK: "✅ تم الإرسال بنجاح!",
    sentFail: "❌ فشل الحفظ: ",
    delete: "حذف",
    tooltip: "التبديل بين العربية والإنجليزية",
  },
  en: {
    appTitle: "Driver Maintenance",
    subtitle: "Please fill pre-drive details and quick checks.",
    group: "Group",
    chooseGroup: "Select Group",
    trucks: "Trucks",
    vans: "Vans",
    excavators: "Excavators",
    vehicle: "Vehicle",
    chooseVehicle: "Select Vehicle",
    odometer: "Odometer (km)",
    odoPH: "e.g., 128540",
    engineHours: "Engine Hours",
    engineHoursPH: "Optional",
    checklist: "Checklist",
    checkFluids: "Check fluids",
    checkBrakes: "Inspect brakes",
    checkBattery: "Test battery",
    notes: "Notes",
    notesPH: "Write any remarks or observed issues…",
    addPhotos: "Add photos (e.g., the issue)",
    photosHint: "You can add up to 5 photos. Mobile camera capture supported.",
    status: "Status",
    online: "Online",
    offline: "Offline (will sync later)",
    submit: "Submit",
    sentOK: "✅ Submitted successfully!",
    sentFail: "❌ Failed to save: ",
    delete: "Delete",
    tooltip: "Toggle between Arabic and English",
  },
};

export default function DriverForm() {
  const isOnline = useOnlineStatus();

  const [lang, setLang] = useState(() => localStorage.getItem("servix_lang") || "ar");
  useEffect(() => {
    localStorage.setItem("servix_lang", lang);
    document.documentElement.lang = lang === "ar" ? "ar" : "en";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const t = useMemo(() => TRANSLATIONS[lang], [lang]);
  const isArabic = lang === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const [form, setForm] = useState({
    group: "",
    vehicle: "",
    odometer: "",
    engineHours: "",
    checklist: { fluids: false, brakes: false, battery: false },
    notes: "",
    images: [],
  });
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleChecklist = (e) => {
    const { name, checked } = e.target;
    setForm((f) => ({
      ...f,
      checklist: { ...f.checklist, [name]: checked },
    }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const nextFiles = [...form.images, ...files].slice(0, 5);
    const nextPreviews = nextFiles.map((file) => URL.createObjectURL(file));
    setForm((f) => ({ ...f, images: nextFiles }));
    setPreviews(nextPreviews);
  };

  const removeImage = (idx) => {
    const nextFiles = form.images.filter((_, i) => i !== idx);
    const nextPreviews = previews.filter((_, i) => i !== idx);
    setForm((f) => ({ ...f, images: nextFiles }));
    setPreviews(nextPreviews);
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imagesBase64 = await Promise.all((form.images || []).map((f) => fileToBase64(f)));
      const payload = { ...form, images: imagesBase64, lang };
      await submitMaintenance(payload, isOnline);
      alert(t.sentOK);
      setForm({
        group: "",
        vehicle: "",
        odometer: "",
        engineHours: "",
        checklist: { fluids: false, brakes: false, battery: false },
        notes: "",
        images: [],
      });
      setPreviews([]);
    } catch (err) {
      alert(t.sentFail + err.message);
    }
  };

  const groupOptions = [
    { value: "", label: t.chooseGroup },
    { value: "Trucks", label: t.trucks },
    { value: "Vans", label: t.vans },
    { value: "Excavators", label: t.excavators },
  ];
  const vehicleOptions = [
    { value: "", label: t.chooseVehicle },
    { value: "Truck 123", label: isArabic ? "شاحنة 123" : "Truck 123" },
    { value: "Truck 456", label: isArabic ? "شاحنة 456" : "Truck 456" },
    { value: "Van A", label: isArabic ? "فان A" : "Van A" },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8" dir={dir}>
      {/* Header with globe toggle */}
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">{t.appTitle}</h2>
          <p className="text-lg text-slate-600 font-medium mt-1">{t.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={() => setLang(isArabic ? "en" : "ar")}
          className="rounded-full p-2 hover:bg-slate-100 transition text-2xl leading-none"
          title={t.tooltip}
          aria-label={t.tooltip}
        >
          🌐
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white shadow-lg">
        <div className="p-6 space-y-6 text-lg font-semibold text-slate-800">
          {/* Group & Vehicle */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1">{t.group}</label>
              <select
                name="group"
                value={form.group}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-400 bg-white px-3 py-3 text-lg font-medium shadow-sm outline-none transition focus:ring-4 focus:ring-blue-200"
              >
                {groupOptions.map((opt) => (
                  <option key={opt.value + opt.label} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">{t.vehicle}</label>
              <select
                name="vehicle"
                value={form.vehicle}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-400 bg-white px-3 py-3 text-lg font-medium shadow-sm outline-none transition focus:ring-4 focus:ring-blue-200"
              >
                {vehicleOptions.map((opt) => (
                  <option key={opt.value + opt.label} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Odometer & Engine Hours */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1">{t.odometer}</label>
              <input
                type="number"
                name="odometer"
                value={form.odometer}
                onChange={handleChange}
                placeholder={t.odoPH}
                className="w-full rounded-lg border border-slate-400 bg-white px-3 py-3 text-lg font-medium shadow-sm outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block mb-1">{t.engineHours}</label>
              <input
                type="number"
                name="engineHours"
                value={form.engineHours}
                onChange={handleChange}
                placeholder={t.engineHoursPH}
                className="w-full rounded-lg border border-slate-400 bg-white px-3 py-3 text-lg font-medium shadow-sm outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Checklist */}
          <div>
            <label className="block mb-2">{t.checklist}</label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-base">
              <label className="flex items-center gap-2 rounded-lg border border-slate-400 bg-white px-3 py-3 shadow-sm hover:bg-slate-50">
                <input
                  type="checkbox"
                  name="fluids"
                  checked={form.checklist.fluids}
                  onChange={handleChecklist}
                  className="h-5 w-5 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                />
                <span>{t.checkFluids}</span>
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-slate-400 bg-white px-3 py-3 shadow-sm hover:bg-slate-50">
                <input
                  type="checkbox"
                  name="brakes"
                  checked={form.checklist.brakes}
                  onChange={handleChecklist}
                  className="h-5 w-5 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                />
                <span>{t.checkBrakes}</span>
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-slate-400 bg-white px-3 py-3 shadow-sm hover:bg-slate-50">
                <input
                  type="checkbox"
                  name="battery"
                  checked={form.checklist.battery}
                  onChange={handleChecklist}
                  className="h-5 w-5 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                />
                <span>{t.checkBattery}</span>
              </label>
            </div>
          </div>

          {/* Notes + Photos */}
          <div className="space-y-3">
            <div>
              <label className="block mb-1">{t.notes}</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={4}
                placeholder={t.notesPH}
                className="w-full rounded-lg border border-slate-400 bg-white px-3 py-3 text-lg font-medium shadow-sm outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block mb-1">{t.addPhotos}</label>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                multiple
                onChange={handleImages}
                className="block w-full rounded-lg border border-slate-400 bg-white px-3 py-3 text-lg font-medium shadow-sm outline-none transition file:me-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-base hover:file:bg-slate-200 focus:ring-4 focus:ring-blue-200"
              />
              {previews.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {previews.map((src, idx) => (
                    <div key={idx} className="relative overflow-hidden rounded-lg border border-slate-300">
                      <img
                        src={src}
                        alt={`${isArabic ? "صورة" : "Photo"} ${idx + 1}`}
                        className="h-28 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 left-1 rounded-md bg-white/90 px-2 py-0.5 text-sm font-bold text-red-600 shadow"
                      >
                        {t.delete}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-2 text-xs text-slate-500">{t.photosHint}</p>
            </div>
          </div>

          {/* Status */}
          <p className="text-base font-bold">
            {t.status}:{" "}
            <span className={isOnline ? "text-green-600" : "text-amber-600"}>
              {isOnline ? t.online : t.offline}
            </span>
          </p>
        </div>

        {/* Submit */}
        <div className="rounded-b-2xl border-t border-slate-200 bg-slate-100 p-4">
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-bold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            {t.submit}
          </button>
        </div>
      </form>
    </div>
  );
}