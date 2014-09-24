var Handlebars = require('hbs')
  , moment = require('moment')
  , numeral = require('numeral')
  ;


var helpers = {
  
  DollarsCents: function(num) {
    var number = numeral(num);
    return number.format("0,0.00");
  },
  
  EmailLink: function(addr, txt) {
    var txt = typeof txt === 'string' ? txt : addr ;
    var str = "<a href='mailto:{0}' target='blank'>{1}</a>".format(addr,txt);
    var ret = new Handlebars.SafeString(str);
    return ret;
  },
  
  FormatInteger: function(num) {
    var number = numeral(num);
    return number.format("0,0");
  },
  
  FormatDate: function(raw, fmt) {
    return moment(raw).format(fmt) ;
  },
  
  /**
   * This is blatantly lifted from Dan Harper's Handlebars Helpers module
   * https://github.com/danharper/Handlebars-Helpers
   */
  Nl2Br: function(text) {
    text = Handlebars.Utils.escapeExpression(text);
    var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
    return new Handlebars.SafeString(nl2br);
  },
  
  OidToFormattedDate: function(oid, fmt){
    var date = new Date(parseInt(oid.toString().slice(0,8), 16)*1000);
    return moment(date).format(fmt);
  },

  PhoneNumber: function(raw) {
    raw = raw.replace(/[^\d]/g,'');
    if (raw[0] === 1)
      raw = raw.slice(1) ;
    
    var a = [
      raw.substr(0,3),
      raw.substr(3,3),
      raw.substr(6)
    ]
    
    return a.join('-') ;
  },
  
  Trim: function(str, len) {
    if (str.length > len) {
      str = str.substring(0, len) + '...';
    }
    
    return str;
  }
  
}

module.exports.register = function(hbs) {
  for (var helper in helpers) {
    hbs.registerHelper(helper, helpers[helper]);
  }
}