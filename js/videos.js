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
    video_type,
    preview_gif = null
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
    this.preview_gif = preview_gif;

    this.el.innerHTML = this.generatePreview();

    this.render();
  }

  generatePreview() {
    if (this.preview_gif) {
      return `
      <div class="video_preview_container">
           <video autoplay muted loop playsinline class="video_preview_gif">
          <source data-src="${this.preview_gif}" type="video/mp4" />
        </video>
      </div>
      <div class="layout">
          <h1>${this.short_name}</h1>
          <h1>&#8212;</h1>
          <p>${this.short_description}</p>
        </div>
    `;
    } else {
      let iframeSrc = '';

      if (this.video_type === 'vimeo') {
        iframeSrc = `https://player.vimeo.com/video/${this.id}?h=${this.hash}&responsive=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&autopause=0`;
        // thumbnailUrl = `https://vumbnail.com/${this.id}.jpg`;
      } else if (this.video_type === 'youtube') {
        iframeSrc = `https://www.youtube.com/embed/${this.id}?enablejsapi=1&iv_load_policy=3&autoplay=1&loop=1&mute=1&controls=0&fs=0&disablekb=1&rel=0&showinfo=0&playlist=${this.id}`;
        // thumbnailUrl = `https://img.youtube.com/vi/${this.id}/maxresdefault.jpg`;
      }

      return `
        <iframe
          src="${iframeSrc}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          loading="lazy"
  
        >
        </iframe>
        <div class="layout">
          <h1>${this.short_name}</h1>
          <h1>&#8212;</h1>
          <p>${this.short_description}</p>
        </div>
      `;
    }
  }

  navToSinglePage() {
    const params = new URLSearchParams({
      id: this.id,
      type: this.video_type,
      ...(this.video_type === 'vimeo' && { hash: this.hash }),
    });

    window.location.href = `../video/?${params.toString()}`;
  }
  render() {
    const container = document.getElementById('videos_wrapper');
    if (container) {
      container.appendChild(this.el);
      videos.push(this);

      if (window.imageViewer) {
        window.imageViewer.refreshImageListeners();
      }
    }
  }
}

const video_data = [
  // YouTube video examples
  {
    id: '3ooAf0pWjlA',
    hash: null,
    url: 'https://youtu.be/3ooAf0pWjlA?si=3Y_XK_CGUdHPiyeF',
    short_name: 'DooMee - Fauna (feat. August)',
    short_description: 'December 2024',
    name: 'DooMee - Fauna (feat. August)',
    description: [
      [
        'Directors - Dima Zimnickiy, Ivan & Aleksandr Cherkasov, Vladislav Zolotarev',
      ],

      [
        'SAMUI team:',
        'DOP — Dima Zimnickiy, Ivan & Aleksandr Cherkasov',
        'Producer — SZN',
      ],

      ['SPB team:', 'DOP — Sergey Mikheev', 'Producer — Nikita Malik'],

      [
        'Edit — Aleksandr & Ivan Cherkasov, Dima Zimnickiy, Nikita Malik',
        'Colorist — Sergey Mikheev',
        'Special Thanks — Daria Fedorova',
      ],
    ],
    video_type: 'youtube',
    preview_gif: '../images/gifs_preview/DooMee_August.mp4',
  },
  {
    id: 'XIrwItlrUaU',
    hash: null,
    url: 'https://youtu.be/XIrwItlrUaU?si=sLMsu8TpXfMlmdo0',
    short_name: 'Big Baby Tape',
    short_description: 'Live at Rolling Loud 2024',
    name: 'Big Baby Tape - Live at RL',
    description: [
      [
        'Shot by - Dima Zimnickiy, Aleksandr Cherkasov ,Gleb Kuznetsov, Vladislav Zolotarev, Ivan Cherkasov',
      ],
    ],
    video_type: 'youtube',
    preview_gif: '../images/gifs_preview/Big_Baby_Tape.mp4',
  },
  {
    id: 'm2lt5PmQgUw',
    hash: null,
    url: 'https://youtu.be/m2lt5PmQgUw?si=bLJCNhDiEjTXbFw-',
    short_name: 'FENDIGLOCK - Лоботомия',
    short_description: 'April 2025',
    name: 'FENDIGLOCK - Лоботомия',
    description: [
      [
        'Directed by  - Aleksandr Cherkasov',
        'Shot by Dima Zimnickiy, Aleksandr Cherkasov, Sher Fayz',
        'Producer - SZN',
        '3D by @ozwiga vfx @twizzy_1ni',
      ],
    ],
    video_type: 'youtube',
    preview_gif: '../images/gifs_preview/FENDIGLOCK.mp4',
  },
  {
    id: 'OpmRuqGNyv0',
    hash: null,
    url: 'https://youtu.be/OpmRuqGNyv0?si=3jrT0cL0X54NDOKs',
    short_name: 'MAYOT - HIGH (Documentary)',
    short_description: ' Fontanka Visual 2024',
    name: 'MAYOT - HIGH (Documentary)',
    description: [
      [
        'Backstage director - Dima Zimnickiy',
        'Editors - Aleksandr & Ivan Cherkasov ',
        'Producer - SZN',
        'Director of Photography - ILUXA100 & Dima Zimnickiy',
      ],
    ],
    video_type: 'youtube',
    preview_gif: '../images/gifs_preview/MAYOT_High.mp4',
  },
  {
    id: 'xTj3X7cc6GA',
    hash: null,
    url: 'https://youtu.be/xTj3X7cc6GA?si=S4hs1lg8qWsIjLYf',
    short_name: 'Кассета - Воздух вода огонь',
    short_description: 'June 2024',
    name: 'Кассета - Воздух вода огонь',
    description: [
      [
        'Directed, shot & edited by Ivan Cherkasov & Dima Zimnickiy',
        'Creative producer — Aleksandr Cherkasov ',
        'Producer — SZN',
      ],
    ],
    video_type: 'youtube',
    preview_gif: '../images/gifs_preview/KASSETA.mp4',
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
      video.video_type,
      video.preview_gif
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
            ${videoData.name}
          </h3>
      
         ${videoData.description
           .map(
             (section, index) =>
               `<div 
                  class="description_section" 
                  style="margin-bottom: ${
                    index < videoData.description.length - 1 ? '2.5rem' : '0'
                  };">
               ${section
                 .map(
                   (line) =>
                     `<p class='video_description'><strong>${line}</strong></p>`
                 )
                 .join('')}
             </div>`
           )
           .join('')}
        </div>
      </div>
    `;
}

document.addEventListener('DOMContentLoaded', loadSelectedVideo);
