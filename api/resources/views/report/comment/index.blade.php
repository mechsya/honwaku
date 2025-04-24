@extends('container')

@include('component.navbar', ['label' => 'Pusat Laporan'])

@section('content')
    <section class="p-4 lg:w-[50%] w-full m-auto">
        <form method="POST"
            action="{{ route('report.comment.post', ['reporter' => request()->get('reporter'), 'comment' => request()->get('comment')]) }}">
            @csrf
            <select name="reason" class="input">
                <option value="rasis">Rasis</option>
                <option value="toxic">Toxic</option>
                <option value="spam">Spam</option>
            </select>

            <button class="w-full mt-6 m-auto p-4 rounded-lg bg-primary text-white font-roboto">
                Laporkan
            </button>
        </form>
    </section>
@endsection
