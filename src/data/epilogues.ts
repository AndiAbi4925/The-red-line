export const EPILOGUES: Record<string, string> = {
  "case-1": "IP 192.168.1.15 mengarah langsung ke router di ruang arsip. Karyawan IT (Alex M.) tercatat masuk pada pukul 01:58 AM, tepat sebelum ransomware aktif. Sang pelaku telah diamankan beserta dompet kripto-nya.",
  "case-2": "Frekuensi digital di detik ke-12 membuktikan anomali suara sintetik. Transfer $5,000,000 berhasil dicegah sebelum mencapai rekening Cayman Islands milik VP of Finance. Skandal ini resmi terbongkar.",
  "case-3": "Anomali 180 detik lampu merah di persimpangan bank terbukti disengaja. Triangulasi sinyal 433 MHz dari pelat nomor B1234XYZ mengarah pada komplotan peretas di atap gedung sebelah. Perampokan bank sukses digagalkan.",
};

export const getEpilogue = (caseId: string) => {
  return EPILOGUES[caseId] || "Investigasi selesai. Pelaku utama berhasil diringkus dan jaringan misterius ini sedikit demi sedikit mulai terungkap. Deduksi yang brilian, Detektif.";
};
