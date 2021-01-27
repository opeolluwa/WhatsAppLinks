// define the tree
let tree = {

  //get variables by name
  getVariable(selector) {
    return document.querySelector(selector);
  },

  //hold private variables
  variables: {
    //application layers
    layers: document.getElementsByClassName('layer'),
    //output node
    output: document.getElementById('output'),
    //control buttons
    controls: document.querySelectorAll('#output img'),
    //navigation options => web => whatsapp => Qr code
    menuOptions: document.querySelectorAll('#menu img'),
    //tutorials 
    completeTutorial : true,
  },

  //display selected node
  hideNode(selector) {
    Object.assign(document.querySelector(selector).style, { display: 'none' })
  },

  //hide selectednodes
  displayNode(selector) {
    Object.assign(document.querySelector(selector).style, { display: 'block' })

  },

  //tutorial control
  skipTutorial() {
    tree.getVariable('#tutorial').style.display = 'none';
    alert('exist');
  },

  takeTutorial() {
    tree.getVariable('#tutorial').style.display = 'block';
    localStorage.setItem(tree.variables.completeTutorial, true);
  },

  //fade nodes in
  fadeInNode(selector) {
    tree.getVariable(selector).animate([
  //keyframes
      { display: 'block' },
      { filter: 'blur(5px)' },
      { opacity: 0 },
      { filter: 'blur(0)' },
      { opacity: 1 }],
    {
      // timing options
      duration: 600,
      easing: 'cubic-bezier(.55, .085, .68, .53)',

    });
  },

  //animation: flip in
  flipIn() {
    tree.getVariable(selector).animate(
    [{ transform: 'rotateX(70deg)' },
        { transformOrigin: 'top' },
        { opacity: 0 },

        { transform: 'rotateX(0deg)' }, { transformOrigin: 'top' },
        { opacity: 1 }],
      {
        // timing options
        duration: 600,
        easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
        fill: 'both'
      });

  },

  //initialization
  init() {
    //get all nodes and set display to none
    //show loader-
    tree.displayNode('#init');
    window.setTimeout(tree.hideNode, 1500, '#init');
    window.setTimeout(tree.displayNode, 1500, '#header');
  },



  //copy data to clip board
  copyToClipBoard() {
    const selection = window.getSelection();
    //save current selection
    const currentRange = selection.rangeCount === 0 ? null : selection.getRangeAt(0);

    //select the link content
    const range = document.createRange();
    range.selectNodeContents(link);
    selection.removeAllRanges();
    selection.addRange(range);
    //copy to clipboard
    try {
      //check link is ready
      document.execCommand('copy');
      trigger.innerHTML = !document.querySelector('#output').innerHTML ? 'Generate & Copy link' : 'Copied to clipboard';
      //copy link if ready
      if (document.getElementById('output').innerHTML) {
        swal({
            title: 'Link copied to clipboard',
            icon: 'success',
            buttons: ['exit', 'ok'],
            dangerMode: true
          })
          .then((resetFeed) => {
            if (resetFeed) {
              document.getElementById('getText').value = '';
              document.getElementById('getNumber').value = '';
              link.innerHTML = '';
              document.querySelectorAll('.container .output-controls button')[1].innerHTML = 'Copy link';
            }
          });
      }
      //tell user link is till being made
      else {
        swal({
          text: 'please wait...'
        })
      }
    }
    //unable to copy 
    catch (err) {
      trigger.innerHTML = 'copy';
    }
    //restore all previous all selection
    selection.removeAllRanges();
    currentRange && selection.addRange(currentRange);
  },




  //BIT.LY URL SHORTNER MODULE
  minifyLink() {
    $.bitlr({
      apiKey: '5bdbe751c876cd0754a18e31713533e527adf5b2',
      link: encodeURI(`https:\/\/wa.me/${number}\?text=${message}`),
      success: function(newLink) {
        $('#output').html(newLink);
      },
      error: function() {
        $('.urls').hide();
      }
    });

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-36251023-1']);
    _gaq.push(['_setDomainName', 'jqueryscript.net']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script');
      ga.type = 'text/javascript';
      ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(ga, s);
    })();
  },




};


//MAIN CONTROL 
tree.init();
//toggler
let toggler =
  tree.getVariable('#toggler');

toggler.addEventListener('click', () => {
  document.querySelector('#menu').style.display == "flex" ? document.querySelector('#menu').style.display = "none" : document.querySelector('#menu').style.display = "flex";
});


//option variables
let whatsapp = tree.variables.menuOptions[2];
let qrCode = tree.variables.menuOptions[1];
let web = tree.variables.menuOptions[0];


//whatsapp layers options
whatsapp.onclick = () => {
  //animate the active option
  whatsapp.classList.add('active-layer');
  tree.getVariable('#whatsapp-layer').classList.add('slit-in-horizontal');

  //hide other open nodes options & the nodes
  tree.displayNode('#whatsapp-layer');
  web.style.display = 'none';
  qrCode.style.display = 'none';
  tree.hideNode('#qrcode-layer');
  tree.hideNode('#web-layer');

  //perform other actions

}

//qrcode layer options
qrCode.onclick = function() {
  //animate the active option
  qrCode.classList.add('active-layer');
  tree.getVariable('#qrcode-layer').classList.add('slit-in-horizontal');

  //hide other open nodes options & the nodes
  whatsapp.style.display = 'none';
  web.style.display = 'none';
  tree.displayNode('#qrcode-layer')
  tree.hideNode('#web-layer')
  tree.hide('#whatsapp-layer')
  //perform other actions

}

//web layer options
web.onclick = function() {
  //animate the active option
  web.classList.add('active-layer');
  tree.getVariable('#web-layer').classList.add('slit-in-horizontal');

  //hide other open nodes options & the nodes
  whatsapp.style.display = 'none';
  qrCode.style.display = 'none';
  tree.displayNode('#web-layer');
  tree.hideNode('#whatsapp-layer');
  tree.hideNode('#qrcode-layer');
  //perform other actions

}