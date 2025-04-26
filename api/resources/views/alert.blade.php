@if (session('success'))
    <div class="bg-green-400/10 mb-4 border-[0.5px] border-green-400 rounded-lg text-white text-sm p-4">
        {{ session('success') }}
    </div>
@endif

@if (session('error'))
    <div class="bg-red-400/10 mb-4 border-[0.5px] border-red-400 rounded-lg text-white text-sm p-4">
        {{ session('error') }}
    </div>
@endif
