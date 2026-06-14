# Printiums Corporate Website 🖨️💖

**Printiums Corporate Website** ialah laman web rasmi korporat untuk **Printiums**, sebuah perniagaan percetakan digital dan pembekal merchandise konsert utama di Malaysia. Laman web ini direka dengan reka bentuk gelap (*dark mode*) bertema warna **Hitam, Putih, dan Magenta** yang sangat premium, moden, dan berimpak tinggi.

Laman web ini menyokong dwibahasa sepenuhnya (Bahasa Melayu & English) secara dinamik tanpa muat semula halaman, serta responsif sepenuhnya untuk desktop, tablet, dan telefon mudah alih.

---

## 🌟 Ciri-Ciri Utama (Key Features)

1. **Reka Bentuk Premium & Glassmorphism**: Kesan kaca frosted pada bar navigasi dan borang perhubungan, ditambah dengan cahaya neon magenta yang memukau.
2. **Dwibahasa Dinamik (Bilingual)**: Suis penukar bahasa (MY | EN) pada navigasi yang menukar semua teks serta-merta dan mengingati pilihan pengguna menggunakan `localStorage`.
3. **Pameran Servis (Services Grid)**: Reka bentuk grid responsif untuk memaparkan servis utama (Pelekat Label, Large Format Banner, Kad Perniagaan Premium, Bahan Pemasaran, dan Merchandise Konsert).
4. **Slaid Portfolio Konsert (Concert Portfolio Carousel)**: Gelongsor poster konsert interaktif yang menampilkan 8 poster konsert rasmi yang disokong oleh Printiums sebagai rakan merchandise.
5. **Kaunter Statistik Beranimasi**: Angka-angka pencapaian syarikat yang bertambah secara dinamik apabila pengguna skrol ke seksyen berkenaan.
6. **Borang Mesej dengan Maklum Balas Dinamik**: Borang hubungi dengan kesan label terapung (*floating labels*), maklum balas *spinner loading*, dan mesej sukces dwibahasa.

---

## 📁 Struktur Fail Projek (Project Structure)

* `index.html` - Struktur utama laman web (Semantic HTML5 & Tag Dwibahasa).
* `styles.css` - Reka bentuk CSS premium responsif, grid auto-fit, dan animasi.
* `app.js` - Enjin logik suis bahasa, carousel, kaunter animasi, dan borang perhubungan.
* `logo.png` - Imej logo rasmi Printiums.
* `server.ps1` - Skrip pelayan tempatan PowerShell asli (Port 8086).
* `assets/` - Folder imej produk cetakan dan poster portfolio konsert.

---

## 🚀 Cara Menjalankan Projek Secara Tempatan

Anda boleh menjalankan laman web ini secara tempatan di Windows tanpa memerlukan Python atau Node.js:

1. Buka PowerShell dan pergi ke folder projek:
   ```powershell
   cd "path/to/printiums-corporate"
   ```
2. Jalankan skrip pelayan tempatan:
   ```powershell
   powershell -ExecutionPolicy Bypass -File server.ps1
   ```
3. Buka pelayar web dan lawati:
   👉 **http://localhost:8086**
