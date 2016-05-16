document.addEventListener("DOMContentLoaded", function(event){

$('#submit-btn').on('keypress click', function(e) {
var artist = $('#artist-search').val();
var song = $('#song-search').val();
if (artist === ''){
  alert("Yoda says: Provide an artist. Hmmmmmm..");
  return;
}
if (song === ''){
  alert("Yoda says: Provide a song. Yeesssssss.");
  return;
}

// var songQuery = 'http://api.musixmatch.com/ws/1.1/track.search?format=jsonp&q_track=' + song + '&q_artist=' + artist + '&f_has_lyrics=1&apikey=' + process.env.MUSIXMATCH;
var songQuery = 'http://api.musixmatch.com/ws/1.1/track.search?format=jsonp&q_track=' + song + '&q_artist=' + artist + '&f_has_lyrics=1&apikey=' + 'bc924a04e765517423a6f2b637327c2f';

$.ajax({
  url: songQuery,
  dataType: 'jsonp',
  jsonpCallback: "callback"
}).done(function(data) {
    // console.log("This is the full data: ",data);
  // console.log(data.message.body.track_list[0]);
  if (data.message.header.available === 0){
    alert("Yoda says: Song that is not, again please try.");
    return;
  }
  info.trackId = data.message.body.track_list[0].track.track_id;
  info.artistName = data.message.body.track_list[0].track.artist_name;
  info.albumName = data.message.body.track_list[0].track.album_name;
  info.trackName = data.message.body.track_list[0].track.track_name;
  info.albumCover = data.message.body.track_list[0].track.album_coverart_350x350;

  // console.log("Info: ",info);

  // var  lyricQuery = 'http://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&track_id=' + info.trackId + '&apikey=' + process.env.MUSIXMATCH;
  var  lyricQuery = 'http://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&track_id=' + info.trackId + '&apikey=' + 'bc924a04e765517423a6f2b637327c2f';
  // console.log(lyricQuery);
  $.ajax({
    url: lyricQuery,
    dataType: 'jsonp',
    jsonpCallback: "callback"
  }).done(function(data) {
    // console.log("Lyrics search data : ",data);
    info.trackLyrics = data.message.body.lyrics.lyrics_body;
    console.log(info);
    // console.log(info.trackLyrics);
    // console.log(typeof info.trackLyrics);
    info.trackLyrics = info.trackLyrics.slice(0, -58);
    console.log("Original: ",info.trackLyrics);

    info.trackLyrics = info.trackLyrics.split("\n\n");
    console.log("split on double line break: ",info.trackLyrics);
    info.trackLyrics = info.trackLyrics.join(". ");
    console.log("after the join: ",info.trackLyrics);
    info.trackLyrics = info.trackLyrics.split("\n");
    console.log("split on single line break: ",info.trackLyrics);
    info.trackLyrics = info.trackLyrics.join(". ");
    console.log("after the join: ",info.trackLyrics);
    // console.log(typeof info.trackLyrics);




    var yodaQuery = "https://yoda.p.mashape.com/yoda?sentence=";
        // example = "You will learn how to speak like me someday";

    $.ajax({
      url: yodaQuery + info.trackLyrics,
      success: function(data) {
        // console.log(data);
        info.yodaLyrics = data;
        // console.log(yodaLyrics);
      },
      error: function(err) {
        console.log("error");
      },
      beforeSend: function(xhr) {
        // xhr.setRequestHeader("X-Mashape-Authorization", process.env.YODAKEY);
        xhr.setRequestHeader("X-Mashape-Authorization", 'lHg2Psw6tLmshsI058Xhf6EickOZp1g2Juojsn0KNtkjMllIxC');
      }
      // used beforeSend to input the X-Mashape-Authorization key
    }).done(function(){
      // console.log('....done');
      console.log("Yoda: ",info.yodaLyrics);
      // info.yodaLyrics = info.yodaLyrics.split(".  ");
      // console.log("Yoda split on period: ", info.yodaLyrics);
      // info.yodaLyrics = info.yodaLyrics.join("\n");
      // console.log("after adding line breaks back in: ", info.yodaLyrics);

      var songTemplate = Handlebars.compile($('#songInfo-template').html()),
          songInfo = songTemplate(info);
          $('#songInfo-container').html(songInfo);
      var lyricsTemplate = Handlebars.compile($('#lyrics-template').html()),
          jediLyrics = lyricsTemplate(info);
          $('#lyrics-container').html(jediLyrics);



    });//end of yoda ajax
  });//end of lyricQuery ajax
});//end of songQuery ajax

});//end of submit click function

var info = {
  trackId: undefined,
  artistName: undefined,
  albumName: undefined,
  trackName: undefined,
  albumCover: undefined,
  trackLyrics: undefined,
  yodaLyrics: undefined
};



});//end of dom content loaded
