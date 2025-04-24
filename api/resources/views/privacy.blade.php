@extends('container')

@section('content')
    @include('component.navbar', ['label' => 'Kebijakan Privasi', 'urlback' => '/'])
    <div class="container-body font-roboto text-black">
        <h1>Kebijakan Privasi – Honwaku</h1>
        <p><em>Terakhir diperbarui: 24 April 2025</em></p>
        &nbsp;
        <h2>1. Pendahuluan</h2>
        <p>Kami di <strong>Honwaku</strong> menghargai dan melindungi privasi Anda. Kebijakan ini menjelaskan
            bagaimana kami mengelola data yang dikumpulkan melalui aplikasi kami.</p>
        &nbsp;

        <h2>2. Data yang Kami Kumpulkan</h2>
        <p>Aplikasi ini <strong>tidak mengumpulkan data pribadi yang sensitif</strong> seperti nama lengkap, alamat, nomor
            telepon, atau data biometrik.</p>
        <p>Namun, untuk meningkatkan pengalaman pengguna, kami mungkin menyimpan informasi berikut:</p>
        <ul>
            <li>Pengaturan aplikasi, seperti ukuran font, tema tampilan, dan bahasa pilihan.</li>
            <li>Data penggunaan anonim, seperti halaman yang paling sering dibaca (jika diaktifkan).</li>
        </ul>
        &nbsp;

        <h2>3. Cara Kami Menggunakan Data</h2>
        <p>Data yang kami kumpulkan digunakan hanya untuk:</p>
        <ul>
            <li>Menyimpan preferensi pengguna di dalam aplikasi</li>
            <li>Meningkatkan kualitas layanan dan fitur</li>
        </ul>
        <p>Kami <strong>tidak menjual atau membagikan data pengguna kepada pihak ketiga</strong>.</p>
        &nbsp;

        <h2>4. Konten Aplikasi</h2>
        <p>Kami berkomitmen untuk menyediakan konten yang:</p>
        <ul>
            <li>Bersih dan layak untuk segala usia</li>
            <li>Tidak mengandung unsur pornografi, kekerasan ekstrem, atau ujaran kebencian</li>
        </ul>
        <p>Jika Anda menemukan konten yang tidak sesuai, silakan hubungi kami untuk tindakan lebih lanjut.</p>
        &nbsp;

        <h2>5. Hak Pengguna</h2>
        <p>Anda berhak untuk:</p>
        <ul>
            <li>Mengetahui data apa yang disimpan (jika ada)</li>
            <li>Meminta penghapusan data lokal di perangkat Anda</li>
            <li>Menghubungi kami untuk pertanyaan privasi</li>
        </ul>
        &nbsp;

        <h2>6. Keamanan</h2>
        <p>Kami mengambil langkah-langkah teknis dan organisasi untuk melindungi data Anda. Namun, tidak ada sistem yang
            sepenuhnya aman.</p>
        &nbsp;

        <h2>7. Perubahan Kebijakan</h2>
        <p>Kami dapat memperbarui kebijakan ini dari waktu ke waktu. Perubahan akan diberitahukan melalui pembaruan
            aplikasi.</p>
        &nbsp;

        <h2>8. Kontak Kami</h2>
        <p>Jika Anda memiliki pertanyaan tentang kebijakan ini, silakan hubungi:</p>
        <p><strong>Email:</strong> <a href="mailto:[email kamu]">alinia.meysa@gmail.com</a></p>
    </div>
@endsection
