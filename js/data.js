let $container=$('.gallery-wrap');
let $loadMoreBtn=$('.loadMoreBt');
let $letaddItenCount=6;
let $added=0;
let $allDate=[];

$.getJSON('./data/video.json', function(data){
    // console.log(data)
    $allDate=data;
    addItem();
    $loadMoreBtn.click(addItem)
})

function addItem(data){
    let element=[];
    let slicedData; //잘라서 가져오는
    slicedData=$allDate.slice($added, $added += $letaddItenCount)
    $.each(slicedData, function(index, item){
        let itemHTML = 
        `
        <li class="gallery-item">
            <div>
                <a href="javascript:" class="galleryBt">
                    <span class="gallery-video">
                        <video autoplay muted loop playsinline src="${item.video}"></video>
                    </span>
                    <span class="galleryCap"></span>
                    <span class="gallery-title">
                        <span><strong>${item.title}</strong></span>
                        <span><b>${item.description}</b></span>
                        <span><i class="exploreBt">Explore</i></span>
                    </span>
                </a>
            </div>
        </li>`;
        //사진마지막까지 눌렀을때 버튼 이름 바꿔주기
        element.push($(itemHTML).get(0))
        if($added<$allDate.length){
            $loadMoreBtn.text('Load More')
        }else{
            $loadMoreBtn.text('END').css({'background':'#384244', color:'#dee4e3' ,border: '#5e686a 1px solid'})
        }
    })
    $container.append(element)
}