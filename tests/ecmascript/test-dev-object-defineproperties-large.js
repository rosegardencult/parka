/*
 *  Large Object.defineProperties() call.
 */

/*===
key0,key1,key2,key3,key4,key5,key6,key7,key8,key9,key10,key11,key12,key13,key14,key15,key16,key17,key18,key19,key20,key21,key22,key23,key24,key25,key26,key27,key28,key29,key30,key31,key32,key33,key34,key35,key36,key37,key38,key39,key40,key41,key42,key43,key44,key45,key46,key47,key48,key49,key50,key51,key52,key53,key54,key55,key56,key57,key58,key59,key60,key61,key62,key63,key64,key65,key66,key67,key68,key69,key70,key71,key72,key73,key74,key75,key76,key77,key78,key79,key80,key81,key82,key83,key84,key85,key86,key87,key88,key89,key90,key91,key92,key93,key94,key95,key96,key97,key98,key99,key100,key101,key102,key103,key104,key105,key106,key107,key108,key109,key110,key111,key112,key113,key114,key115,key116,key117,key118,key119,key120,key121,key122,key123,key124,key125,key126,key127,key128,key129,key130,key131,key132,key133,key134,key135,key136,key137,key138,key139,key140,key141,key142,key143,key144,key145,key146,key147,key148,key149,key150,key151,key152,key153,key154,key155,key156,key157,key158,key159,key160,key161,key162,key163,key164,key165,key166,key167,key168,key169,key170,key171,key172,key173,key174,key175,key176,key177,key178,key179,key180,key181,key182,key183,key184,key185,key186,key187,key188,key189,key190,key191,key192,key193,key194,key195,key196,key197,key198,key199,key200,key201,key202,key203,key204,key205,key206,key207,key208,key209,key210,key211,key212,key213,key214,key215,key216,key217,key218,key219,key220,key221,key222,key223,key224,key225,key226,key227,key228,key229,key230,key231,key232,key233,key234,key235,key236,key237,key238,key239,key240,key241,key242,key243,key244,key245,key246,key247,key248,key249,key250,key251,key252,key253,key254,key255,key256,key257,key258,key259,key260,key261,key262,key263,key264,key265,key266,key267,key268,key269,key270,key271,key272,key273,key274,key275,key276,key277,key278,key279,key280,key281,key282,key283,key284,key285,key286,key287,key288,key289,key290,key291,key292,key293,key294,key295,key296,key297,key298,key299,key300,key301,key302,key303,key304,key305,key306,key307,key308,key309,key310,key311,key312,key313,key314,key315,key316,key317,key318,key319,key320,key321,key322,key323,key324,key325,key326,key327,key328,key329,key330,key331,key332,key333,key334,key335,key336,key337,key338,key339,key340,key341,key342,key343,key344,key345,key346,key347,key348,key349,key350,key351,key352,key353,key354,key355,key356,key357,key358,key359,key360,key361,key362,key363,key364,key365,key366,key367,key368,key369,key370,key371,key372,key373,key374,key375,key376,key377,key378,key379,key380,key381,key382,key383,key384,key385,key386,key387,key388,key389,key390,key391,key392,key393,key394,key395,key396,key397,key398,key399,key400,key401,key402,key403,key404,key405,key406,key407,key408,key409,key410,key411,key412,key413,key414,key415,key416,key417,key418,key419,key420,key421,key422,key423,key424,key425,key426,key427,key428,key429,key430,key431,key432,key433,key434,key435,key436,key437,key438,key439,key440,key441,key442,key443,key444,key445,key446,key447,key448,key449,key450,key451,key452,key453,key454,key455,key456,key457,key458,key459,key460,key461,key462,key463,key464,key465,key466,key467,key468,key469,key470,key471,key472,key473,key474,key475,key476,key477,key478,key479,key480,key481,key482,key483,key484,key485,key486,key487,key488,key489,key490,key491,key492,key493,key494,key495,key496,key497,key498,key499,key500,key501,key502,key503,key504,key505,key506,key507,key508,key509,key510,key511,key512,key513,key514,key515,key516,key517,key518,key519,key520,key521,key522,key523,key524,key525,key526,key527,key528,key529,key530,key531,key532,key533,key534,key535,key536,key537,key538,key539,key540,key541,key542,key543,key544,key545,key546,key547,key548,key549,key550,key551,key552,key553,key554,key555,key556,key557,key558,key559,key560,key561,key562,key563,key564,key565,key566,key567,key568,key569,key570,key571,key572,key573,key574,key575,key576,key577,key578,key579,key580,key581,key582,key583,key584,key585,key586,key587,key588,key589,key590,key591,key592,key593,key594,key595,key596,key597,key598,key599,key600,key601,key602,key603,key604,key605,key606,key607,key608,key609,key610,key611,key612,key613,key614,key615,key616,key617,key618,key619,key620,key621,key622,key623,key624,key625,key626,key627,key628,key629,key630,key631,key632,key633,key634,key635,key636,key637,key638,key639,key640,key641,key642,key643,key644,key645,key646,key647,key648,key649,key650,key651,key652,key653,key654,key655,key656,key657,key658,key659,key660,key661,key662,key663,key664,key665,key666,key667,key668,key669,key670,key671,key672,key673,key674,key675,key676,key677,key678,key679,key680,key681,key682,key683,key684,key685,key686,key687,key688,key689,key690,key691,key692,key693,key694,key695,key696,key697,key698,key699,key700,key701,key702,key703,key704,key705,key706,key707,key708,key709,key710,key711,key712,key713,key714,key715,key716,key717,key718,key719,key720,key721,key722,key723,key724,key725,key726,key727,key728,key729,key730,key731,key732,key733,key734,key735,key736,key737,key738,key739,key740,key741,key742,key743,key744,key745,key746,key747,key748,key749,key750,key751,key752,key753,key754,key755,key756,key757,key758,key759,key760,key761,key762,key763,key764,key765,key766,key767,key768,key769,key770,key771,key772,key773,key774,key775,key776,key777,key778,key779,key780,key781,key782,key783,key784,key785,key786,key787,key788,key789,key790,key791,key792,key793,key794,key795,key796,key797,key798,key799,key800,key801,key802,key803,key804,key805,key806,key807,key808,key809,key810,key811,key812,key813,key814,key815,key816,key817,key818,key819,key820,key821,key822,key823,key824,key825,key826,key827,key828,key829,key830,key831,key832,key833,key834,key835,key836,key837,key838,key839,key840,key841,key842,key843,key844,key845,key846,key847,key848,key849,key850,key851,key852,key853,key854,key855,key856,key857,key858,key859,key860,key861,key862,key863,key864,key865,key866,key867,key868,key869,key870,key871,key872,key873,key874,key875,key876,key877,key878,key879,key880,key881,key882,key883,key884,key885,key886,key887,key888,key889,key890,key891,key892,key893,key894,key895,key896,key897,key898,key899,key900,key901,key902,key903,key904,key905,key906,key907,key908,key909,key910,key911,key912,key913,key914,key915,key916,key917,key918,key919,key920,key921,key922,key923,key924,key925,key926,key927,key928,key929,key930,key931,key932,key933,key934,key935,key936,key937,key938,key939,key940,key941,key942,key943,key944,key945,key946,key947,key948,key949,key950,key951,key952,key953,key954,key955,key956,key957,key958,key959,key960,key961,key962,key963,key964,key965,key966,key967,key968,key969,key970,key971,key972,key973,key974,key975,key976,key977,key978,key979,key980,key981,key982,key983,key984,key985,key986,key987,key988,key989,key990,key991,key992,key993,key994,key995,key996,key997,key998,key999
===*/

function buildExpression(n) {
  var res = [];
  var i;

  res.push("var obj = {};");
  res.push("Object.defineProperties(obj, {");
  for (i = 0; i < n; i++) {
    res.push(
      "    key" +
        i +
        ": { value: " +
        i +
        ", writable: true, enumerable: true, configurable: true },"
    );
  }
  res.push("});");
  res.push("print(Object.keys(obj));");
  return res.join("\n");
}

function test() {
  var code = buildExpression(1000);
  eval(code);
}

try {
  test();
} catch (e) {
  print(e);
}