@component('mail::message')
<h2>Dear {{ $data['name'] }}</h2>

<p>Your account is Successfully created. Please find you login details below: </p>
<p>{{ $data['email'] }}</p>
<p>{{ $data['password'] }}</p>

<!-- @component('mail::button', ['url' => ''])
Button Text
@endcomponent -->

Thanks,<br>
{{ config('app.name') }}
@endcomponent
