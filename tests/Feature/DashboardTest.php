<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get('/crime')->assertRedirect('/login');
});

test('authenticated users can visit the crime', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get('/crime')->assertOk();
});
