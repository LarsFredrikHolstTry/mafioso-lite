<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BankController extends Controller {
  public function balance() {
    $user = Auth::user();
    return response()->json([
      'money' => $user->money,
      'bankmoney' => $user->bankmoney,
    ]);
  }

  public function deposit(Request $request) {
    $request->validate([
      'amount' => 'required|numeric|min:1',
    ]);

    $user = Auth::user();

    if ($user->bankmoney < $request->amount) {
      return response()->json(['message' => 'Insufficient bank funds'], 400);
    }

    $user->money += $request->amount;
    $user->bankmoney -= $request->amount;
    /** @var \App\Models\User $user */
    $user->save();

    return response()->json(['message' => 'Deposit successful', 'money' => $user->money, 'bankmoney' => $user->bankmoney]);
  }

  public function withdraw(Request $request) {
    $request->validate([
      'amount' => 'required|numeric|min:1',
    ]);

    $user = Auth::user();

    if ($user->money < $request->amount) {
      return response()->json(['message' => 'Insufficient funds'], 400);
    }

    $user->money -= $request->amount;
    $user->bankmoney += $request->amount;
    /** @var \App\Models\User $user */
    $user->save();

    return response()->json(['message' => 'Withdrawal successful', 'money' => $user->money, 'bankmoney' => $user->bankmoney]);
  }
}
