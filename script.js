<<<<<<< HEAD
// ════════════════════════════════════════
// BAGIAN A — KONFIGURASI
// Ganti ini nanti dengan API key ThingSpeak
// ════════════════════════════════════════
const CONFIG = {
    mode: 'simulasi',      // ganti ke 'thingspeak' saat hardware siap
    channelId: 'ISI_NANTI',
    apiKey: 'ISI_NANTI',
    interval: 3000        // update tiap 3 detik
};


// ════════════════════════════════════════
// BAGIAN B — AMBIL DATA
// Satu fungsi, dua mode: simulasi atau live
// ════════════════════════════════════════
async function getData() {
    if (CONFIG.mode === 'simulasi') {
        // Return data palsu untuk testing
        return {
            phIn: 4.5, phOut: 7.2,
            tdsIn: 1050, tdsOut: 148,
            turb: 2.8, color: 91,
            suhu: 27.5, arus: 1.85,
            conf: 68, bat: 80
        };
    }

    // Nanti kalau ThingSpeak sudah siap, aktifkan ini:
    // const url = `https://api.thingspeak.com/channels/
    //   ${CONFIG.channelId}/feeds/last.json?
    //   api_key=${CONFIG.apiKey}`;
    // const res = await fetch(url);
    // const d   = await res.json();
    // return {
    //   phIn:   parseFloat(d.field1),
    //   phOut:  parseFloat(d.field2),
    //   tdsIn:  parseFloat(d.field3),
    //   tdsOut: parseFloat(d.field4),
    //   turb:   parseFloat(d.field5),
    //   color:  parseFloat(d.field6),
    //   suhu:   parseFloat(d.field7),
    //   arus:   parseFloat(d.field8),
    // };
}


// ════════════════════════════════════════
// BAGIAN C — KALKULASI WQI
// Rumus weighted average 4 parameter
// ════════════════════════════════════════
function hitungWQI(d) {
    const phScore = (d.phOut >= 6 && d.phOut <= 9)
        ? 100
        : Math.max(0, 100 - Math.abs(d.phOut - 7.5) * 30);
    const tdsScore = Math.max(0, 100 - (d.tdsOut / 200) * 100);
    const turbScore = Math.max(0, 100 - (d.turb / 5) * 100);
    const colorScore = d.color; // sudah dalam %

    // Bobot: pH 30% + TDS 30% + Turb 20% + Warna 20%
    return Math.round(
        0.3 * phScore +
        0.3 * tdsScore +
        0.2 * turbScore +
        0.2 * colorScore
    );
}


// ════════════════════════════════════════
// BAGIAN D — UPDATE TAMPILAN
// Fungsi-fungsi kecil untuk update UI
// ════════════════════════════════════════

// Ganti teks elemen
function setText(id, val) {
    document.getElementById(id).textContent = val;
}

// Update traffic light
function updateTrafficLight(wqi) {
    // Reset semua
    ['tl-green', 'tl-yellow', 'tl-red'].forEach(id => {
        document.getElementById(id).classList.remove('on');
    });

    if (wqi >= 80) document.getElementById('tl-green').classList.add('on');
    else if (wqi >= 50) document.getElementById('tl-yellow').classList.add('on');
    else document.getElementById('tl-red').classList.add('on');
}

// Update semua kartu sensor
function updateCards(d, wqi) {
    setText('v-ph-in', d.phIn);
    setText('v-ph-out', d.phOut);
    setText('v-tds-in', d.tdsIn);
    setText('v-tds-out', d.tdsOut);
    setText('v-turb', d.turb);
    setText('v-color', d.color + '%');
    setText('v-suhu', d.suhu + '°C');
    setText('v-arus', d.arus + 'A');
    setText('v-conf', d.conf + '/100');
    setText('v-wqi', wqi);
    updateTrafficLight(wqi);
}


// ════════════════════════════════════════
// BAGIAN E — LOOP UTAMA
// Dipanggil pertama kali lalu tiap interval
// ════════════════════════════════════════
async function mainLoop() {
    const data = await getData();
    const wqi = hitungWQI(data);
    updateCards(data, wqi);
    // updateChart(data, wqi); // tambahkan nanti
}

// Jalankan pertama kali
mainLoop();

