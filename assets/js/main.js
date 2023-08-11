var acc = document.getElementsByClassName('accordion__button');
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    this.classList.toggle('accordion__button--active');
    this.parentNode.parentNode.classList.toggle('accordion__item--active');
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      // panel.scrollIntoView({
      //   behavior: 'smooth',
      //   block: 'center'
      // });
    }
  });
}

const mobileButton = document.querySelector('.header__menu-btn');
const mobileMenu = document.querySelector('.menu');
const mobileCross = document.querySelector('.menu__cross');
const menuLinks = document.querySelectorAll('.menu__item');

mobileButton.addEventListener('click', () => {
  mobileMenu.classList.add('menu--active');
  document.querySelector('html').classList.add('no-scroll');
});

function closeMenu() {
  mobileMenu.classList.remove('menu--active');
  document.querySelector('html').classList.remove('no-scroll');
}

mobileCross.addEventListener('click', () => {
  closeMenu();
});

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

const modals = document.querySelectorAll('.modal');
const triggers = document.querySelectorAll('[data-toggle]');
modals.forEach((modal) => {
  const modalClose = modal.querySelector('.modal__cross');

  function hideModal() {
    // modal.classList.remove('modal--active');
    $(modal).fadeOut(300);
    document.querySelector('html').classList.remove('no-scroll');
  }

  modalClose.addEventListener('click', () => {
    hideModal();
  });

  modal.addEventListener('click', (e) => {
    if (e.target == modal) {
      hideModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      hideModal();
    }
  });
});

triggers.forEach((trigger) => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    if (trigger.getAttribute('data-toggle') == 'smm') {
      $('.modal--smm').fadeIn(300);
      // document.querySelector('.modal--smm').classList.add('modal--active');
      setTimeout(() => {
        ItcSlider.getOrCreateInstance('.slider--smm');
      }, 200);
      document.querySelector('html').classList.add('no-scroll');
    } else if (trigger.getAttribute('data-toggle') == 'design') {
      $('.modal--design').fadeIn(300);
      // document.querySelector('.modal--design').classList.add('modal--active');
      setTimeout(() => {
        ItcSlider.getOrCreateInstance('.slider--design');
      }, 200);
      document.querySelector('html').classList.add('no-scroll');
    } else if (trigger.getAttribute('data-toggle') == 'mform') {
      $('.modal--form').fadeIn(300);
      $('.input-name').focus();
      // document.querySelector('.modal--form').classList.add('modal--active');
      document.querySelector('html').classList.add('no-scroll');
    }
  });
});

document.querySelectorAll('.switch.disabled').forEach((i) => i.addEventListener('click', (e) => e.stopPropagation()));

/* ********** Cookie banner ********** */

const LS_KEY_CS = 'CS';
const LS_KEY_CGA = 'CGA';
const LS_KEY_CM = 'CM';

const bannerNode = document.getElementById('banner');
const bannerSettingsNode = document.getElementById('banner-settings');

const cookieSystemAccepted = window.localStorage.getItem(LS_KEY_CS);

if (!cookieSystemAccepted) {
  bannerNode.classList.add('banner_active');
}

document.getElementById('banner-close').addEventListener('click', () => {
  window.localStorage.setItem(LS_KEY_CS, 1);
  window.localStorage.setItem(LS_KEY_CGA, 1);
  window.localStorage.setItem(LS_KEY_CM, 1);

  bannerNode.classList.remove('banner_active');
});

document.getElementById('cookie-accept').addEventListener('click', () => {
  const cookieAnalyticsValue = document.getElementById('cookie-analytics').checked;
  const cookieMarketingValue = document.getElementById('cookie-marketing').checked;

  window.localStorage.setItem(LS_KEY_CS, 1);

  if (cookieAnalyticsValue) {
    window.localStorage.setItem(LS_KEY_CGA, 1);
  }

  if (cookieMarketingValue) {
    window.localStorage.setItem(LS_KEY_CM, 1);
  }

  bannerNode.classList.remove('banner_active');

  processCookies();
});

document.getElementById('cookie-accept-required').addEventListener('click', () => {
  window.localStorage.setItem(LS_KEY_CS, 1);
  bannerNode.classList.remove('banner_active');

  processCookies();
});

document.getElementById('cookie-settings').addEventListener('click', () => {
  bannerSettingsNode.classList.add('banner__settings_active');
});

processCookies();

function processCookies() {
  const cookieAnalyticsAccepted = window.localStorage.getItem(LS_KEY_CGA);
  const cookieMarketingAccepted = window.localStorage.getItem(LS_KEY_CM);

  if (cookieAnalyticsAccepted) {
    console.log('CGA is active');

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'G-XXXXXXX');
  }

  if (cookieMarketingAccepted) {
    console.log('CM is active');
    // do whatever you want
  }
}

let isRezeble = false;
window.addEventListener('scroll', () => {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    if (!isRezeble) {
      $('.modal--form').fadeIn(300);
      $('.input-name').focus();
      // document.querySelector('.modal--form').classList.add('modal--active');
      document.querySelector('html').classList.add('no-scroll');
    }

    isRezeble = true;
  }
});


// function onSubmit(token) {
//   document.getElementById("send-form").submit();
// }

const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  $('.modal--form').fadeOut(1500);
  $('.modal--thanks').fadeIn(1500);
  console.log('Validation passes and form submitted', e);

  let formData = new FormData(e.target);
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log('Sent');
      }
    }
  }

  xhr.open('POST', '../../main.php', true);
  xhr.send(formData);

  e.target.reset();
  isRezeble=true;
});