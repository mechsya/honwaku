@extends('container')

@section('content')
    <div class="flex-1">
        <nav class="w-full h-16 border-black/10 border-b-[0.5px] flex items-center px-4">
            <section class="lg:w-[80%] w-full m-auto flex items-center">
                <p class="flex font-roboto items-center gap-4 flex-1">
                    Report
                </p>
                <div class="flex-1 justify-end flex">
                    <img src="{{ asset('images/download.webp') }}" class="h-16" />
                </div>
            </section>
        </nav>


        <section class="p-4 lg:w-[80%] w-full m-auto">
            @if (session('success'))
                <div class="bg-green-400/10 mb-4 border-[0.5px] border-green-400 rounded-lg text-green-500 p-4">
                    {{ session('success') }}
                </div>
            @endif

            @if (session('error'))
                <div class="bg-red-400/10 mb-4 border-[0.5px] border-red-400 rounded-lg text-red-500 p-4">
                    {{ session('error') }}
                </div>
            @endif

            <form method="POST"
                action="{{ route('report.post', ['user' => request()->get('user'), 'comment' => request()->get('comment')]) }}">
                @csrf
                <select name="type" class="w-full border-black/10 border-[0.5px] p-4 rounded-lg outline-primary">
                    <option value="rasis">Rasis</option>
                    <option value="toxic">Toxic</option>
                    <option value="toxic">Spam</option>
                </select>

                <button class="w-full mt-6 m-auto p-4 rounded-lg bg-primary text-white font-roboto">
                    Laporkan
                </button>
            </form>
        </section>
    </div>
@endsection
