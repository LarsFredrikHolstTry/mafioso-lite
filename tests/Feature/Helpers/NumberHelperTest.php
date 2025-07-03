<?php

use App\Helpers\NumberHelper;

test('NumberHelper formats numbers correctly', function () {
  $formatted = NumberHelper::format(1000);
  expect($formatted)->toBe('1 000');

  $formatted = NumberHelper::format(1234567);
  expect($formatted)->toBe('1 234 567');

  $formatted = NumberHelper::format(0);
  expect($formatted)->toBe('0');
});
