КАК ЗАГРУЗИТЬ ФОТО :
в корне проекта есть папка images:

- папка main - в ней хранятся фото для карусели на главной странице (как добавить новые?)
- папка projects - папка для проектов с фото - в ней хрянятся проекты по названиям
  Название папки должно быть ТАКИМ ЖЕ как и поле id в примере ниже

пример:

```
  {
    id: 'film_1', // айди проекта - название папки проекта в папке images/projects
    url: 'example4.jpg', // фото которое будет видно в списке фото - просто добавить нужное фото из папки images(не из вложенных папок)
    short_name: 'Saint Laurent', // подпись к фото при наведении
    short_description: 'pre fall 2024', // подпись к фото при наведении
    name: 'Saint Laurent Collection', // подпись к фото при наведении
    description:
      'Detailed description of Saint Laurent pre fall 2024 collection', // описание к фото
  }
```

Должен соблюдаться обязательный паттерн в названии ФОТО, вот примеры названий для фото, которые будут работать :

(P.S. мы можем добавить еще паттерны, которые будут более удобными)

1.jpg
2.png
3.webp
4.gif
5.jpeg
10.jpg
и тд

- 01.jpg
  02.png
  03.webp
  001.jpg
  002.png
  003.webp
  и тд
-

image1.jpg
image2.png
image3.webp
image4.gif
image5.jpeg
image10.jpg
и тд

- image01.jpg
  image02.png
  image03.webp
  image001.jpg
  image002.png
  image003.webp
  и тд
- img1.jpg
  img2.png
  img3.webp
  img4.gif
  img5.jpeg
  img10.jpg
  и тд
- img01.jpg
  img02.png
  img03.webp
  img001.jpg
  img002.png
  img003.webp
  и тд
- photo1.jpg
  photo2.png
  photo3.webp
  photo4.gif
  photo5.jpeg
  photo10.jpg
  и тд
- photo01.jpg
  photo02.png
  photo03.webp
  photo001.jpg
  photo002.png
  photo003.webp
  и тд
- pic1.jpg
  pic2.png
  pic3.webp
  pic4.gif
  pic5.jpeg
  pic10.jpg
  и тд
- pic01.jpg
  pic02.png
  pic03.webp
  pic001.jpg
  pic002.png
  pic003.webp
  и тд
- portfolio_1.jpg
  portfolio_2.png
  portfolio_3.webp
  portfolio_4.gif
  portfolio_5.jpeg
  portfolio_10.jpg
  и тд
- portfolio_01.jpg
  portfolio_02.png
  portfolio_03.webp
  portfolio_001.jpg
  portfolio_002.png
  portfolio_003.webp
  и тд
- portfolio-1.jpg
  portfolio-2.png
  portfolio-3.webp
  portfolio-4.gif
  portfolio-5.jpeg
  portfolio-10.jpg
  и тд
- portfolio-01.jpg
  portfolio-02.png
  portfolio-03.webp
  portfolio-001.jpg
  portfolio-002.png
  portfolio-003.webp

КАК ЗАГРУЗИТЬ ВИДЕО:
