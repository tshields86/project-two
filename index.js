
$.ajax({
  url: "https://yoda.p.mashape.com/yoda?sentence=You+will+learn+how+to+speak+like+me+someday",

  // type: 'POST',
  // data: {},
  // dataType: 'json',

  beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", 'lHg2Psw6tLmshsI058Xhf6EickOZp1g2Juojsn0KNtkjMllIxC');
  },
  success: function(data) {
    console.log(data);
  },
  error: function(err) {
    console.log("error");
  }


// }).done(function(response){
//       console.log(response);
//
//
//
//
//     }).fail(function(response){
//       console.log("fail");
//       console.log(response);
//     }).always(function(response){
//       console.log("this runs no matter what.");
    });
