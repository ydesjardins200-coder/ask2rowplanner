// util.js — tiny shared helpers
function esc(s){return (''+s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function el(id){return document.getElementById(id);}
function flash(t){var s=el('st');if(s){s.textContent=t;setTimeout(function(){s.textContent='';},1200);}}
