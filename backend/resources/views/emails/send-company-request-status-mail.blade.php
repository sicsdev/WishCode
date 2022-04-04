@component('mail::message')
<h2>Dear {{ $data['name'] }}</h2>

<p>Your Company Request {{ $data['status'] }} successfully!</p>

Thanks,<br>
{{ config('app.name') }}
@endcomponent