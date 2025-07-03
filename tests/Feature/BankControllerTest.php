<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('returns the correct balance', function () {
  $user = User::factory()->create(['money' => 1000, 'bankmoney' => 500]);
  $this->actingAs($user)
    ->getJson('/api/user/balance')
    ->assertOk()
    ->assertJson([
      'money' => '1 000',
      'bankmoney' => '500',
    ]);
});

test('can deposit money from bank to wallet', function () {
  $user = User::factory()->create(['money' => 100, 'bankmoney' => 200]);
  $this->actingAs($user)
    ->postJson('/api/user/deposit', ['amount' => 50])
    ->assertOk()
    ->assertJson([
      'money' => 150,
      'bankmoney' => 150,
    ]);
});

test('cannot deposit more than bankmoney', function () {
  $user = User::factory()->create(['money' => 100, 'bankmoney' => 20]);
  $this->actingAs($user)
    ->postJson('/api/user/deposit', ['amount' => 50])
    ->assertJsonFragment(['error' => 'Insufficient bank funds']);
});

test('can withdraw money from wallet to bank', function () {
  $user = User::factory()->create(['money' => 200, 'bankmoney' => 100]);
  $this->actingAs($user)
    ->postJson('/api/user/withdraw', ['amount' => 50])
    ->assertOk()
    ->assertJson([
      'money' => 150,
      'bankmoney' => 150,
    ]);
});

test('cannot withdraw more than money', function () {
  $user = User::factory()->create(['money' => 10, 'bankmoney' => 100]);
  $this->actingAs($user)
    ->postJson('/api/user/withdraw', ['amount' => 50])
    ->assertJsonFragment(['error' => 'Insufficient funds']);
});
