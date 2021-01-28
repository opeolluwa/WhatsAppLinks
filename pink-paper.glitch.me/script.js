
/* 
    Short cuts for document querySelector and querySelectorAll
    which can handle being used as template tags $`main` or $$`layer`
    
    Also if the first character is < then create a fragment instead
*/
const $ = (...s) => {
  const str = Array.isArray(s[0]) ? String.raw(...s) : s[0];
  return str[0] === '<' ? document.createRange().createContextualFragment(str) : document.querySelector(str);
}

const $$ = (...s) => {
  const str = Array.isArray(s[0]) ? String.raw(...s) : s[0];
  return Array.from(str[0] === '<' ? $(str).children : document.querySelectorAll(str));
}


/* Update the window URL on swipe, this is throttled so that the history doesn't get filled with useless entries*/
function updateHistory(hash) {
  clearTimeout(updateHistory.timeout);
  updateHistory.timeout = setTimeout(function () {
    if (window.location.hash !== hash) {
      if (location.hash !== '') {
        history.pushState({}, window.title, hash);
      } else {
        
        // On first page load update the URL in place
        history.replaceState({}, window.title, hash);
      }
    }
  }, 1000);
}

const iO = new IntersectionObserver(entries => entries.forEach(entry => {
    const hash = '#'+entry.target.id;
    const navEl = $`[href="${hash}"]`;
    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        navEl.classList.add('focus');
        updateHistory(hash);
    } else {
        navEl.classList.remove('focus');
    }
}), {
    root: $`#root`,
    threshold: 0.5
});

window.addEventListener('DOMContentLoaded', () => $$`layer`.map(a => iO.observe(a)));
window.addEventListener('hashchange', function (e) {
  const layerToShow =  $(window.location.hash || '#' + $`layer`.id);
  layerToShow.scrollIntoView();
  e.preventDefault();
}, false);