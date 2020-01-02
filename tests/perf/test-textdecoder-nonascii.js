/*
 *  TextDecoder with non-ASCII input
 */

if (typeof print !== "function") {
  print = console.log;
}

function test() {
  var block = 16777216;
  var loops = 50;
  var te = new TextDecoder();
  var tmp = new Uint8Array(1024);
  var buf = new Uint8Array(block);
  var i;

  // http://generator.lorem-ipsum.info/_chinese
  var lorem_str =
    "\u6e21\u8a8d\u901f\u5f71\u8b19\u4e2d\u4e0a\u5915\u793e\u88cf\u7a4d\u63b2\u4f1a\u8868\u5ca1\u65b0\u3002\u77f3\u68cb\u6765\u9053\u7ae5\u899a\u60f3\u9762\u6b62\u610f\u6311\u9244\u8170\u7763\u65b0\u9ad8\u51fa\u3002\u767a\u672a\u81ea\u753b\u8a18\u5b58\u5c71\u7642\u501f\u56e3\u666f\u5024\u3002\u4e0e\u6d77\u5bb3\u5150\u8f09\u90fd\u65ad\u500d\u4e0b\u7684\u5317\u7df4\u3002\u5145\u5199\u753b\u6226\u6e08\u4e5d\u671f\u5408\u4eac\u8b66\u540d\u685c\u4ecb\u521d\u518d\u6620\u3002\u7b4b\u6761\u6a5f\u7e4b\u653f\u6708\u7269\u63b2\u906d\u6df7\u65ad\u4f7f\u6599\u63b2\u3002\u5e83\u6c7a\u5165\u76e3\u61f2\u5bb3\u5b9f\u4eba\u666f\u8def\u5d0e\u5e74\u5354\u6295\u3002\u5e73\u73fe\u53b3\u8eca\u60dc\u85ab\u65e5\u7981\u6c11\u4ee3\u653f\u5473\u8f2a\u9006\u6625\u3002\u5bb6\u9632\u601d\u7740\u8aac\u5ca1\u542b\u4ee3\u60c5\u6cd5\u5831\u5929\u5b89\u8ca9\u6a5f\u6700\u90fd\u3002\u8f09\u9ad8\u81ea\u96c6\u52b4\u672c\u60d1\u697d\u63f4\u6761\u65e5\u7384\u4e00\u7d42\u3002\u7cfb\u9078\u7de0\u732a\u5e73\u8ab2\u8fed\u5c0f\u984c\u52dd\u6b74\u5c4b\u3002\u63b2\u4e0e\u8ee2\u63d0\u6e21\u4e16\u79cb\u8074\u65e5\u4e16\u786c\u8ee2\u7dda\u7531\u53f0\u5fdc\u3002\u66f4\u5ba4\u5834\u8cc7\u5927\u6771\u4eba\u5b88\u8fba\u7981\u57ce\u4eba\u96ea\u8981\u69cb\u5973\u62b1\u4e8b\u88c5\u672c\u3002\u6708\u672c\u6539\u7f6e\u591c\u6319\u4e0a\u534a\u90fd\u4eba\u88dc\u6ed1\u5712\u4fd7\u7d66\u3002\u73ed\u6c0f\u8005\u77e5\u4f4f\u6d6e\u7981\u7403\u7ba1\u6cc9\u8457\u627f\u653e\u9759\u4ee5\u5199\u5929\u3002\u5fc3\u90e8\u4e2d\u4ed8\u962a\u4f5c\u6e08\u4e8b\u98db\u898f\u5fdc\u5b58\u805e\u8996\u529b\u3002\u771f\u751f\u6642\u6cbb\u77f3\u5668\u5de6\u672d\u5728\u4e88\u7a0e\u53d6\u5c02\u9762\u4ed9\u3002\u672c\u4f4f\u67f3\u4f53\u9593\u5192\u5411\u90a3\u4f38\u5ea6\u677e\u4e95\u7b54\u3002\u5143\u7d19\u8ca0\u4ed6\u8cac\u6708\u7b2c\u66f8\u65ad\u50ac\u9ad8\u884c\u6a5f\u96c6\u6b62\u653f\u7279\u76f8\u5d0e\u4eba\u3002\u520a\u5bb6\u6bce\u5185\u98a8\u7530\u516c\u82b8\u6bce\u82b8\u753a\u611b\u5b9a\u878d\u767a\u5ddd\u56fd\u5e9c\u3002\u59cb\u7d22\u8f2a\u5148\u826f\u756a\u56f3\u4f1a\u7701\u753a\u990a\u6700\u5e2f\u8005\u54e1\u8fbc\u822a\u901a\u8005\u6d3b\u3002\u6bce\u767a\u5909\u5fdc\u524d\u64ec\u4e00\u89aa\u671b\u66f4\u4f01\u6e2c\u9053\u91ce\u5c5e\u3002\u5947\u4e94\u6b4c\u58f2\u7531\u4f53\u9686\u8f09\u524d\u9ad8\u5909\u5316\u8cb8\u52e2\u810a\u5ea7\u63d0\u3002\u5148\u5229\u8868\u5730\u60f3\u8cea\u683c\u8b70\u56fd\u805e\u5099\u753a\u96a3\u3002\u5b50\u8a00\u7389\u843d\u5146\u885b\u5143\u805e\u671d\u898b\u56e3\u6d77\u6599\u7981\u7269\u8cde\u8c61\u5316\u3002\u88dc\u6c37\u56fd\u72ec\u82b8\u5275\u6240\u53ca\u65e5\u89a7\u4eac\u6d5c\u7dcf\u677e\u7d66\u7981\u3002\u5de6\u60c5\u9ad8\u59cb\u821e\u6cc1\u5965\u4f4f\u9396\u4f53\u5207\u91cd\u5915\u56f3\u8f2a\u6642\u3002\u547c\u53e4\u8868\u6176\u88c1\u822a\u679c\u5404\u9593\u5927\u53c2\u7d22\u6319\u53e3\u7d4c\u6642\u8aa0\u3002\u8005\u89e3\u8b77\u5f8c\u610f\u5168\u6751\u5965\u6226\u7d99\u7dda\u5cf6\u3002\u990a\u5e74\u70b9\u9053\u6b21\u7686\u660e\u9ad8\u6d3b\u6804\u65b0\u4f53\u3002\u80fd\u70b9\u60c5\u8ee2\u8457\u4f4f\u4e88\u6c0f\u5854\u51fa\u6a29\u9752\u6075\u6ce2\u5e03\u7523\u6708\u82f1\u5e9c\u8a66\u3002\u7642\u65b0\u5c40\u8cea\u7533\u53ca\u518d\u6700\u4ecb\u5b89\u7701\u6ede\u4e71\u7981\u8108\u6295\u3002\u5800\u6a4b\u7f8e\u72ec\u6821\u6674\u8c61\u7b2c\u6b73\u8077\u8ee2\u691c\u51ac\u3002\u4e5f\u6709\u9593\u6c0f\u5b8c\u7d19\u5404\u7d30\u6b69\u5b9a\u6559\u5357\u88c5\u540c\u3002\u610f\u8996\u8fd4\u9ad8\u66f4\u62e1\u4fdd\u7d30\u6b63\u5168\u97f3\u5199\u635c\u5104\u884c\u7528\u5951\u767b\u67a0\u3002\u9593\u5b50\u5ba3\u4e00\u5b50\u6cbb\u67fb\u6a2a\u5065\u5b89\u99c5\u5d0e\u4e8b\u76f4\u3002\u5b64\u6982\u5edf\u6d3e\u8fce\u60c5\u96e2\u7d66\u7b2c\u6e2f\u9332\u5f15\u53bb\u5fa9\u8cab\u3002\u5f35\u8a2d\u5143\u9818\u67fb\u4f7f\u6f02\u6bce\u7533\u4e0b\u8ab2\u8a18\u610f\u55b6\u7d4c\u3002\u8a18\u6804\u753a\u4e09\u8457\u4eac\u8ee2\u8cbb\u8ad6\u967a\u4e86\u5b9a\u5ddd\u897f\u3002\u56f3\u629e\u8a18\u9ad8\u7384\u8ca0\u72a0\u4e0a\u6751\u5143\u76f4\u6a39\u9769\u6a29\u6cbf\u65ad\u5e9c\u753b\u3002\u793e\u6295\u6708\u5f97\u5143\u7121\u984c\u5b50\u81e8\u533b\u63a2\u65ad\u4f5c\u80fd\u8ee2\u3002\u6cbb\u5bfe\u9023\u6700\u6e21\u8fd1\u8981\u97ff\u6975\u68cb\u9023\u8cc0\u6cd5\u8b72\u63d0\u5e2b\u672c\u9ce5\u6d6e\u524d\u3002\u5834\u554f\u4fee\u8cde\u7d4c\u9078\u8f09\u8449\u9762\u8239\u5bf8\u5199\u5c55\u4e2d\u85e4\u65b9\u3002\u6ce1\u7684\u898b\u660e\u56de\u706b\u7136\u916a\u754c\u7530\u9577\u524d\u3002\u77ed\u6d3b\u5909\u65ad\u6771\u4f01\u65cf\u6570\u5c0f\u8981\u7d4c\u7b11\u52dd\u5eab\u4eba\u5e2b\u3002\u96e8\u9762\u5f37\u5065\u4ee5\u5927\u6e08\u5e84\u4f5c\u7d75\u6bcd\u53b3\u7121\u90e8\u984c\u52a0\u3002\u5e02\u5fdc\u96e3\u9053\u6765\u6d41\u52d9\u6bce\u73b2\u8003\u6ce2\u53f0\u80da\u7121\u5b57\u9031\u672c\u65ad\u6f14\u7533\u3002\u8abf\u793a\u5065\u8107\u4e8b\u53d6\u515a\u6d77\u8a66\u82f1\u9054\u6539\u4e8b\u6c11\u53e4\u3002\u591a\u6d77\u5ea7\u4eac\u52d9\u65ad\u7a3f\u5bb6\u8352\u7687\u56e0\u84bc\u652f\u88ab\u77ed\u5883\u767d\u629e\u3002\u9078\u529b\u795e\u95a3\u590f\u6a21\u9032\u5f37\u7b11\u6797\u671d\u6d66\u5404\u68ee\u4eba\u7c4d\u65b0\u7d75\u3002\u98db\u512a\u5f8c\u76ee\u5916\u5146\u8d70\u57ce\u4ef6\u5e03\u65b0\u79d1\u904a\u5bb6\u6589\u3002\u8c61\u6545\u5343\u6642\u5ea6\u5b9f\u5b89\u7121\u6b7b\u6700\u6b62\u53ca\u4efb\u7279\u7d19\u897f\u6587\u4e07\u898b\u3002\u767b\u7f6e\u7d42\u5408\u4e16\u5f70\u5b50\u8981\u81ea\u7814\u8133\u696d\u8ddd\u5c0f\u8272\u4fe1\u67fb\u6c7a\u91d1\u5238\u3002\u6728\u5831\u4e2d\u63c3\u771f\u8449\u697d\u6c5f\u5168\u5916\u9042\u4e0d\u4f1a\u6f14\u660e\u4e45\u4ef6\u697d\u3002\u4eca\u7406\u614b\u5927\u5b89\u4ee3\u4e26\u962a\u5b9a\u5fa9\u5199\u5165\u8584\u5208\u5f97\u9020\u51fa\u3002\u970a\u8cbb\u4f1a\u8b19\u6848\u5ea6\u4f59\u5e38\u9678\u753a\u6027\u82b8\u4f9b\u56f3\u8a18\u6bd4\u8cfc\u6708\u4eca\u8fbc\u3002\u8cdb\u8005\u69cb\u79cb\u822c\u5dde\u7d9a\u5834\u5168\u7248\u672c\u898b\u6708\u4e8b\u6587\u8a2a\u4eba\u4e00\u5468\u60a9\u3002\u6d3b\u677e\u78ba\u6975\u78ba\u98db\u5bb9\u7acb\u66f4\u5272\u6280\u5b50\u9580\u754c\u5916\u3002\u8ca0\u5de5\u793e\u9752\u56fd\u52aa\u63b2\u5eab\u4ee3\u7af6\u7b2c\u4ef6\u80fd\u54e1\u65e8\u6708\u9078\u3002\u7a4f\u56f3\u7d9a\u4e95\u7d4c\u52d5\u6f14\u6a29\u6d6a\u90e8\u5165\u99c5\u6642\u3002\u8abf\u56fd\u70b9\u985e\u56fd\u68a8\u6b62\u90fd\u5177\u7d04\u5c40\u5f15\u8f09\u7d30\u89e3\u3002\u5e02\u5468\u682a\u56e0\u6319\u80fd\u671d\u5728\u9858\u5411\u7acb\u9665\u6311\u679c\u3002\u79c1\u6e08\u78ba\u653e\u798f\u6c34\u6cc1\u6c5f\u6b3a\u8a18\u6cb9\u90e8\u8ad6\u5143\u7f6e\u3002\u6d41\u89e3\u524d\u8349\u5e2d\u52dd\u683c\u5b98\u5fc3\u63a8\u4f5c\u82b1\u6751\u3002\u5f79\u55b6\u69d8\u8846\u515a\u898b\u81f4\u6539\u6d77\u8cc0\u5a01\u7981\u75c5\u767e\u5bb6\u6c7a\u5fc5\u5b9a\u7126\u5973\u3002\u8aac\u753b\u5965\u6587\u754c\u6f14\u96d1\u9996\u5831\u6cc1\u65e5\u652f\u901a\u91cd\u3002\u5185\u6d3b\u6cd5\u7a17\u6d3b\u8db3\u4f50\u66f4\u7d9a\u53f0\u5143\u7d42\u3002\u571f\u7dcf\u5c06\u696d\u6e21\u8f09\u5168\u66f4\u4e95\u7f6e\u95d8\u5bfe\u9ad8\u6c7a\u5b58\u902e\u5e9c\u6b69\u3002\u666f\u9580\u63b2\u6c0f\u990a\u6587\u611f\u5f62\u4eac\u5178\u8ca0\u8005\u56f3\u3002\u516c\u7834\u89a7\u4f7f\u6279\u6a29\u5c5e\u5bb6\u5eb7\u884c\u9858\u5909\u52b4\u753a\u63b2\u5199\u907a\u53d6\u6e7f\u697d\u3002\u81e8\u56e3\u4ee5\u8457\u91cd\u4e00\u65bd\u4fe1\u6751\u55b6\u5d0e\u697d\u3002\u5929\u967d\u5e02\u5e55\u5bb3\u6848\u65bd\u6821\u81ea\u4f1d\u76f4\u4e88\u5100\u52a0\u5012\u3002\u5b66\u671d\u97d3\u540c\u518d\u98a8\u5b63\u85e4\u5929\u5e74\u6c11\u6b04\u6587\u7d9a\u77f3\u6c96\u5e74\u9032\u9078\u3002\u898b\u65b9\u99c5\u6790\u5c11\u7d4c\u98a8\u65e5\u9020\u646f\u5b50\u96f2\u90e1\u4e09\u5909\u5148\u99ac\u533b\u3002\u5929\u4e21\u958b\u4f5c\u6271\u90a6\u5224\u4f5c\u9762\u7684\u63db\u753b\u9332\u4e2d\u4eac\u5238\u5b50\u3002\u5e9c\u6307\u672c\u7403\u76d7\u5e97\u4ed8\u65ad\u4ee3\u540d\u7ae0\u6cbb\u3002\u54e1\u5916\u5834\u5de5\u5b50\u6d3b\u5b99\u56de\u66ae\u98df\u5eb7\u901a\u7d99\u9078\u548c\u66ae\u6d77\u9020\u3002\u7d71\u5b89\u6728\u65b9\u5074\u4fe1\u7d30\u8868\u8a71\u65e5\u65ad\u65b0\u66f8\u69d8\u5fa1\u6765\u3002\u6d1b\u805e\u62b1\u611b\u524d\u5bfe\u7a3f\u5c5e\u4efb\u683c\u533b\u52dd\u4f5c\u5916\u3002\u60c5\u4e5d\u7740\u624b\u5eab\u98db\u90ce\u691c\u4fee\u5730\u770c\u4f8b\u4f5c\u6539\u7684\u8aac\u3002\u8868\u5146\u5c5e\u5b9f\u6e7e\u63b2\u7d39\u67fb\u5973\u6f14\u5ea6\u4e8b\u56f2\u3002\u5426\u969b\u7f6a\u77e5\u65cf\u4eac\u805e\u5cf6\u50be\u96a0\u65e7\u5e74\u5dde\u6a29\u5b89\u6238\u65ad\u63a1\u3002\u7a3f\u968a\u8868\u5834\u4e3b\u4ed8\u58eb\u56f0\u53ce\u5321\u901a\u7325\u9632\u7834\u91d1\u5316\u5f8c\u3002\u6301\u5e2f\u9589\u671f\u7d9a\u6620\u520a\u4f4d\u5264\u7d39\u4f53\u7248\u5c71\u3002\u5146\u505c\u4e8b\u66f4\u6307\u5c31\u63b2\u9928\u7406\u76ca\u60c5\u967a\u4e8b\u5410\u7761\u3002\u89a7\u6599\u8868\u8ca1\u7af9\u540d\u6a21\u6750\u4ea1\u95d8\u793e\u6240\u5b50\u6599\u3002\u6d77\u8fba\u6c7a\u624b\u6210\u8d85\u5916\u8f09\u9854\u6a19\u9f62\u7d9a\u975e\u3002\u90e8\u9593\u6765\u578b\u60c5\u9023\u6708\u82b8\u5e7c\u8a73\u8fbb\u601d\u3002\u592b\u66f4\u54e1\u4eba\u80fd\u5927\u4e95\u5909\u805e\u9f62\u67fb\u888b\u6bce\u5175\u5730\u9ce9\u3002\u6ce8\u7279\u8a66\u63db\u5186\u4e00\u8868\u8a2a\u97ff\u5ef6\u5b85\u8aac\u6a29\u767d\u5f53\u3002\u6295\u653e\u4ea4\u65c5\u541b\u8a71\u96e2\u52c7\u8449\u5207\u6b8b\u5834\u3002\u8061\u691c\u534a\u8a31\u5831\u9a13\u795e\u6355\u6226\u7d9a\u7d19\u6c7a\u4e09\u8efd\u95a2\u4ead\u6771\u76ca\u3002";
  var lorem = new TextEncoder().encode(lorem_str);

  for (i = 0; i < tmp.length; i++) {
    tmp[i] = lorem[i % lorem.length];
  }
  //print(Duktape.enc('jx', tmp));
  for (i = 0; i < buf.length; i += 1024) {
    buf.set(tmp, i);
  }

  var t1 = Date.now();

  for (i = 0; i < loops; i++) {
    void te.decode(buf);
  }

  var t2 = Date.now();

  print((block * loops) / (t2 - t1) + " bytes / millisecond");
}

try {
  test();
} catch (e) {
  print(e.stack || e);
  throw e;
}
