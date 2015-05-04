var fs = require('fs');

var s1 = fs.readFileSync('area.txt', 'utf8');


var PARSE_CODE = /code="(\d{4})(\d{2})">(.+?)<\/li>/g;
var PARSE_CODE1 = /code="((\d{4})(\d{2}))">(.+?)<\/li>/;

var code, counties = [], match1, match2, match3, match4, countryCode;

var matches = s1.match(PARSE_CODE);


matches.forEach(function (item) {

  code = item.match(PARSE_CODE1);

  match1 = code[1];//code
  match2 = code[2];
  match3 = code[3];
  match4 = code[4];//text

  if ('' + match3 !== '00') {
    countryCode = match2 + '00';
    var obj;
    counties.forEach(function (v) {
      if (v.code + '' === countryCode) {
        obj = v;
        return false;
      }
    });
    if (!obj) {
      obj = {};
      obj.code = +countryCode;
      obj.options = [];
      obj.options.push({text: match4, value: match1});
      counties.push(obj);
    }else{
      obj.options.push({text: match4, value: match1});
    }

  }
});

fs.writeFileSync('parse.json',JSON.stringify(counties));


