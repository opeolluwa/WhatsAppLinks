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
//refrence the application layer
let whatsapp = tree.variables.layers.whatsapp;
let weblink = tree.variables.layers.weblink;
let qrcode = tree.variables.layers.qrcode;


//refrence the layer observers => these are hyperlink <a>...</a> that update active layer
let whatsappObserver = tree.variables.layersObserver.whatsapp;
let weblinkObserver = tree.variables.layersObserver.weblink;
let qrcodeObserver = tree.variables.layersObserver.qrcode;


//whatsapp layer control logic
function whatsappCallback(entries) {
  entries.map((entry) => {
    //if whatsapp layer is visible
    if (entry.isIntersecting) {
      //underline the the hyperlink then unobserve other layers 
      whatsappObserver.style.borderBottom = '.1rem solid #fff';
     // observeQrcode.unobserve(qrcode);
     // observeWeblink.unobserve(weblink);
      //other conttol logic


    }
    //feedback control || error handling
    else {
      whatsappObserver.style.borderBottom = 'none';
    }
  });
}

//weblink layer control logic
function weblinkCallback(entries) {
  //observer control
  entries.map((entry) => {
    if (entry.isIntersecting) {
      //=>underline the the hyperlink
      weblinkObserver.style.borderBottom = '.1rem solid #fff';
      //underline the the hyperlink then unobserve other layers 
      //observeQrcode.unobserve(qrcode);
      //observeWhatsapp.unobserve(whatsapp);
      //other conttol logic


    }
    //feedback control || error handling
    else {
      weblinkObserver.style.borderBottom = 'none';
    }
  });
}

//qrcode layer control logic
function qrcodeCallback(entries) {
  //observer control
  entries.map((entry) => {
    //if qrcode layer is visible
    if (entry.isIntersecting) {
      //=>underline the the hyperlink
      qrcodeObserver.style.borderBottom = '.1rem solid #fff';
      //unobserve other layers
      //observeWhatsapp.unobserve(whatsapp);
      //observeWeblink.unobserve(weblink);
    }

    //feedback control || error handling
    else {
      qrcodeObserver.style.borderBottom = 'none';
    }
  });
}


//here we instantiate the observer for each layer
const observeWhatsapp = new IntersectionObserver(whatsappCallback);
const observeWeblink = new IntersectionObserver(weblinkCallback);
const observeQrcode = new IntersectionObserver(qrcodeCallback);


// Finally start observing the target element
observeWhatsapp.observe(whatsapp);
observeWeblink.observe(weblink);
observeQrcode.observe(qrcode);