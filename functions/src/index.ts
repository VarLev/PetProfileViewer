import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';

admin.initializeApp();

const app = express();

/**
 * Форматирует дату в формате dd.mm.yyyy.
 * @param dateStr - строка с датой.
 * @returns отформатированную дату.
 */
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

/**
 * Генерирует HTML-код для тегов.
 * @param tagsArray - массив тегов.
 * @returns строку с HTML-разметкой тегов.
 */
const generateTags = (tagsArray: any[]): string =>
  tagsArray.map((tag) => `<span class='tag'>${tag}</span>`).join('');

/**
 * Генерирует HTML-разметку для рейтинговых точек.
 * @param rating - значение рейтинга.
 * @returns строку с HTML-кодом точек.
 */
const generateRatingDots = (rating: any): string => {
  let dots = '';
  const max = 5;
  const r = parseInt(rating, 10) || 0;
  for (let i = 1; i <= max; i += 1) {
    dots += i <= r ? '<span class="filled"></span>' : '<span></span>';
  }
  return dots;
};

app.get('/pet/:petId', async (req, res) => {
  const petId = req.params.petId;

  try {
    // Получаем данные питомца из коллекции Firestore
    const petDoc = await admin
      .firestore()
      .collection('petProfiles')
      .doc(petId)
      .get();
    if (!petDoc.exists) {
      res.redirect('https://petmap.app');
      return;
    }
    const petData = petDoc.data();
    if (!petData) {
      res.status(500).send('Invalid pet data');
      return;
    }

    // Маппинги для числовых значений
    const animalTypeMap: Record<number, string> = {
      0: 'Собака',
      1: 'Кошка'
      // можно добавить другие типы
    };

    const genderMap: Record<number, string> = {
      0: 'Кобель',
      1: 'Сучка'
      // при необходимости расширить
    };

    const breedMap: Record<number, string> = {
      1: 'Лабрадор'
      // можно добавить другие породы
    };

    // Извлекаем данные с проверками и подстановками значений по умолчанию
    const petName = petData.PetName || 'Неизвестно';
    const animalType =
      petData.AnimalType !== undefined && petData.AnimalType !== null
        ? animalTypeMap[petData.AnimalType] || 'Неизвестный тип'
        : 'Не указан';
    const gender =
      petData.Gender !== undefined && petData.Gender !== null
        ? genderMap[petData.Gender] || 'Не указан'
        : 'Не указан';
    const breed =
      petData.Breed !== undefined && petData.Breed !== null
        ? breedMap[petData.Breed] || 'Неизвестная порода'
        : 'Не указана';
    const birthDate = petData.BirthDate ? formatDate(petData.BirthDate) : 'Не указана';
    const weight = petData.Weight ? petData.Weight + ' кг' : '—';
    const size = petData.Size ? petData.Size + ' см' : '—';
    const additionalNotes = petData.AdditionalNotes || 'Нет дополнительной информации.';

    // Проверяем, что поля являются массивами
    const petHealthIssues = Array.isArray(petData.PetHealthIssues)
      ? petData.PetHealthIssues
      : [];
    const vaccinations = Array.isArray(petData.Vaccinations)
      ? petData.Vaccinations
      : [];
    const playPreferences = Array.isArray(petData.PlayPreferences)
      ? petData.PlayPreferences
      : [];

    // Для изображения: если ThumbnailUrl не пустой, используем его; иначе стандартное изображение
    const petImage =
      petData.ThumbnailUrl && petData.ThumbnailUrl.trim() !== ''
        ? petData.ThumbnailUrl
        : 'https://via.placeholder.com/360x360?text=Pet+Photo';

    // Рассчитываем возраст питомца (если дата рождения указана)
    let ageText = '';
    if (petData.BirthDate) {
      const birthYear = new Date(petData.BirthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      ageText = `, ${currentYear - birthYear} года`;
    }

    // Формируем HTML-страницу с динамическими данными
    const html = `
      <!DOCTYPE html>
      <html lang='ru'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Профиль питомца - ${petName}</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link href='https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap' rel='stylesheet' />
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: 'Nunito Sans', sans-serif;
            background-color: #f5f5f5;
            color: #333;
          }
          .page-container {
            display: flex;
            justify-content: center;
            padding: 20px;
          }
          .pet-profile {
            max-width: 360px;
            width: 100%;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .carousel-container {
            position: relative;
            width: 100%;
            padding-top: 100%;
            overflow: hidden;
          }
          .carousel-slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 0.5s ease;
          }
          .carousel-slide.active {
            opacity: 1;
          }
          .carousel-slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .pagination {
            position: absolute;
            top: 50%;
            right: 15px;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 8px;
            z-index: 1;
          }
          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: rgba(255,255,255,0.5);
            cursor: pointer;
          }
          .dot.active {
            background-color: #6C49B1;
          }
          .info-card {
            position: relative;
            background-color: #fff;
            border-top-left-radius: 26px;
            border-top-right-radius: 26px;
            margin-top: -40px;
            padding: 20px;
            box-shadow: 0 -2px 8px rgba(0,0,0,0.06);
          }
          .pet-name {
            font-size: 20px;
            font-weight: 400;
            margin-bottom: 12px;
            color: #333;
          }
          .divider {
            height: 1px;
            background-color: #e0e0e0;
            margin: 16px 0;
          }
          .section-title {
            font-size: 16px;
            font-weight: 600;
            color: #6C49B1;
            margin-bottom: 8px;
          }
          .info-list {
            list-style: none;
            font-size: 14px;
            color: #555;
            margin-bottom: 16px;
          }
          .info-list li {
            margin-bottom: 6px;
            line-height: 1.4;
          }
          .info-text {
            font-size: 14px;
            line-height: 1.4;
            color: #555;
            margin-bottom: 12px;
          }
          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
          }
          .tag {
            background-color: #F5ECFF;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 14px;
          }
          .rating-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
          }
          .rating-label {
            font-size: 14px;
            color: #555;
          }
          .rating-dots {
            display: flex;
            gap: 4px;
          }
          .rating-dots span {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #ddd;
          }
          .rating-dots .filled {
            background-color: #BFA8FF;
          }
          @media (max-width: 480px) {
            .page-container {
              padding: 10px;
            }
            .info-card {
              padding: 15px;
            }
            .pet-name {
              font-size: 18px;
            }
            .section-title {
              font-size: 15px;
            }
            .info-list {
              font-size: 13px;
            }
            .info-text {
              font-size: 13px;
            }
            .tag {
              font-size: 13px;
            }
          }
        </style>
      </head>
      <body>
        <div class='page-container'>
          <div class='pet-profile'>
            <div class='carousel-container'>
              <div class='carousel-slide active'>
                <img src='${petImage}' alt='Фото питомца' />
              </div>
            </div>
            <div class='info-card'>
              <h1 class='pet-name'>${petName}${ageText}</h1>
              <div class='section-title'>Основное</div>
              <ul class='info-list'>
                <li>Тип питомца: ${animalType}</li>
                <li>Пол: ${gender}</li>
                <li>Порода: ${breed}</li>
                <li>Дата рождения: ${birthDate}</li>
                <li>Вес / Рост: ${weight} / ${size}</li>
              </ul>
              <div class='divider'></div>
              <div class='section-title'>О питомце</div>
              <p class='info-text'>${additionalNotes}</p>
              <div class='section-title'>Здоровье</div>
              ${
                petHealthIssues.length > 0
                  ? `<div class='tags'>${generateTags(petHealthIssues)}</div>`
                  : `<p class='info-text'>Нет известных проблем со здоровьем.</p>`
              }
              ${
                vaccinations.length > 0
                  ? `<div class='tags'>${generateTags(vaccinations)}</div>`
                  : ''
              }
              <div class='divider'></div>
              ${
                petData.Temperament !== null ||
                petData.Friendliness !== null ||
                petData.ActivityLevel !== null
                  ? `<div class='section-title'>Показатели</div>
                     <div class='rating-row'>
                       <div class='rating-label'>Темперамент</div>
                       <div class='rating-dots'>${generateRatingDots(
                         petData.Temperament
                       )}</div>
                     </div>
                     <div class='rating-row'>
                       <div class='rating-label'>Дружелюбность</div>
                       <div class='rating-dots'>${generateRatingDots(
                         petData.Friendliness
                       )}</div>
                     </div>
                     <div class='rating-row'>
                       <div class='rating-label'>Активность</div>
                       <div class='rating-dots'>${generateRatingDots(
                         petData.ActivityLevel
                       )}</div>
                     </div>
                     <div class='divider'></div>`
                  : ''
              }
              <div class='section-title'>Игровые предпочтения</div>
              ${
                playPreferences.length > 0
                  ? `<div class='tags'>${generateTags(playPreferences)}</div>`
                  : `<p class='info-text'>Нет игровых предпочтений.</p>`
              }
            </div>
          </div>
        </div>
        <script>
          (function () {
            const slides = document.querySelectorAll('.carousel-slide');
            const dots = document.querySelectorAll('.dot');
            let currentIndex = 0;
            function showSlide(index) {
              slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
                if (dots[i]) {
                  dots[i].classList.toggle('active', i === index);
                }
              });
            }
            dots.forEach((dot, index) => {
              dot.addEventListener('click', () => {
                currentIndex = index;
                showSlide(currentIndex);
              });
            });
            showSlide(currentIndex);
          })();
        </script>
      </body>
      </html>
    `;

    res.status(200).send(html);
  } catch (error) {
    console.error('Ошибка получения данных питомца:', error);
    res.status(500).send('Ошибка сервера');
  }
});

export const petProfile = functions.https.onRequest(app);
