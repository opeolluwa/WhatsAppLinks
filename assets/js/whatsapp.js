//update charLength
document.getElementById('getText').addEventListener('keyup', () => {
  //def length
  let length = 100 - document.getElementById('getText').value.length;
  let charLength =
    document.getElementById('charLength');
  charLength.innerHTML = `${length} characters more`;

  (length <= 500) ?
  Object.assign(charLength.style, { color: '#ee0000' }):

    (length <= 750) ?
    Object.assign(charLength.style, { color: '#e69500' }) :

    (length <= 990) ?
    Object.assign(charLength.style, { color: '#ffc14d' }) :
    Object.assign(charLength.style, { color: '#f5f5f5' });
});



//ref variables 
let link = tree.getVariable('layer[name*="whatsapp"] .output-controls span');
//define variables
//let trigger = tree.getVariable('layer[name*="whatsapp"] .output-controls img')[3];
let trigger = tree.getVariable('layer[name*="whatsapp"] .output-controls img[src*="arrow"]')
//add event listener 
trigger.addEventListener('click', function() {
  let message = document.getElementById('getText').value;
  let number = document.getElementById('getNumber').value;

  //proceed to.copy but ==>
  //ERROR HANDLING 
  if (!number && !message) {
    swal({
      title: "Oops\!",
      text: `Empty feeds; there's nothing to copy.`,
      icon: "error",
      dangerMode: true
    }).then(() => {
      link.innerHTML = '';
      //notify error
      Object.assign(document.getElementById('getNumber').style, { borderColor: 'rgba(255, 26, 26, .4)' });
      Object.assign(document.getElementById('getText').style, { borderColor: 'rgba(255, 26, 26, .4)' });
      /* document.querySelectorAll('.container .output-controls button')[1].innerHTML = 'Copy link';*/
    });
  }

  else if (!number) {
    swal({
      title: "Oops\!",
      text: "Empty number feed, please provide a valid number",
      icon: "error",
      dangerMode: true
    }).then(() => {
      link.innerHTML = '';
      Object.assign(document.getElementById('getNumber').style, { borderColor: 'rgba(255, 26, 26, .4)' });
      /*
            document.querySelectorAll('.container .output-controls button')[1].innerHTML = 'Copy link';*/
    });
  }

  else if (!message) {
    swal({
      title: "Oops\!",
      text: "Empty message feed",
      icon: "error",
      dangerMode: true
    }).then(() => {
      document.getElementById('output').innerHTML = '';
      Object.assign(document.getElementById('getText').style, { borderColor: 'rgba(255, 26, 26, .4)' });

      /*      document.querySelectorAll('.container .output-controls button')[1].innerHTML = 'Copy link';*/
    });
  }


  else {
    //delete plus sign before number
    number = number[0] == '+' ? number.slice(1) : number;
    //append selection to variable link
    link.innerHTML = encodeURI('https:\/\/wa.me/' + number + '\?text=' + message);


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
      document.execCommand('copy');
      swal({
        title: 'Link copied to clipboard',
        icon: 'success'
      });
    }
    //unable to copy 
    catch (err) {
      swal({
        title: 'Oops!😣',
        icon: 'error',
        text: 'Unable to copy'
      });

    }
    //restore all previous all selection
    selection.removeAllRanges();
    currentRange && selection.addRange(currentRange);
  }

});