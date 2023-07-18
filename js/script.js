let winW=$(window).innerWidth();
let winH=$(window).innerHeight();
let vidW=$('#mainVideo').innerWidth();
let vidH=$('#mainVideo').innerHeight();
let videoPlay='off'; //켜진 상태
let soundMuted='off'; //꺼진 상태


$('#mainVideo').get(0).autoplay=false;
$('#mainVideo').get(0).loop=0; 
$('#mainVideo').get(0).muted=true;


// 넓이 바뀔때마다 리사이즈 되게
// setInterval(videoResizeFn, 100) //0.1초마다 리사이징
// videoResizeFn()


$(window).resize(videoResizeFn)

function videoResizeFn(){
    winW=$(window).innerWidth();
    winH=$(window).innerHeight();
    vidW=$('#mainVideo').innerWidth();
    vidH=$('#mainVideo').innerHeight();

    $('.m-video').css({width:'100%', height:winH}); //메인비디오에 높이

    // 윈도우 높이가 비디오 높이보다 크면 메인비디오 높이를 윈도우높이만큼 가지라는 조건식
    if(winH>vidH){
        $('#mainVideo').css({width :'auto', height: winH});
    }
    //윈도우 넓이가 비디오 넓이보다 크면 메인비디오 높이 auto
    if(winW>vidW){
        $('#mainVideo').css({width :winW, height: 'auto'});
    }
}


$('.m-again').hide();


$('.playPauseIcon').on({click:function(){
    if(videoPlay==='on'){ //비디오가 켜진상태와 같으면
         videoPlay='off';
         $('#mainVideo').get(0).pause();
         $(this).find('i').attr('class', 'fas fa-play');
    }else{ //꺼진상태
        videoPlay='on'
         $('#mainVideo').get(0).play();
         $(this).find('i').attr('class', 'fas fa-pause'); //다시 pause 아이콘으로 바꿔
         $('.m-again').hide();
    }
}});

//스페이스 누르면 멈추기
$(document).keypress(function(e) {
    if (e.keyCode === 32 && videoPlay === 'on') { // 스페이스바의 keyCode는 32입니다.
      e.preventDefault();
      videoPlay = 'off'
      $('#mainVideo').get(0).pause();
      $('.playPauseIcon').find('i').attr('class', 'fas fa-play')
      $('.m-again').hide();
    }else if(e.keyCode === 32 && videoPlay === 'off'){
      videoPlay = 'on'
      $('#mainVideo').get(0).play();
      $('.playPauseIcon').find('i').attr('class', 'fas fa-pause')
      $('.m-again').hide();
    }
  });



//음소거
$('.mutedIcon').on({click:function(){
    if(soundMuted==='off'){
        soundMuted='on';
        $('#mainVideo').get(0).muted=false;
        $(this).find('i').attr('class', 'fas fa-volume-off');
    }else{
        soundMuted='off';
        $('#mainVideo').get(0).muted=true;
        $(this).find('i').attr('class', 'fas fa-volume-mute');
    }
}});

$('.watchagain').on({click:function(){
    videoPlay='on' //꺼진상태면 플레이되게끔
    $('#mainVideo').get(0).play();
    $(this).find('i').attr('class', 'fas fa-play'); //다시 pause 아이콘으로 바꿔
    $('.m-again').hide();
}});

let setId=setInterval(videoTimeCountFn,100)

function videoTimeCountFn(){
    // console.log('비디오 진행 시간 :' + $('#mainVideo').get(0).currentTime)
    // console.log('전체 비디오 시간 :' + $('#mainVideo').get(0).duration) //37.44
    // console.log('정지여부 :' + $('#mainVideo').get(0).ended)

    if($('#mainVideo').get(0).ended===true){ //비디오가 정지되면
        $('.m-again').show();
        videoPlay = 'off';
        $('.playPauseIcon').find('i').attr('class','fas fa-pause') //플레이버튼바뀌게
        clearInterval(setId)
    }
}




var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,  
    slidesPerGroup: 1,
    spaceBetween: 20,
    centeredSlides: false,
    freeMode: false, // 슬라이드 넘길 때 위치 고정 여부
    autoHeight: true, // 현재 활성 슬라이드높이 맞게 높이조정
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      slideChange: function () {
        var activeIndex = this.realIndex; // 현재 활성 슬라이드의 인덱스
        var slideTextElements = document.querySelectorAll('.swiper-slide .slideText');
  
        for (var i = 0; i < slideTextElements.length; i++) {
          if (i === activeIndex + 1) {
            slideTextElements[i].style.display = 'block'; // 활성 슬라이드의 다음 슬라이드에 위치한 slideText를 보여줌
          } else {
            slideTextElements[i].style.display = 'none'; // 다른 슬라이드의 slideText를 숨김
          }
        }
      }
    }
  });