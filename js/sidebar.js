document.addEventListener('DOMContentLoaded', ()=>{
    const sidebar = document.querySelector('.sidebar');
    const btns_sidebar = document.querySelectorAll('.sidebar-btn');;
    console.log(sidebar, btns_sidebar);
    btns_sidebar.forEach(btn=>btn.addEventListener('click', (e)=>{
        sidebar.classList.toggle('active')
    }))
    document.onclick = (e)=>{
        console.log(e.target.closest('.sidebar-btn'))
        if (e.target.closest('.sidebar-btn')){
            sidebar.classList.add('active')
        }else if (e.target.closest('.sidebar') === null){
            console.log('yes')
            sidebar.classList.remove('active')
        }
    }

})