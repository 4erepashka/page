document.addEventListener('DOMContentLoaded', ()=>{
    const sliders_arr =  Array.from(document.querySelectorAll('.card-slider'))

    console.log('array of sliders', sliders_arr)

    sliders_arr.map(slider=> {
      slider.querySelector('.card-slides').onscroll = (e)=>scroll(e.target)
    })
   
    const scroll =(target)=>{
      console.log('scroll the', target);
      console.log('indicators', target.closest('.card-slider'))

      const indicators_arr = Array.from(target.closest('.card-slider').querySelector('.slider-indecators').children)
      console.log(target.closest('.card-slider').querySelector('.card-slides'))
      card_index =  Math.round(target.closest('.card-slider').querySelector('.card-slides').scrollLeft / target.offsetWidth); 
      console.log(card_index)
      indicators_arr[card_index].querySelector('circle').style.fill = '#fff';
      indicators_arr.filter((_, index)=> index !== card_index).map(el=>el.querySelector('circle').style.fill = 'rgba(0,0,0,.25)')
      console.log(indicators_arr)
  
    }
    const indicators_arr = Array.from(document.querySelector('.slider-indecators').children)
    const arr = Array.from(document.querySelector('.card-slides').children);

})