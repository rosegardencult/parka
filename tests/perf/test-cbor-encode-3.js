if (typeof print !== "function") {
  print = console.log;
}

function test() {
  var msg = [];
  while (msg.length < 1024) {
    msg.push(msg.length);
  }

  // print(Duktape.enc('hex', CBOR.encode(msg)));
  // 990400000102030405060708090a0b0c0d0e0f101112131415161718181819181a181b181c181d181e181f1820182118221823182418251826182718281829182a182b182c182d182e182f1830183118321833183418351836183718381839183a183b183c183d183e183f1840184118421843184418451846184718481849184a184b184c184d184e184f1850185118521853185418551856185718581859185a185b185c185d185e185f1860186118621863186418651866186718681869186a186b186c186d186e186f1870187118721873187418751876187718781879187a187b187c187d187e187f1880188118821883188418851886188718881889188a188b188c188d188e188f1890189118921893189418951896189718981899189a189b189c189d189e189f18a018a118a218a318a418a518a618a718a818a918aa18ab18ac18ad18ae18af18b018b118b218b318b418b518b618b718b818b918ba18bb18bc18bd18be18bf18c018c118c218c318c418c518c618c718c818c918ca18cb18cc18cd18ce18cf18d018d118d218d318d418d518d618d718d818d918da18db18dc18dd18de18df18e018e118e218e318e418e518e618e718e818e918ea18eb18ec18ed18ee18ef18f018f118f218f318f418f518f618f718f818f918fa18fb18fc18fd18fe18ff19010019010119010219010319010419010519010619010719010819010919010a19010b19010c19010d19010e19010f19011019011119011219011319011419011519011619011719011819011919011a19011b19011c19011d19011e19011f19012019012119012219012319012419012519012619012719012819012919012a19012b19012c19012d19012e19012f19013019013119013219013319013419013519013619013719013819013919013a19013b19013c19013d19013e19013f19014019014119014219014319014419014519014619014719014819014919014a19014b19014c19014d19014e19014f19015019015119015219015319015419015519015619015719015819015919015a19015b19015c19015d19015e19015f19016019016119016219016319016419016519016619016719016819016919016a19016b19016c19016d19016e19016f19017019017119017219017319017419017519017619017719017819017919017a19017b19017c19017d19017e19017f19018019018119018219018319018419018519018619018719018819018919018a19018b19018c19018d19018e19018f19019019019119019219019319019419019519019619019719019819019919019a19019b19019c19019d19019e19019f1901a01901a11901a21901a31901a41901a51901a61901a71901a81901a91901aa1901ab1901ac1901ad1901ae1901af1901b01901b11901b21901b31901b41901b51901b61901b71901b81901b91901ba1901bb1901bc1901bd1901be1901bf1901c01901c11901c21901c31901c41901c51901c61901c71901c81901c91901ca1901cb1901cc1901cd1901ce1901cf1901d01901d11901d21901d31901d41901d51901d61901d71901d81901d91901da1901db1901dc1901dd1901de1901df1901e01901e11901e21901e31901e41901e51901e61901e71901e81901e91901ea1901eb1901ec1901ed1901ee1901ef1901f01901f11901f21901f31901f41901f51901f61901f71901f81901f91901fa1901fb1901fc1901fd1901fe1901ff19020019020119020219020319020419020519020619020719020819020919020a19020b19020c19020d19020e19020f19021019021119021219021319021419021519021619021719021819021919021a19021b19021c19021d19021e19021f19022019022119022219022319022419022519022619022719022819022919022a19022b19022c19022d19022e19022f19023019023119023219023319023419023519023619023719023819023919023a19023b19023c19023d19023e19023f19024019024119024219024319024419024519024619024719024819024919024a19024b19024c19024d19024e19024f19025019025119025219025319025419025519025619025719025819025919025a19025b19025c19025d19025e19025f19026019026119026219026319026419026519026619026719026819026919026a19026b19026c19026d19026e19026f19027019027119027219027319027419027519027619027719027819027919027a19027b19027c19027d19027e19027f19028019028119028219028319028419028519028619028719028819028919028a19028b19028c19028d19028e19028f19029019029119029219029319029419029519029619029719029819029919029a19029b19029c19029d19029e19029f1902a01902a11902a21902a31902a41902a51902a61902a71902a81902a91902aa1902ab1902ac1902ad1902ae1902af1902b01902b11902b21902b31902b41902b51902b61902b71902b81902b91902ba1902bb1902bc1902bd1902be1902bf1902c01902c11902c21902c31902c41902c51902c61902c71902c81902c91902ca1902cb1902cc1902cd1902ce1902cf1902d01902d11902d21902d31902d41902d51902d61902d71902d81902d91902da1902db1902dc1902dd1902de1902df1902e01902e11902e21902e31902e41902e51902e61902e71902e81902e91902ea1902eb1902ec1902ed1902ee1902ef1902f01902f11902f21902f31902f41902f51902f61902f71902f81902f91902fa1902fb1902fc1902fd1902fe1902ff19030019030119030219030319030419030519030619030719030819030919030a19030b19030c19030d19030e19030f19031019031119031219031319031419031519031619031719031819031919031a19031b19031c19031d19031e19031f19032019032119032219032319032419032519032619032719032819032919032a19032b19032c19032d19032e19032f19033019033119033219033319033419033519033619033719033819033919033a19033b19033c19033d19033e19033f19034019034119034219034319034419034519034619034719034819034919034a19034b19034c19034d19034e19034f19035019035119035219035319035419035519035619035719035819035919035a19035b19035c19035d19035e19035f19036019036119036219036319036419036519036619036719036819036919036a19036b19036c19036d19036e19036f19037019037119037219037319037419037519037619037719037819037919037a19037b19037c19037d19037e19037f19038019038119038219038319038419038519038619038719038819038919038a19038b19038c19038d19038e19038f19039019039119039219039319039419039519039619039719039819039919039a19039b19039c19039d19039e19039f1903a01903a11903a21903a31903a41903a51903a61903a71903a81903a91903aa1903ab1903ac1903ad1903ae1903af1903b01903b11903b21903b31903b41903b51903b61903b71903b81903b91903ba1903bb1903bc1903bd1903be1903bf1903c01903c11903c21903c31903c41903c51903c61903c71903c81903c91903ca1903cb1903cc1903cd1903ce1903cf1903d01903d11903d21903d31903d41903d51903d61903d71903d81903d91903da1903db1903dc1903dd1903de1903df1903e01903e11903e21903e31903e41903e51903e61903e71903e81903e91903ea1903eb1903ec1903ed1903ee1903ef1903f01903f11903f21903f31903f41903f51903f61903f71903f81903f91903fa1903fb1903fc1903fd1903fe1903ff

  for (var i = 0; i < 1e4; i++) {
    void CBOR.encode(msg);
    void CBOR.encode(msg);
    void CBOR.encode(msg);
    void CBOR.encode(msg);
    void CBOR.encode(msg);
    void CBOR.encode(msg);
    void CBOR.encode(msg);
    void CBOR.encode(msg);
    void CBOR.encode(msg);
    void CBOR.encode(msg);
  }
}

try {
  test();
} catch (e) {
  print(e.stack || e);
  throw e;
}