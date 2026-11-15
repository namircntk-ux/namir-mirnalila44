<script setup>
import { ref, computed } from 'vue' 

const judul = ref('')
const kategori = ref('Pemrograman')
const sudahDibaca = ref(false)
const daftarBuku = ref([])
let idBukuBerikutnya = 0

function tambahBuku() {
    const judulBuku = judul.value.trim()

    if (judulBuku === '') {
        alert('Judul buku tidak boleh kosong!')
        return
    }

    daftarBuku.value.push({
        id: idBukuBerikutnya++,
        judul: judulBuku,
        kategori: kategori.value,
        sudahDibaca: sudahDibaca.value
    })

    judul.value = ''
    kategori.value = 'Pemrograman'
    sudahDibaca.value = false
}

const jumlahDibaca = computed(() => {
    return daftarBuku.value.filter(buku => buku.sudahDibaca).length
})

</script>

<template>
    <div class="container">
        <h1>Buku Catatan</h1>
        <p>Aplikasi Pencatatan Buku Pribadi</p>

        <form class="form" @submit.prevent="tambahBuku">
            <h2>Tambah Buku</h2>
            <label for="judul-buku">Judul Buku</label>
            <input
            id="judul-buku"
            type="text"
            v-model="judul"
            placeholder="Masukkan judul buku"
            />
            <label for="kategori-buku">Kategori Buku</label>
            <select id="kategori-buku" v-model="kategori">
                <option value="Pemrograman">Pemrograman</option>
                <option value="Novel">Novel</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Sejarah">Sejarah</option>
                <option value="Lainnya">Lainnya</option>
            </select>
            <label class="checkbox">
                <input type="checkbox" v-model="sudahDibaca" />
                Sudah selesai dibaca
            </label>
            <button type="submit">Tambah Buku</button>
        </form>
        <section class="daftar">
            <h2>Daftar Buku</h2>
            <p v-if="daftarBuku.length === 0">Belum ada buku yang ditambahkan.</p>

            <div v-for="buku in daftarBuku" :key="buku.id" class="buku">
                <h3>{{ buku.judul }}</h3>
                <p>Kategori: {{ buku.kategori }}</p>
                <span v-if="buku.sudahDibaca">Status: Sudah dibaca</span>
                <span v-else>Status: Belum dibaca</span>
            </div>
        </section>
        <section class="hasil" aria-live="polite">
            <h2>Ringkasan</h2>
            <p>Jumlah Buku: {{ daftarBuku.length }}</p>
            <p>Sudah Dibaca: {{ jumlahDibaca }}</p>
        </section>
    </div>
</template>

<style scoped>

.container {
    max-width: 650px;
    margin: 30px auto;
    padding: 25px;
    font-family: Arial, sans-serif;
    color: #1e293b;
}

h1 {
    text-align: center;
    color: #1d4ed8;
}

.container > p {
    text-align: center;
    color: #64748b;
}

.form,
.daftar {
    background: white;
    padding: 20px;
    margin-top: 20px;
    border-radius: 12px;
    box-shadow: 0 3px 12px #00000015;
}

label {
    display: block;
    margin-top: 15px;
    margin-bottom: 7px;
}

input[type="text"],
select {
    width: 100%;
    padding: 12px;
    border: 1px solid #cbd5e1;
    border-radius: 7px;
    box-sizing: border-box;
}

.checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
}

button {
    width: 100%;
    padding: 12px;
    margin-top: 15px;
    border: none;
    border-radius: 7px;
    background: #1d4ed8;
    color: white;
    cursor: pointer;
}

button:hover {
    background: #1e40af;
}

.buku {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 12px;
    margin-top: 10px;
    background: #eff6ff;
    border-radius: 8px;
}

.buku h3 {
    overflow-wrap: anywhere;
}

.buku p {
    color: #64748b;
}

.buku span {
    font-size: 13px;
}

.hasil {
    margin-top: 20px;
    padding: 15px;
    background: #dbeafe;
    border-radius: 8px;
}

</style>