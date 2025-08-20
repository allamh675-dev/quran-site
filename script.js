// قائمة السور
const surahs = [
  "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام",
  "الأعراف", "الأنفال", "التوبة", "يونس", "هود", "يوسف", "الرعد",
  "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه",
  "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء",
  "النمل", "القصص", "العنكبوت", "الروم", "لقمان", "السجدة",
  "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر",
  "غافر", "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية",
  "الأحقاف", "محمد", "الفتح", "الحجرات", "ق", "الذاريات",
  "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد",
  "المجادلة", "الحشر", "الممتحنة", "الصف", "الجمعة", "المنافقون",
  "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة",
  "المعارج", "نوح", "الجن", "المزمل", "المدثر", "القيامة",
  "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس", "التكوير",
  "الانفطار", "المطففين", "الانشقاق", "البروج", "الطارق", "الأعلى",
  "الغاشية", "الفجر", "البلد", "الشمس", "الليل", "الضحى",
  "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة",
  "العاديات", "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل",
  "قريش", "الماعون", "الكوثر", "الكافرون", "النصر", "المسد",
  "الإخلاص", "الفلق", "الناس"
];

// روابط التلاوة
const reciters = {
  afs: "https://server8.mp3quran.net/afs/",   // مشاري العفاسي
  basit: "https://server12.mp3quran.net/basit/", // عبدالباسط
  husary: "https://server7.mp3quran.net/husary/" // الحصري
};

const surahSelect = document.getElementById("surah");
const reciterSelect = document.getElementById("reciter");
const searchInput = document.getElementById("search");
const player = document.getElementById("player");
const downloadBtn = document.getElementById("downloadBtn");
const surahTextDiv = document.getElementById("surahText");
const toggleTheme = document.getElementById("toggleTheme");

// تحميل أسماء السور
function loadSurahs() {
  surahSelect.innerHTML = "";
  surahs.forEach((name, i) => {
    const option = document.createElement("option");
    option.value = (i+1).toString().padStart(3, '0') + ".mp3";
    option.dataset.index = i+1; // رقم السورة
    option.textContent = name;
    surahSelect.appendChild(option);
  });
}
loadSurahs();

// تشغيل السورة
function playSurah() {
  const baseURL = reciters[reciterSelect.value];
  player.src = baseURL + surahSelect.value;
  player.play();

  // تحميل النص
  loadSurahText(surahSelect.selectedOptions[0].dataset.index);
}

surahSelect.addEventListener("change", playSurah);
reciterSelect.addEventListener("change", playSurah);

// زر التحميل
downloadBtn.addEventListener("click", () => {
  const baseURL = reciters[reciterSelect.value];
  const link = document.createElement("a");
  link.href = baseURL + surahSelect.value;
  link.download = surahSelect.options[surahSelect.selectedIndex].text + ".mp3";
  link.click();
});

// البحث في السور
searchInput.addEventListener("input", () => {
  const filter = searchInput.value.trim();
  surahSelect.innerHTML = "";
  surahs.forEach((name, i) => {
    if (name.includes(filter)) {
      const option = document.createElement("option");
      option.value = (i+1).toString().padStart(3, '0') + ".mp3";
      option.dataset.index = i+1;
      option.textContent = name;
      surahSelect.appendChild(option);
    }
  });
});

// تحميل نص السورة من API
async function loadSurahText(index) {
  surahTextDiv.innerHTML = "جاري التحميل...";
  try {
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${index}`);
    const data = await response.json();
    const ayat = data.data.ayahs.map(a => a.text).join(" ");
    surahTextDiv.innerHTML = ayat;
  } catch (error) {
    surahTextDiv.innerHTML = "تعذر تحميل نص السورة.";
  }
}

// الوضع الليلي
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});