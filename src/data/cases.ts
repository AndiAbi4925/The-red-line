export interface Case {
  id: string;
  title: string;
  status: "unsolved" | "locked" | "solved";
  description: string;
}

export const CASES: Case[] = [
  {
    id: "case-1",
    title: "Ransomware Rumah Sakit Pusat",
    status: "unsolved",
    description: "Temukan IP asal malware di log server UGD, lacak ke router ruang arsip.",
  },
  {
    id: "case-2",
    title: "Suara Palsu Sang CEO (Deepfake)",
    status: "locked",
    description: "Analisis spektrogram suara CEO; temukan glitch digital di detik ke-12.",
  },
  {
    id: "case-3",
    title: "Sabotase Lampu Lalu Lintas",
    status: "locked",
    description: "Temukan anomali durasi lampu merah di perempatan bank pusat.",
  },
  {
    id: "case-4",
    title: "Kebocoran Blueprint Mobil Otonom",
    status: "locked",
    description: "Buka repositori kode dan cari commit yang dihapus paksa.",
  },
  {
    id: "case-5",
    title: "Peretasan Bursa Saham (Flash Crash)",
    status: "locked",
    description: "Cocokkan anomali anjloknya saham dengan detik publikasi berita palsu.",
  },
  {
    id: "case-6",
    title: "Pencurian Data Satelit Cuaca",
    status: "locked",
    description: "Analisis jeda transmisi data satelit selama 3 menit.",
  },
  {
    id: "case-7",
    title: "Pencurian Mahkota Romanov",
    status: "locked",
    description: "Bandingkan blueprint asli dengan denah ventilasi terbaru.",
  },
  {
    id: "case-8",
    title: "Pembunuhan di Kamar VIP 404",
    status: "locked",
    description: "Cek log kunci RFID; tidak ada yang masuk sejak korban tidur.",
  },
  {
    id: "case-9",
    title: "Kargo Gelap Pelabuhan",
    status: "locked",
    description: "Bandingkan manifes isi 'Kapas' dengan berat kontainer di timbangan.",
  },
  {
    id: "case-10",
    title: "Brankas Bawah Tanah Bank Swiss",
    status: "locked",
    description: "Analisis getaran seismik minor yang terjadi setiap jam 2 pagi.",
  },
  {
    id: "case-11",
    title: "Pembajakan Drone Medis",
    status: "locked",
    description: "Cek jalur terbang drone yang melenceng 2 derajat karena spoofing GPS.",
  },
  {
    id: "case-12",
    title: "Misteri Gerbong Kargo Terakhir",
    status: "locked",
    description: "Analisis penurunan kecepatan mendadak (rem darurat ditarik sedikit).",
  },
  {
    id: "case-13",
    title: "Offshore Panama (Perusahaan Cangkang)",
    status: "locked",
    description: "Ekstrak nama direktur bayangan dari akta perusahaan di Cayman Islands.",
  },
  {
    id: "case-14",
    title: "Pencucian Uang di Lelang Seni",
    status: "locked",
    description: "Periksa lukisan abstrak anonim yang terjual $5 juta.",
  },
  {
    id: "case-15",
    title: "Kartel Obat Kadaluarsa",
    status: "locked",
    description: "Cocokkan nomor batch obat dari korban tewas dengan database pabrik.",
  },
  {
    id: "case-16",
    title: "Skandal Judi Bola Internasional",
    status: "locked",
    description: "Analisis lonjakan taruhan tidak wajar 5 menit sebelum penalti kontroversial.",
  },
  {
    id: "case-17",
    title: "Sindikat Berlian Berdarah",
    status: "locked",
    description: "Periksa nomor seri mikro pada berlian sitaan (ternyata dipalsukan).",
  },
  {
    id: "case-18",
    title: "Korupsi Proyek Bendungan",
    status: "locked",
    description: "Analisis hasil lab material; semen di-downgrade kualitasnya.",
  },
  {
    id: "case-19",
    title: "Wasiat Sang Konglomerat",
    status: "locked",
    description: "Gunakan alat zoom pada tanda tangan di surat wasiat.",
  },
  {
    id: "case-20",
    title: "Kode Rahasia di Iklan Koran",
    status: "locked",
    description: "Temukan pola huruf kapital ganjil di iklan baris penjualan mobil.",
  },
  {
    id: "case-21",
    title: "Plat Cetak Uang Palsu Sempurna",
    status: "locked",
    description: "Analisis kegagalan cetak microtext di uang pecahan $100.",
  },
  {
    id: "case-22",
    title: "Rahasia di Balik Lukisan Renaissance",
    status: "locked",
    description: "Nyalakan filter sinar UV pada kanvas untuk melihat sketsa lapisan bawah lukisan.",
  },
  {
    id: "case-23",
    title: "Foto Pemerasan Politikus",
    status: "locked",
    description: "Analisis sudut jatuhnya bayangan di foto politikus tersebut; bayangannya tidak sejajar.",
  },
  {
    id: "case-24",
    title: "Manifesto Sekte Rahasia",
    status: "locked",
    description: "Dekode simbol astrologi di jurnal menggunakan teknik substitusi frekuensi huruf.",
  },
  {
    id: "case-25",
    title: "Anggur Beracun di Pesta Gala",
    status: "locked",
    description: "Analisis jenis racun (cyanide efek lambat) di laporan medis.",
  },
  {
    id: "case-26",
    title: "Misteri Panggung Teater",
    status: "locked",
    description: "Periksa serat tali sling yang putus; terpotong rapi dengan pisau panas.",
  },
  {
    id: "case-27",
    title: "Kapal Pesiar yang Hilang Tiba-tiba",
    status: "locked",
    description: "Analisis sinyal SOS terakhir; suara kapten terdengar di bawah ancaman pistol.",
  },
  {
    id: "case-28",
    title: "Kematian di Gerbong Eksekutif",
    status: "locked",
    description: "Temukan korban tewas di kabin yang terkunci dari dalam.",
  },
  {
    id: "case-29",
    title: "Jejak Berlumpur di Perpustakaan Tua",
    status: "locked",
    description: "Bandingkan ukuran jejak sepatu bot lumpur dengan koleksi sepatu di rumah.",
  },
  {
    id: "case-30",
    title: "Alibi Fotografer Kematian",
    status: "locked",
    description: "Buka foto terakhir yang dijepret fotografer sebelum tewas di tebing.",
  }
];
