// VIDEOS + ONE VIDEO
const videos = [];

class VideoCard {
  constructor(
    id,
    hash,
    url,
    short_name,
    short_description,
    name,
    description,
    video_type
  ) {
    this.el = document.createElement('div'); //контейнер для данных карточки - корневой дом элемент
    this.el.setAttribute('id', 'video'); //присваиваем id контейнеру
    this.el.setAttribute('data-video-id', id);
    this.el.addEventListener('click', this.navToSinglePage.bind(this));

    this.id = id;
    this.hash = hash;
    this.short_name = short_name;
    this.short_description = short_description;
    this.name = name;
    this.description = description;
    this.video_type = video_type;

    this.el.innerHTML = this.generateIframe();

    // this.el.innerHTML = `
    //       <iframe
    //       src="https://player.vimeo.com/video/${this.id}?h=${this.hash}&responsive=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&autopause=0"
    //       frameborder="0"
    //       allow="autoplay; fullscreen; picture-in-picture"
    //       webkitAllowFullScreen
    //       mozallowfullscreen
    //       allowFullScreen
    //     >
    //     </iframe>
    //     <div class="video_layout">
    //       <h1>${this.short_name}</h1>
    //       <h1>&#8212;</h1>
    //       <p>${this.short_description}</p>
    //     </div>
    // `;

    this.render();
  }
  generateIframe() {
    let iframeSrc = '';

    if (this.video_type === 'vimeo') {
      iframeSrc = `https://player.vimeo.com/video/${this.id}?h=${this.hash}&responsive=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&autopause=0`;
    } else if (this.video_type === 'youtube') {
      iframeSrc = `https://www.youtube.com/embed/${this.id}?enablejsapi=1&iv_load_policy=3&autoplay=1&loop=1&mute=1&controls=0&fs=0&disablekb=1&rel=0&showinfo=0&playlist=${this.id}`;
    }

    return `
      <iframe
        src="${iframeSrc}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
       
      >
      </iframe>
      <div class="video_layout">
        <h1>${this.short_name}</h1>
        <h1>&#8212;</h1>
        <p>${this.short_description}</p>
      </div>
    `;
  }

  navToSinglePage() {
    // const params = new URLSearchParams({
    //   id: this.id,
    // });

    // window.location.href = `video.html?${params.toString()}`;
    const params = new URLSearchParams({
      id: this.id,
      type: this.video_type,
      // Include hash only for Vimeo videos
      ...(this.video_type === 'vimeo' && { hash: this.hash }),
    });

    window.location.href = `video.html?${params.toString()}`;
  }
  render() {
    const container = document.getElementById('videos_wrapper');
    if (container) {
      container.appendChild(this.el);
      videos.push(this);
    }
    // document.getElementById('videos_wrapper')?.appendChild(this.el); // вкладываем карточку в боди в нужный див
    // console.log(this, 'данные видео карточки');
  }
}

