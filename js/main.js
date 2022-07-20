let carousel = {
  container: document.querySelector('#projectsContainer'),
  maxPages: Math.ceil(document.querySelector('#projectsContainer').children.length / 2),
  currentPage: 1,
  bubbleWrapper: document.querySelector('#bubbleWrapper'),
  goToCurrentPage: () => {
    carousel.container.style.transform = `translateX(-${100 * (carousel.currentPage - 1)}%)`;
  },
  goLeft: () => {
    if (--carousel.currentPage <= 0) carousel.currentPage = carousel.maxPages;
    carousel.goToCurrentPage();
    carousel.changeActiveBubble(carousel.currentPage - 1);
  },
  goRight: () => {
    if (++carousel.currentPage > carousel.maxPages) carousel.currentPage = carousel.currentPage % carousel.maxPages;
    carousel.goToCurrentPage();
    carousel.changeActiveBubble(carousel.currentPage - 1);
  },
  changeActiveBubble: (value) => {
    document.querySelector('.bubble-active').classList.remove('bubble-active');
    bubbleWrapper.children[value].classList.add('bubble-active');
  }
}
carousel.createBubbles = () => {
  let container = carousel.bubbleWrapper;
  for (let i = 0; i < carousel.maxPages; i++) {
    let bubble = document.createElement('div');
    bubble.classList.add('bubble');
    if (i === carousel.currentPage - 1) bubble.classList.add('bubble-active');
    bubble.addEventListener('click', () => {
      carousel.currentPage = i + 1;
      carousel.changeActiveBubble(i);
      carousel.goToCurrentPage();
    })
    container.appendChild(bubble);
  }
}

let themeSelector = {
  element: document.querySelector('.slider-bar'),
  isOn: false,
  current: 'dark',
  change: () => {
    themeSelector.isOn = !themeSelector.isOn;
    themeSelector.element.setAttribute('data-on', themeSelector.isOn);
    document.querySelector('#theme').href = themeSelector.isOn ? './css/theme-light.css' : './css/theme-dark.css';

  }
}

const handleForm = (e) => {
  let form = e.target.parentNode;
  let data = {
    name: form[0].value,
    email: form[1].value,
    message: form[2].value,
  }
  console.log(data);
}

document.querySelector('input[type=submit]').addEventListener('click', handleForm)

const getScreenSize = () => {
  let div = document.createElement('div');
  div.textContent = `${screen.availWidth} x ${screen.availHeight}`
  document.body.insertBefore(div, document.querySelector('script'));
}

themeSelector.element.addEventListener('click', themeSelector.change);

carousel.createBubbles();
document.querySelector('#arrowLeft').addEventListener('click', carousel.goLeft);
document.querySelector('#arrowRight').addEventListener('click', carousel.goRight);
