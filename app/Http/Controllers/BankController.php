<?php

namespace App\Http\Controllers;

use App\Helpers\NumberHelper;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BankController extends Controller {
  public function balance() {
    $user = Auth::user();

    return response()->json([
      'money' => NumberHelper::format($user->money),
      'bankmoney' => NumberHelper::format($user->bankmoney),
    ]);
  }

  public function deposit(Request $request) {
    $request->validate([
      'amount' => 'required|numeric|min:1',
    ]);

    $user = Auth::user();

    if ($user->money < $request->amount) {
      return response()->json([
        'message' => 'Du kan ikke sette inn mer enn du har på hånden',
        'error' => 'Du kan ikke sette inn mer enn du har på hånden'
      ]);
    }

    $user->money -= $request->amount;
    $user->bankmoney += $request->amount;
    /** @var \App\Models\User $user */
    $user->save();

    return response()->json([
      'message' => 'Du satt inn ' . NumberHelper::format($request->amount) . ',-',
      'money' => $user->money,
      'bankmoney' => $user->bankmoney
    ]);
  }

  public function withdraw(Request $request) {
    $request->validate([
      'amount' => 'required|numeric|min:1',
    ]);

    $user = Auth::user();

    if ($user->bankmoney < $request->amount) {
      return response()->json([
        'message' => 'Du kan ikke sette inn mer enn du har på hånden',
        'error' => 'Du kan ikke ta ut mer enn du har på hånden'
      ]);
    }

    $user->money += $request->amount;
    $user->bankmoney -= $request->amount;
    /** @var \App\Models\User $user */
    $user->save();

    return response()->json([
      'message' => 'Du tok ut ' . NumberHelper::format($request->amount) . ',-',
      'money' => $user->money,
      'bankmoney' => $user->bankmoney
    ]);
  }
}
