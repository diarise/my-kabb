var _kmq = _kmq || [];
var _kmk = _kmk || 'b102a1c0b2417b55d11118820c8d5c4aee80235d';
function _kms(u){
  setTimeout(function(){
	var d = document, f = d.getElementsByTagName('script')[0],
	s = d.createElement('script');
	s.type = 'text/javascript'; s.async = true; s.src = u;
	f.parentNode.insertBefore(s, f);
  }, 1);
}
// Don't load KM locally
if (!window.location.host.match(/local/)) {
  _kms('//i.kissmetrics.com/i.js');
  _kms('//scripts.kissmetrics.com/' + _kmk + '.2.js');
}