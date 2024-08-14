document.addEventListener('DOMContentLoaded', ()=>{
    const invite_block = document.querySelector('.choosing-time__invite');
    invite_block.addEventListener('touchstart', dragStart)
    invite_block.addEventListener("dragenter", dragStart);
    function dragStart(e){
        console.log(e)
    }
})