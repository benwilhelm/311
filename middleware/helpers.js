module.exports = function(req, res, next) {
  
  if (req.user) {
    res.locals.loggedIn = true;
    res.pageClasses = ['logged-in'];
  }
  
  // add classes to body tag
  res.pageClasses = res.pageClasses || [];
  var pageClasses = pageClassesFromPath(req.originalUrl);
  res.pageClasses = res.pageClasses.concat( pageClasses );
  res.locals.pageClasses = res.pageClasses.join(' ');

  next();
}


var pageClassesFromPath = function(path) {
  path = path.substring(1);
  var route = path.split('?')[0];
  var a = route.split('/')
  var page = a[a.length-1] || 'home';
  page = 'page-' + page;
  var classes = [page];
  
  if (path) {
    var full = route.toLowerCase().replace(/\//g,'-');
    classes.push(full);
  }
  
  
  if (a.length > 1) {
    section = 'section-' + a[0];
    classes.push(section);
  }
  
  return classes;
}