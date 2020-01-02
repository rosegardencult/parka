/*
 *  Current CBOR decode fastint behavior.
 */

/*===
- top level integer
17 fastint
255 fastint
4275878552 fastint
4294967295 fastint
4294967295 fastint
4294967296 fastint
139486488458836 fastint
140737488355327 fastint
140737488355328
141685511714388
-18 fastint
-256 fastint
-2147483648 fastint
-2147483649 fastint
-4275878553 fastint
-139486488458837 fastint
-140737488355328 fastint
-2147483648 fastint
-2147483649 fastint
-140737488355329
-141685511714389
- array wrapped integer
17 fastint
255 fastint
4275878552 fastint
4294967295 fastint
4294967295
4294967296
139486488458836
140737488355327
140737488355328
141685511714388
-18 fastint
-256 fastint
-2147483648 fastint
-2147483649
-4275878553
-2147483648
-2147483649
-140737488355329
-141685511714389
- integer-compatible double
17 fastint
17
- integer-compatible float
123 fastint
123
- integer-compatible half-float
123 fastint
123
===*/

function test() {
  var inp, dec;

  function t(arr) {
    var dec = CBOR.decode(new Uint8Array(arr));
    var t = Array.isArray(dec) ? dec[0] : dec;
    var info_t = Duktape.info(t);
    var info_double = Duktape.info(123.4);
    if (info_t.itag === info_double.itag) {
      print(t);
    } else {
      print(t, "fastint");
    }
    //print(Duktape.enc('jx', Duktape.info(t)));
  }

  // If top level value is an integer, it gets coerced into a fastint
  // because of return value fastint check for CBOR.decode() itself.
  // This applies to the entire fastint range.
  print("- top level integer");
  t([0x11]);
  t([0x18, 0xff]);
  t([0x1a, 0xfe, 0xdc, 0xba, 0x98]);
  t([0x1a, 0xff, 0xff, 0xff, 0xff]);
  t([0x1b, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff]);
  t([0x1b, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00]);
  t([0x1b, 0x00, 0x00, 0x7e, 0xdc, 0xba, 0x98, 0x76, 0x54]);
  t([0x1b, 0x00, 0x00, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xff]);
  t([0x1b, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00]); // no longer in fastint range
  t([0x1b, 0x00, 0x00, 0x80, 0xdc, 0xba, 0x98, 0x76, 0x54]); // no longer in fastint range
  t([0x31]);
  t([0x38, 0xff]);
  t([0x3a, 0x7f, 0xff, 0xff, 0xff]);
  t([0x3a, 0x80, 0x00, 0x00, 0x00]);
  t([0x3a, 0xfe, 0xdc, 0xba, 0x98]);
  t([0x3b, 0x00, 0x00, 0x7e, 0xdc, 0xba, 0x98, 0x76, 0x54]);
  t([0x3b, 0x00, 0x00, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xff]);
  t([0x3b, 0x00, 0x00, 0x00, 0x00, 0x7f, 0xff, 0xff, 0xff]);
  t([0x3b, 0x00, 0x00, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00]);
  t([0x3b, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00]); // no longer in fastint range
  t([0x3b, 0x00, 0x00, 0x80, 0xdc, 0xba, 0x98, 0x76, 0x54]); // no longer in fastint range

  // An integer deeper inside a structure won't get automatic return
  // value fastint check, so it is up to the CBOR binding to ensure
  // fastints are used (e.g. use duk_push_int() rather than
  // duk_push_number() where applicable).
  //
  // At present fastints are used for [-0x80000000,0xffffffff] when
  // they are encoded in shortest form (this is likely to change).
  print("- array wrapped integer");
  t([0x81, 0x11]);
  t([0x81, 0x18, 0xff]);
  t([0x81, 0x1a, 0xfe, 0xdc, 0xba, 0x98]);
  t([0x81, 0x1a, 0xff, 0xff, 0xff, 0xff]);
  t([0x81, 0x1b, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff]); // in range, non-shortest encoding
  t([0x81, 0x1b, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00]); // no longer in 32-bit range
  t([0x81, 0x1b, 0x00, 0x00, 0x7e, 0xdc, 0xba, 0x98, 0x76, 0x54]);
  t([0x81, 0x1b, 0x00, 0x00, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xff]);
  t([0x81, 0x1b, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00]); // no longer in fastint range
  t([0x81, 0x1b, 0x00, 0x00, 0x80, 0xdc, 0xba, 0x98, 0x76, 0x54]); // no longer in fastint range
  t([0x81, 0x31]);
  t([0x81, 0x38, 0xff]);
  t([0x81, 0x3a, 0x7f, 0xff, 0xff, 0xff]);
  t([0x81, 0x3a, 0x80, 0x00, 0x00, 0x00]);
  t([0x81, 0x3a, 0xfe, 0xdc, 0xba, 0x98]);
  t([0x81, 0x3b, 0x00, 0x00, 0x00, 0x00, 0x7f, 0xff, 0xff, 0xff]); // in range, non-shortest encoding
  t([0x81, 0x3b, 0x00, 0x00, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00]); // no longer in 32-bit range
  t([0x81, 0x3b, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00]);
  t([0x81, 0x3b, 0x00, 0x00, 0x80, 0xdc, 0xba, 0x98, 0x76, 0x54]);

  // Integer-compatible double.
  //
  // At present no fastint check (except for top level value).
  //
  // >>> cbor.dumps(17.0).encode('hex')
  // 'fb4031000000000000'
  print("- integer-compatible double");
  t([0xfb, 0x40, 0x31, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
  t([0x81, 0xfb, 0x40, 0x31, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

  // Integer-compatible float or half-float.
  //
  // At present no fastint check (except for top level value).
  print("- integer-compatible float");
  t([0xfa, 0x42, 0xf6, 0x00, 0x00]); // 123 as float
  t([0x81, 0xfa, 0x42, 0xf6, 0x00, 0x00]);
  print("- integer-compatible half-float");
  t([0xf9, 0x57, 0xb0]); // 123 as half-float
  t([0x81, 0xf9, 0x57, 0xb0]);
}

try {
  test();
} catch (e) {
  print(e.stack || e);
}
