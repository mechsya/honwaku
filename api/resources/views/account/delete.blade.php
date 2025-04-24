@extends('container')

@include('component.navbar', ['label' => 'Hapus Account', 'urlback' => '/account'])

@section('content')
    <div class="container-body">
        <div class="bg-red-400/10 mb-4 border-[0.5px] border-red-400 rounded-lg text-white text-sm p-4">
            Dengan menghapus akun, artinya anda menyetujui akan penghapusan semua data yang telah anda simpan selama ini,
            seperti bookmark, riwayat bacaan dll
        </div>

        <form action="{{ route('account.delete') }}" method="POST" class="flex flex-col gap-4">
            @csrf
            <input required name="email" type="text" class="input" placeholder="Email" />
            <input required name="password" type="password" class="input" placeholder="Password" />
            <textarea class="input" name="reason" placeholder="tolong tulis alasan anda menghapus akun"></textarea>

            <label class="text-white">Tolong ketik "<strong class="text-red-400">saya setuju menghapus akun</strong>" untuk
                melanjutkan</label>
            <input name="repeat-text" id="repeat-area" type="text" class="input" placeholder="ketik disini" />

            <button id="delete-button" class="button-style bg-red-400" disabled>Hapus</button>
        </form>
    </div>
    <script>
        const input = document.getElementById('repeat-area');
        const button = document.getElementById('delete-button');
        const requiredText = 'saya setuju menghapus akun';

        input.addEventListener('input', function() {
            if (input.value.trim().toLowerCase() === requiredText) {
                button.disabled = false;
            } else {
                button.disabled = true;
            }
        });
    </script>
@endsection
