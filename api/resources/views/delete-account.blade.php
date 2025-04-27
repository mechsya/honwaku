@extends('container')

@section('content')
    @include('component.navbar', ['label' => 'Penghapusan Akun', 'urlback' => '/'])
    <div class="container-body font-roboto text-white">
        <h1>Cara menghapus account – Honwaku</h1>
        <p><em>Terakhir diperbarui: 27 April 2025</em></p>
        &nbsp;
        <ol class="list-decimal">
            <li>1. <strong>Masuk ke akun Anda:</strong> Pastikan Anda sudah login ke dalam aplikasi Honwaku.</li>
            <li>2. <strong>Buka Profil:</strong> Masuk ke halaman profil Anda dan cari opsi <strong>Hapus Akun</strong>.
            </li>
            <li>3. <strong>Klik Opsi Hapus Akun:</strong> Setelah memilih <strong>Hapus Akun</strong>, sebuah popup akan
                muncul
                untuk meminta alasan penghapusan akun.</li>
            <li>4. <strong>Isi Alasan Penghapusan:</strong> Masukkan alasan penghapusan akun dan klik konfirmasi.</li>
            <li>5. <strong>Proses Penghapusan:</strong> Setelah permintaan Anda diproses, Anda akan melihat pemberitahuan
                bahwa
                penghapusan akun Anda sedang dalam proses.</li>
            <li>6. <strong>Tunggu Konfirmasi:</strong> Harap tunggu hingga permintaan Anda diproses oleh admin.</li>
        </ol>
    </div>
@endsection
