const bar = document.querySelector('.progress-bar');
const loader = document.querySelector('.loading-container');
const map_page = document.querySelector('.map-page');
console.log(document.readyState)
window.onload = ()=> console.log(document.readyState)
function loadData() {
  let progress =  0;
    return new Promise((resolve) => {
      let timerId = setInterval(() => {
        progress += 6;
        bar.style.setProperty('--progress', `${progress}px`);
        if (progress >= bar.clientWidth) {
          clearInterval(timerId);
          resolve();
        }
      }, 160);
    })
  }
  
console.log(loadData())
loadData()
    .then(() => {
      console.log('resolve')
      loader.classList.add('hidden');
      map_page.classList.add('active');
      setTimeout(()=>loader.style.display = 'none', 5000)
    })