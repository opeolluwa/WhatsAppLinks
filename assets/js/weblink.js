/*tree.getVariable('layer[name*="weblink"] .output-controls img[src*="arrow"]').addEventListener('click', () => {
  //if there a link-*
if (tree.getVariable('layer[name*="weblink"] #getURL').value) {
 // let weblink = tree.getVariable('layer[name*="weblink"] #getURL').value;
  //api module
  $.bitlr({
    apiKey: '5bdbe751c876cd0754a18e31713533e527adf5b2',
    link: "https://wa.me/6799?text=hjii",
    success: function(newLink) {
      $('layer[name*="weblink"] .output-controls span').html(newLink);
    },
    error: function() {
      $('.urls').hide();
    }
  });
}
//https://wa.me/6799?text=hjiiij
/* else {
    swal({
      title: "Oops\!",
      text: `Empty feeds; there's nothing to copy.`,
      icon: "error",
      dangerMode: true
    });
  }
//})*/