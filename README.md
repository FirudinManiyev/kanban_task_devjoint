# 📌 Kanban Tapşırıq İdarəetmə Tətbiqi

HTML, CSS və Vanilla JavaScript istifadə edilərək hazırlanmış, sürüklə-burax (Drag & Drop) funksionallığına malik Kanban tipli tapşırıq idarəetmə tətbiqi.

Bu layihə hər hansı framework istifadə edilmədən hazırlanmışdır və əsas məqsədi JavaScript, DOM Manipulation, HTML5 Drag and Drop API və LocalStorage texnologiyalarını praktik şəkildə tətbiq etməkdir.

---

# 📖 Layihə haqqında

Bu tətbiq istifadəçilərə tapşırıqlarını üç müxtəlif mərhələdə idarə etməyə imkan verir.

- 📋 Gözləmədə (To Do)
- ⚡ İcra olunur (In Progress)
- ✅ Tamamlandı (Done)

İstifadəçi yeni tapşırıq əlavə edə, redaktə edə, silə, sütunlar arasında sürükləyə, axtarış edə və prioritetə görə filtrasiya tətbiq edə bilər.

Bütün məlumatlar brauzerin **LocalStorage** yaddaşında saxlanılır və səhifə yenilənsə belə itmir.

---

# ✨ Xüsusiyyətlər

## 📌 Dinamik Render

- Tapşırıqlar JavaScript massivində saxlanılır.
- DOM elementləri JavaScript vasitəsilə dinamik yaradılır.
- HTML faylında əvvəlcədən yazılmış tapşırıq kartları yoxdur.

---

## ➕ Tapşırıq İdarəetməsi (CRUD)

İstifadəçi aşağıdakı əməliyyatları yerinə yetirə bilər:

- Yeni tapşırıq əlavə etmək
- Tapşırığı redaktə etmək
- Tapşırığı silmək

Hər tapşırıq aşağıdakı məlumatlardan ibarətdir:

- Başlıq
- Təsvir
- Status
- Prioritet

---

## 🖱 Drag & Drop

HTML5 Drag and Drop API istifadə edilərək hazırlanmışdır.

İstifadəçi:

- Tapşırığı sürükləyə bilər
- Başqa sütuna buraxa bilər
- Status avtomatik yenilənir
- Lövhə yenidən render olunur

---

## 💾 LocalStorage

Tətbiqdə bütün məlumatlar LocalStorage vasitəsilə saxlanılır.

Saxlanılan məlumatlar:

- Yeni əlavə olunan tapşırıqlar
- Redaktə olunan tapşırıqlar
- Silinən tapşırıqlar
- Drag & Drop nəticəsində dəyişən statuslar

Səhifə yenilənsə belə məlumatlar qorunur.

---

## 🔍 Axtarış

İstifadəçi aşağıdakılara görə axtarış edə bilər:

- Tapşırıq başlığı
- Tapşırıq təsviri

Axtarış real vaxt rejimində işləyir.

---

## 🎯 Prioritet Filtri

Tapşırıqları aşağıdakı prioritetlər üzrə filtr etmək mümkündür.

- 🔴 Yüksək
- 🟡 Orta
- 🟢 Aşağı

Axtarış və filtrasiya birlikdə işləyir.

---

## 🔒 Təhlükəsizlik (XSS Protection)

İstifadəçi tərəfindən daxil edilən məlumatlar təhlükəsiz şəkildə render olunur.

Layihədə:

- `innerHTML` istifadə olunmur.
- `textContent` istifadə olunur.

Beləliklə istifadəçi aşağıdakı kimi məlumat daxil etsə:

```html
<script>alert("Hack")</script>
```

Kod icra olunmur və yalnız adi mətn kimi göstərilir.

---

## 🚫 Təkrarlanan Tapşırıqların Qarşısının Alınması

Sistem eyni başlıqlı tapşırığın yenidən əlavə edilməsinə icazə vermir.

Bu yoxlama həm:

- Yeni tapşırıq yaradılarkən
- Redaktə zamanı

tətbiq olunur.

---

## 📱 Responsiv Dizayn

Layihə Mobile First yanaşması ilə hazırlanmışdır.

Dəstəklənən ekran ölçüləri:

- 📱 Mobil
- 💻 Planşet
- 🖥 Masaüstü

İstifadə olunan texnologiyalar:

- CSS Grid
- Flexbox
- Media Queries

---

# 🛠 İstifadə olunan texnologiyalar

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- HTML5 Drag and Drop API
- LocalStorage API

---

# 📂 Layihə strukturu

```text
kanban-board/
│
├── assets/
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
├── index.html
│
└── README.md
```

---

# 🚀 Layihəni işə salmaq

Repositoriyanı klonlayın:

```bash
git clone https://github.com/USERNAME/REPOSITORY.git
```

Layihə qovluğuna daxil olun:

```bash
cd REPOSITORY
```

Daha sonra `index.html` faylını brauzerdə açın.

Əlavə paket və ya quraşdırma tələb olunmur.

---

# 📋 Funksionallıqlar

- ✅ Tapşırıqların dinamik render olunması
- ✅ Tapşırıq əlavə etmək
- ✅ Tapşırığı redaktə etmək
- ✅ Tapşırığı silmək
- ✅ Drag & Drop
- ✅ LocalStorage
- ✅ Axtarış
- ✅ Prioritet üzrə filtrasiya
- ✅ Duplicate Validation
- ✅ XSS Protection
- ✅ Responsiv dizayn

---

# 🎯 Öyrənilən mövzular

Bu layihə aşağıdakı biliklərin praktik tətbiqini göstərir:

- Semantik HTML
- CSS Grid
- Flexbox
- Responsive Design
- DOM Manipulation
- Event Handling
- JavaScript ES6+
- Array metodları
- LocalStorage API
- HTML5 Drag and Drop API
- Təhlükəsiz render (XSS Protection)
- Form validasiyası

---

# 📄 Lisenziya

Bu layihə tədris məqsədilə hazırlanmışdır.

---

# 👨‍💻 Müəllif

**Firudin Maniyev**
