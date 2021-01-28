// define the tree
let tree = {

  //get variables by name
  getVariable(selector) {
    return document.querySelector(selector);
  },

  //hold private variables
  variables: {

    //application layers
    layers: {
      whatsapp: document.querySelector('#whatsapp-layer'),
      qrcode: document.querySelector('#qrcode-layer'),
      weblink: document.querySelector('#weblink-layer')
    },

    //navigation || application layer observer
    layersObserver: {
      weblink: document.querySelectorAll('#menu a')[0],
      qrcode: document.querySelectorAll('#menu a')[1],

      whatsapp: document.querySelectorAll('#menu a')[2]

    },
    //output node
    output: document.getElementById('output'),
    //control buttons
    controls: document.querySelectorAll('#output img'),

    //tutorials 
    completeTutorial: true,
  },

  //hide selectednodes
  hideNode(selector) {
    Object.assign(document.querySelector(selector).style, { display: 'none' });
  },

  //display selected node
  displayNode(selector) {
    Object.assign(document.querySelector(selector).style, { display: 'block' });
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



  //copy data to clip board
  copyToClipBoard() {
    const selection = window.getSelection();
    //save current selection
    let currentRange = selection.rangeCount === 0 ? null : selection.getRangeAt(0);

    //select the link content
    let range = document.createRange();
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

// First we select target elements
let weblink = tree.variables.layers.weblink;
let qrcode = tree.variables.layers.qrcode;
let whatsapp = tree.variables.layers.whatsapp;

//refrence their observers 
let whatsappObserver = tree.variables.layersObserver.whatsapp;
let weblinkObserver = tree.variables.layersObserver.weblink;
let qrcodeObserver = tree.variables.layersObserver.qrcode;


//weblink.call back
function callback(entries) {
  // The callback will return an array of entries, even if you are only observing a single item
  entries.map((entry) => {
    if (entry.isIntersecting) {
      weblinkObserver.style.borderBottom = '.1rem solid #fff';
    }
    else {
      weblinkObserver.style.borderBottom = 'none';
    }
  });
}

//whatsapp callback
function whatsappCallback(entries) {
  // The callback will return an array of entries, even if you are only observing a single item
  entries.map((entry) => {
    if (entry.isIntersecting) {
      whatsappObserver.style.borderBottom = '.1rem solid #fff';
    }
    else {
      whatsappObserver.style.borderBottom = 'none';
    }
  });
}

//qrcode observer 
function qrcodeCallback(entries) {
  // The callback will return an array of entries, even if you are only observing a single item
  entries.map((entry) => {
    if (entry.isIntersecting) {
      qrcodeObserver.style.borderBottom = '.1rem solid #fff';
    }
    else {
      qrcodeObserver.style.borderBottom = 'none';
    }
  });
}

// Next we instantiate the observer
const observeWhatsapp = new IntersectionObserver(whatsappCallback);

// Finally start observing the target element
observeWhatsapp.observe(whatsapp);
//observer.observe(qrcode);
//observer.observe(whatsapp);