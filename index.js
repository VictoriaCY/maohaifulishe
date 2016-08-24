   ;
   (function () {
       //渲染热门城市
       $.ajax({
           url: "data.json",
           type: "GET",
           dataType: "json",
           success: function (data) {
               dats = data.data;
               load(dats);
           }
       })

       function load(dats) {
           //console.log(dats);
           //渲染热门城市
           var str1 = "";
           $.each(dats.hotcitylist, function (key, value) {
               str1 += "<span>" + value.name + "</span>";
           });
           $(".hotcity").html(str1);

           //渲染导航条和城市列表
           var str2 = "";
           var str3 = "";
           $.each(dats.citylist, function (key, value) {
               //console.log(key)
               str2 += "<h2>" + key + "</h2>";
               str3 += "<span>" + key + "</span>";
               $.each(value, function (key, value) {
                   $.each(value, function (key, value) {
                       str2 += "<ul><li>" + value.name + "</li></ul>";
                   });
               });
           });
           $(".city").html(str2);
           $(".nav").html(str3);
           //点击改变滚动条
           $(".nav").on("tap", "span", function () {
               var tes1 = $(this).html(),
                   tes2 = $(".city>h2");//.city下的h2
              console.log(tes2)
               $.each(tes2, function () {
                   if ($(this).text() == tes1) {
                       var i = $(this).offset().top;
                       console.log(i);
                       window.scroll(0, i);
                   }
               })
           });
           $(".tes").on("keyup", function () {
               $(".hotcity").hide();
               $(".city").hide();
               $(".nav").hide();
               $(".chaxun").show();
               var val1 = $(this).val().toUpperCase();
               var val2 = $(this).val();
               var strs = "";
              //console.log(val1);
               //console.log(val2);

               $.each(dats.citylist, function (k1, v1) {
                   //console.log(v1)
                   $.each(v1, function (k2, v2) {
                       //console.log(v2)
                       $.each(v2, function (k3, v3) {
                           console.log(v3);
                           if (val1.length == 1) {
                               if (v3.letter.indexOf(val1) >= 0 || v3.name.indexOf(val1) >= 0) {
                                   strs += "<p>" + v3.name + "</p>";
                                   //console.log(1)
                               }
                           } else {
                               if (v3.pinyin.indexOf(val2) >= 0 || v3.first_letters.indexOf(val2.toUpperCase()) >= 0 || v3.name.indexOf(val2) >= 0) {
                                   strs += "<p>" + v3.name + "</p>";
                               }
                           }
                       })
                   })
               })
               if (val1.length == 0 || val2.length == 0) {
                   strs = "";
               }
               $(".chaxun").html(strs);
           })
       }
   })(Zepto);