(function ($) {
  $.ajax({  // jQueryのajaxでjsonデータを取得しますね
    type: 'GET',
    url: 'https://graph.facebook.com/v17.0/17841401440715438?access_token=EAAL1cyNzjfsBOyyeZBA6sVXLztpwkGa0rPvJjkHcZCnqNpVBZCh8eI9kbdrdlMzO86BY99w79X5XxVpkEm1eQCOw6duhFQZAvzjMugDdrdeZBH1mq6XsVwx4iSX7eZAeS1l3TcSuhIt594uct4akL2yEZCbPjZBWTSXIiZCYZB4mFIsEYJppjh7GBlHNCgtZC9NrPITOAZDZD&fields=name,media.limit(50){caption,like_count,media_url,permalink,timestamp,username}',
    dataType: 'json',
    success: function (json) {
      var insta = json.media.data;
      var url_state_num = 20;
      for (var i = 0; i < url_state_num; i++) {
        // console.log("処置回数：" + i);
        let url = insta[i].media_url; // 動画ソースのURLを取得
        let href = insta[i].permalink; // リンク先URLを取得
        let caption = insta[i].caption; //　投稿のキャプションを取得
        let like = insta[i].like_count; //　いいね！数の取得
        // <p>${caption}</p>
        // <p><span>${like}</span> Likes!!</p>
        // console.log(i);
        if (url !== undefined && url.indexOf('/o1/') <= 0 && url !== "") {

          $('.insta_list').append(`
          <li>
          <a href="${href}" class="insta_contents" target="qoo_insta">
          <img src="${url}" alt="${caption}">
          </a>
          </li>
          `);
          // console.log("チェックOKのURL:" + url);

        } else {
          url_state_num = url_state_num + 1;
          // console.log("表示させないURL:" + url);
          // console.log("url_state_numの値:" + url_state_num);
        }
        //}
      }
    }
  });
})(jQuery);