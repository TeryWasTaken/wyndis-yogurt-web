# Wyndi's Yogurt — Website (1 halaman, dikerjakan 4 orang bergantian)

Satu halaman statis (HTML + CSS + JS tanpa build tool). Tampilan identik dengan file asli
`Wyndis_Yogurt_Responsive (5).html`; bedanya file besar itu dipecah supaya bisa dikerjakan
berurutan seperti workflow GitHub (orang berikutnya melanjutkan pekerjaan orang sebelumnya).

Cara lihat hasil: buka `index.html` di browser (atau `python3 -m http.server` lalu buka `localhost:8000`).

## Pembagian 4 bagian

| Bagian | Orang | Isi | File milik bagian ini |
|---|---|---|---|
| **1** | Orang 1 | Tombol Home (menu navigasi), Cover/Hero, burger **3 strip** + drawer menu | `css/header.css`, `css/hero.css`, `js/header.js`, `js/common.js`, `css/base.css` (dasar) |
| **2** | Orang 2 | About Us + Our Products (carousel) | `css/about-products.css`, `js/carousel.js` |
| **3** | Orang 3 | Detail tiap produk (Ice Cream, Greek Style, Drink, Blend) | `css/details.css` |
| **4** | Orang 4 | Contact Us + penutup (Thank You) + finishing | `css/contact.css` |

Gambar ada di `assets/images/` (hasil ekstrak dari base64 di file asli).
`css/base.css` dipakai bersama: kalau perlu mengubah, kabari tim dan buat PR kecil tersendiri.

## Alur kerja (berurutan)

```
main ── part 1 ── part 2 ── part 3 ── part 4
        Orang 1   Orang 2   Orang 3   Orang 4
```

1. Orang N ambil kode terbaru: `git checkout main && git pull`
2. Buat branch: `git checkout -b part-N-<nama-bagian>` (mis. `part-2-about-products`)
3. Kerjakan bagian N saja (lihat tabel di atas). Tambahkan section bagianmu di dalam `<main class="stage">`, tepat di bawah section bagian sebelumnya.
4. Setiap bagian baru ditambahkan, update 3 hal di `index.html`:
   * `--stage-h` pada `<main class="stage">` (tinggi halaman: part 1 = 952, part 2 = 2340, part 3 = 7066, part 4 = 7742)
   * tambahkan `<link rel="stylesheet" href="css/…">` untuk CSS bagian itu di `<head>`
   * tambahkan `<script src="js/…">` sebelum `</body>` bila bagian itu punya JS
5. `git add . && git commit -m "part N: …" && git push -u origin part-N-…`, lalu buka Pull Request ke `main`.
6. Setelah PR di-merge, orang berikutnya mulai dari langkah 1.

Tag `part-1` … `part-4` menandai kondisi `main` setelah tiap bagian selesai
(`git checkout part-1` untuk melihat/mengulang dari titik itu).

## Cara kerja tata letak

Halaman memakai artboard 1440 px yang diskalakan ke lebar layar. Setiap elemen diposisikan dengan
variabel `--x / --y / --w / --h` (dan `--fs / --lh` untuk teks) dalam satuan piksel desain.
Koordinat `--y` bersifat absolut terhadap seluruh halaman, jadi **jangan menggeser** posisi bagian lain.

Batas tiap bagian: Hero 0–952 · About + Products 952–2340 · Detail produk 2340–7066 · Contact 7066–7742.