const video_data = [
  {
    id: '1091470784',
    hash: '0853f1c4d3',
    url: 'https://vimeo.com/1091470784/0853f1c4d3',
    short_name: 'Loewe',
    short_description: 'pre fall 2023',
    name: 'Loewe Collection',
    description: 'Detailed description of Loewe pre fall 2023 collection',
    video_type: 'vimeo',
  },
  {
    id: '1091470766',
    hash: '02a0871b8a',
    short_name: 'Saint Laurent',
    short_description: 'winter 2025',
    name: 'Saint Laurent Winter',
    description: 'Saint Laurent winter 2025 collection showcase',
    video_type: 'vimeo',
  },
  {
    id: '1091470748',
    hash: '227512768c',
    short_name: 'Vans',
    short_description: 'pre fall 2024',
    name: 'Vans Collection',
    description: 'Vans pre fall 2024 creative campaign',
    video_type: 'vimeo',
  },
  {
    id: '1091470735',
    hash: '684fc32ac0',
    short_name: 'Brand 4',
    short_description: 'campaign 2024',
    name: 'Brand 4 Campaign',
    description: 'Description for video 4',
    video_type: 'vimeo',
  },
  {
    id: '1091470673',
    hash: '0b0f25286a',
    short_name: 'Brand 5',
    short_description: 'collection 2024',
    name: 'Brand 5 Collection',
    description: 'Description for video 5',
    video_type: 'vimeo',
  },
  {
    id: '1091470656',
    hash: 'ec65e9bffb',
    short_name: 'Brand 6',
    short_description: 'campaign 2025',
    name: 'Brand 6 Campaign',
    description: 'Description for video 6',
    video_type: 'vimeo',
  },
  {
    id: '1091470618',
    hash: '370ce20b53',
    short_name: 'Brand 7',
    short_description: 'spring 2024',
    name: 'Brand 7 Spring',
    description: 'Description for video 7',
    video_type: 'vimeo',
  },
  {
    id: '1091470613',
    hash: 'aec32db86a',
    short_name: 'Brand 8',
    short_description: 'summer 2024',
    name: 'Brand 8 Summer',
    description: 'Description for video 8',
    video_type: 'vimeo',
  },
  // YouTube video examples
  {
    id: '9ZfN87gSjvI',
    hash: null,
    url: 'https://www.youtube.com/watch?v=9ZfN87gSjvI&list=PL_T9MO520krq5QsT1sIHdmBUNodksi8v2&index=3',
    short_name: 'YouTube Example',
    short_description: 'sample video',
    name: 'YouTube Sample Video',
    description: 'This is a sample YouTube video integration',
    video_type: 'youtube',
  },
  {
    id: 'MozX3qFIkpQ',
    hash: null,
    url: 'https://www.youtube.com/watch?v=MozX3qFIkpQ&list=PL_T9MO520krq5QsT1sIHdmBUNodksi8v2&index=6',
    short_name: 'Another YouTube',
    short_description: 'demo video',
    name: 'YouTube Demo Video',
    description: 'Another example of YouTube video integration',
    video_type: 'youtube',
  },
  {
    id: 'crEvCn5U8Iw',
    hash: null,
    url: 'https://www.youtube.com/watch?v=crEvCn5U8Iw&list=PL_T9MO520krq5QsT1sIHdmBUNodksi8v2&index=9',
    short_name: 'Another YouTube',
    short_description: 'demo video',
    name: 'YouTube Demo Video',
    description: 'Another example of YouTube video integration',
    video_type: 'youtube',
  },
  {
    id: '6pxRHBw-k8M',
    hash: null,
    url: 'https://www.youtube.com/watch?v=6pxRHBw-k8M&list=PL_T9MO520krq5QsT1sIHdmBUNodksi8v2&index=11',
    short_name: 'Another YouTube',
    short_description: 'demo video',
    name: 'YouTube Demo Video',
    description: 'Another example of YouTube video integration',
    video_type: 'youtube',
  },
];

function createAllVideoCards() {
  video_data.forEach((video) => {
    new VideoCard(
      video.id,
      video.hash,
      '',
      video.short_name,
      video.short_description,
      video.name,
      video.description,
      video.video_type
    );
  });
}
createAllVideoCards();

// ONE VIDEO PAGE
function loadSelectedVideo() {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get('id');
  const videoType = urlParams.get('type');

  const videoData = video_data.find((video) => video.id === videoId);

  displayVideo(videoData);
}

function displayVideo(videoData) {
  const videoContainer = document.getElementById('single_video_container');
  let iframeSrc = '';

  if (videoData.video_type === 'vimeo') {
    iframeSrc = `https://player.vimeo.com/video/${videoData.id}?h=${videoData.hash}&responsive=1&controls=1&title=0&byline=0&portrait=0&autopause=0`;
  } else if (videoData.video_type === 'youtube') {
    iframeSrc = `https://www.youtube.com/embed/${videoData.id}?controls=1&modestbranding=1&rel=0&showinfo=0`;
  }

  videoContainer.innerHTML = `
      <div class="single_video_wrapper">
        <div class="video_player">
          <iframe
            src="${iframeSrc}"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture; fullscreen"
          >
          </iframe>
        </div>
        
        <div class="video_info">
          <h3 class="video_title">
           <strong>
            ${videoData.name}
           </strong>
          </h3>
          <h2 class="video_subtitle">${videoData.short_name} &#8212; ${videoData.short_description}</h2>
          <p class="video_description">${videoData.description}</p>
        </div>
      </div>
    `;
}

document.addEventListener('DOMContentLoaded', loadSelectedVideo);

// src="https://player.vimeo.com/video/${videoData.id}?h=${videoData.hash}&responsive=1&controls=1&title=0&byline=0&portrait=0&autopause=0"
