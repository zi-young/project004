let winW=$(window).innerWidth();
let winH=$(window).innerHeight();
let vidW=$('#mainVideo').innerWidth();
let vidH=$('#mainVideo').innerHeight();
let videoPlay='on'; //켜진 상태
let soundMuted='off'; //꺼진 상태


$('#mainVideo').get(0).autoplay=true;
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
//정지버튼
$('.playPauseIcon').on({click:function(){
    if(videoPlay==='on'){ //비디오가 켜진상태와 같으면
        videoPlay='off';
        $('#mainVideo').get(0).pause();
        $(this).find('i').attr('class', 'fas fa-play'); //내가 선택한 요소 하위에있는 i를 찾아서 class속성을가져옴
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
    $(this).find('i').attr('class', 'fas fa-pause'); //다시 pause 아이콘으로 바꿔
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
        $('.playPauseIcon').find('i').attr('class','fas fa-play') //플레이버튼바뀌게
        clearInterval(setId)
    }
}