// Ulangi tiap 3 detik
=======
// ════════════════════════════════════════
// BAGIAN A — KONFIGURASI
// Ganti ini nanti dengan API key ThingSpeak
// ════════════════════════════════════════
const CONFIG = {
    mode: 'simulasi',      // ganti ke 'thingspeak' saat hardware siap
    channelId: 'ISI_NANTI',
    apiKey: 'ISI_NANTI',
    interval: 3000        // update tiap 3 detik
};


// ════════════════════════════════════════
// BAGIAN B — AMBIL DATA
// Satu fungsi, dua mode: simulasi atau live
// ════════════════════════════════════════
async function getData() {
    if (CONFIG.mode === 'simulasi') {
        // Return data palsu untuk testing
        return {
            phIn: 4.5, phOut: 7.2,
            tdsIn: 1050, tdsOut: 148,
            turb: 2.8, color: 91,
            suhu: 27.5, arus: 1.85,
            conf: 68, bat: 80
        };
    }

    // Nanti kalau ThingSpeak sudah siap, aktifkan ini:
    // const url = `https://api.thingspeak.com/channels/
    //   ${CONFIG.channelId}/feeds/last.json?
    //   api_key=${CONFIG.apiKey}`;
    // const res = await fetch(url);
    // const d   = await res.json();
    // return {
    //   phIn:   parseFloat(d.field1),
    //   phOut:  parseFloat(d.field2),
    //   tdsIn:  parseFloat(d.field3),
    //   tdsOut: parseFloat(d.field4),
    //   turb:   parseFloat(d.field5),
    //   color:  parseFloat(d.field6),
    //   suhu:   parseFloat(d.field7),
    //   arus:   parseFloat(d.field8),
    // };
}


// ════════════════════════════════════════
// BAGIAN C — KALKULASI WQI
// Rumus weighted average 4 parameter
// ════════════════════════════════════════
function hitungWQI(d) {
    const phScore = (d.phOut >= 6 && d.phOut <= 9)
        ? 100
        : Math.max(0, 100 - Math.abs(d.phOut - 7.5) * 30);
    const tdsScore = Math.max(0, 100 - (d.tdsOut / 200) * 100);
    const turbScore = Math.max(0, 100 - (d.turb / 5) * 100);
    const colorScore = d.color; // sudah dalam %

    // Bobot: pH 30% + TDS 30% + Turb 20% + Warna 20%
    return Math.round(
        0.3 * phScore +
        0.3 * tdsScore +
        0.2 * turbScore +
        0.2 * colorScore
    );
}


// ════════════════════════════════════════
// BAGIAN D — UPDATE TAMPILAN
// Fungsi-fungsi kecil untuk update UI
// ════════════════════════════════════════

// Ganti teks elemen
function setText(id, val) {
    document.getElementById(id).textContent = val;
}

// Update traffic light
function updateTrafficLight(wqi) {
    // Reset semua
    ['tl-green', 'tl-yellow', 'tl-red'].forEach(id => {
        document.getElementById(id).classList.remove('on');
    });

    if (wqi >= 80) document.getElementById('tl-green').classList.add('on');
    else if (wqi >= 50) document.getElementById('tl-yellow').classList.add('on');
    else document.getElementById('tl-red').classList.add('on');
}

// Update semua kartu sensor
function updateCards(d, wqi) {
    setText('v-ph-in', d.phIn);
    setText('v-ph-out', d.phOut);
    setText('v-tds-in', d.tdsIn);
    setText('v-tds-out', d.tdsOut);
    setText('v-turb', d.turb);
    setText('v-color', d.color + '%');
    setText('v-suhu', d.suhu + '°C');
    setText('v-arus', d.arus + 'A');
    setText('v-conf', d.conf + '/100');
    setText('v-wqi', wqi);
    updateTrafficLight(wqi);
}


// ════════════════════════════════════════
// BAGIAN E — LOOP UTAMA
// Dipanggil pertama kali lalu tiap interval
// ════════════════════════════════════════
async function mainLoop() {
    const data = await getData();
    const wqi = hitungWQI(data);
    updateCards(data, wqi);
    // updateChart(data, wqi); // tambahkan nanti
}

// Jalankan pertama kali
mainLoop();

// Ulangi tiap 3 detik
>>>>>>> 22d10dc50b8cefe67c45f0c179efb02538344b90
setInterval(mainLoop, CONFIG.interval);