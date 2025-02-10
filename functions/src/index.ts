import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';

admin.initializeApp();

const app = express();

// Массив пород собак (breedsDog)
const breedsDog: string[] = [
  "Mestizo",
  "American bully",
  "Akita Inu",
  "Akita Americano",
  "Malamute de Alaska",
  "Pastor de Asia Central",
  "Dogo Argentino",
  "Sabueso del Ariège",
  "Alapaha Blue Blood Bulldog",
  "Kelpie Australiano",
  "Pastor Ganadero Australiano",
  "Mastín Americano",
  "Pinscher Austríaco",
  "Perro Esquimal Americano",
  "Pit Bull Terrier Americano",
  "Alano Español",
  "Tejonero de los Alpes",
  "Terrier Inglés Miniatura",
  "Boyero de Appenzell",
  "Setter Inglés",
  "Affenpinscher",
  "Anglo-Francaise de Petite Vénerie",
  "Aïdi",
  "Pointer Inglés",
  "Terrier de Australia",
  "Sabueso Austríaco Negro y Fuego",
  "Silky Terrier Australiano",
  "Lebrel Afgano",
  "Azawakh",
  "Sabueso Artesiano",
  "Spaniel Springer Inglés",
  "Pit Bull Terrier Americano",
  "Pastor Inglés",
  "Bandog",
  "Mastín Inglés",
  "Basset artesiano de Normandía",
  "Bulldog Americano",
  "Pastor Ovejero Australiano / Aussie",
  "Terrier Americano sin Pelo",
  "Cazador de Mapaches inglo-americano",
  "Foxhound Americano",
  "Africanis",
  "Foxhound Inglés",
  "Alaskan Klee Kai",
  "Perro de Agua Americano",
  "Cocker Spaniel Inglés",
  "Bulldog Inglés",
  "Cocker Spaniel Americano",
  "Terrier Staffordshire Americano",
  "Bull Terrier",
  "Boyero de Berna",
  "Border Terrier",
  "Boerboel",
  "Boubul",
  "Basenji",
  "Bobtail",
  "Border Collie",
  "Bóxer",
  "Beagle",
  "Pastor de Beauce",
  "Dogo de Burdeos",
  "Boston Terrier",
  "Pastor de Brie",
  "Grifón de Bruselas",
  "Perro de San Huberto",
  "Pastor rumano de Bucovina",
  "Bichón Frisé",
  "Braco de Borbón",
  "Pequeño Sabueso de Suiza (Perro de Caza Suizo)",
  "Terrier Brasileño",
  "Perro de Pastor Vasco",
  "Bulldog Campeiro",
  "Munsterländer Grande",
  "Barak Búlgaro",
  "Fila Brasileiro",
  "Galgo Afgano / Bakmhul",
  "Pastor Mongol / Lobero Buriato-Mongol",
  "Gran Boyero Suizo",
  "Bergamasco",
  "Broholmer",
  "Catahoula Bulldog",
  "Collie barbudo",
  "Bedlington Terrier",
  "Pastor Belga",
  "Grifón Belga",
  "Spaniel Bretón",
  "Sabueso Bávaro de Montaña",
  "Pastor Blanco Suizo",
  "Basset Hound",
  "Barbet",
  "Laika de Siberia Oriental",
  "Braco de Weimar",
  "Pastor de Europa del Este",
  "Welsh Corgi Cardigan",
  "Terrier Galés",
  "West Highland White Terrier",
  "Wirehaired Vizsla",
  "Perro Lobo de Saarloos",
  "Volpino Italiano",
  "Springer Spaniel Galés",
  "Ratonero Valenciano",
  "Lebrel Húngaro",
  "Welsh Corgi Pembroke",
  "Perro de Agua Frisón",
  "Grifón Vandeano Basset Pequeño",
  "Braco Húngaro (vizsla)",
  "Keeshond / Spitz Lobo",
  "Gampr Armenio",
  "Galgo Inglés",
  "Sabueso de Hamilton",
  "Pastor belga groenendael",
  "Pastor Holandés",
  "Bichón Habanero",
  "Fox Terrier de Pelo Liso",
  "Perro de Groenlandia",
  "Sabueso de Schiller",
  "Terrier Glen of Imaal",
  "Basset azul de Gascuña",
  "Pastor Griego",
  "Dandie Dinmont terrier",
  "Dálmata",
  "Dóberman",
  "Drever",
  "Braco Alemán de Pelo Duro",
  "Jōmon Shiba",
  "Sabueso de Dunker",
  "Lebrel Escocés",
  "Jack Russell Terrier",
  "Collie de Pelo Largo",
  "Eurasier",
  "Fox terrier de pelo duro",
  "Golden Retriever",
  "Laika de Siberia Occidental",
  "Perro de Agua Irlandés",
  "Perro de Agua Español",
  "Mastín Español",
  "Setter Irlandés",
  "Spinone Italiano",
  "Lobero Irlandés",
  "Irish Soft Coated Wheaten Terrier",
  "Bracco Italiano",
  "Pastor Islandés",
  "Terrier Irlandés",
  "Sabueso Español",
  "Galgo Español",
  "Yorkshire Terrier",
  "Braco Alemán de Pelo Corto",
  "Mastín Italiano",
  "Crestado Chino",
  "Pastor Caucásico",
  "Ca de Bou / Dogo mallorquín",
  "Collie de Pelo Corto",
  "Pinscher miniatura",
  "Cavalier King Charles Spaniel",
  "Kai Ken",
  "Xoloitzcuintle",
  "Presa Canario",
  "Laika de Karelia",
  "Pastor de Karst",
  "Cairn Terrier",
  "Perro lobo de Kunmíng",
  "Cotón de Tulear",
  "Epagneul Papillón",
  "Perro de Chindo",
  "Komondor",
  "Pastor de Anatolia",
  "Retriever de Pelo Rizado",
  "Kromfohrländer",
  "Kerry Blue Terrier",
  "Labrador Retriever",
  "Lebrel Italiano",
  "Labradoodle",
  "Leonberger",
  "Perro Leopardo de Catahoula",
  "Lancashire Heeler",
  "Perro de Muestra Alemán de Pelo Largo",
  "Lagotto Romagnolo",
  "Landseer",
  "Lakeland Terrier",
  "Lhasa Apso",
  "Sabueso de Lucerna (Perro de Caza Suizo)",
  "Bichón Maltés",
  "Maltipoo",
  "Perro Pequeño Belga",
  "Mudi",
  "Manchester Terrier",
  "Perro Guardián de Moscú",
  "Schnauzer estándar / Mittelschnauzer",
  "Perro de Pastor Mallorquín",
  "Pequeño Sabueso de Suiza / Schweizerischer Niederlaufhund",
  "Löwchen / Pequeño Perro León",
  "Pastor de Maremma",
  "Doguillo / Carlino / Pug",
  "Pastor Alemán",
  "Gran Danés",
  "Buhund Noruego",
  "Terrier de Norwich",
  "Mastín Napolitano",
  "Terranova",
  "Terrier Alemán",
  "Terrier de Norfolk",
  "Spitz Alemán Pequeño / Kleinspitz",
  "Spitz Alemán Mediano / Mittelspitz",
  "Spitz Alemán Grande / Grosspitz",
  "Spaniel Alemán",
  "Retriever de Nueva Escocia",
  "Spitz de Norrbotten",
  "Laika Nenets",
  "Perro Pastor Neozelandés",
  "Norsk Lundehund",
  "Perro Pastor Georgiano / Nagazi",
  "Pinscher Alemán",
  "Otterhound",
  "Perro Odis Ucraniano",
  "Braco de Auvernia",
  "Caniche",
  "Pekinés",
  "Pomsky",
  "Pomerania",
  "Parson Russell Terrier",
  "Ratonero de Praga",
  "Petit Brabançon",
  "Perro de Montaña de los Pirineos",
  "Pastor de Valée",
  "Spaniel picardo / Epagneul Picard",
  "Cão de água Português",
  "Pastor de Tatra",
  "Cobrador de Pelo Liso",
  "Pastor de los Pirineos",
  "Mastín del Pirineo",
  "Perro de Caza Polaco / Sabueso Polaco",
  "Ogar Polaco",
  "Puli / Puli Húngaro o Pulik",
  "Pumi Húngaro",
  "Cão da Serra de Aires",
  "Patterdale Terrier",
  "Podenco Portugués",
  "Podenco Ibicenco",
  "Puggle",
  "Rottweiler",
  "Pequeño Perro Ruso",
  "Borzoi / Galgo Ruso",
  "Spaniel de Caza Ruso",
  "Terrier de Rata",
  "Bolonka",
  "Perro de Salón Ruso",
  "Laika Ruso Europeo",
  "Pastor Rumano de Mioritza",
  "Pastor de los Cárpatos",
  "Galgo Poligar",
  "Perro Crestado Rodesiano",
  "Terrier Ruso Negro",
  "Sabueso Ruso",
  "Schnauzer Gigante",
  "Staffordshire Bull Terrier",
  "Samoyedo",
  "Pastor de Asia Central / Alabay",
  "Sussex Spaniel",
  "Sloughi",
  "Sealyham Terrier",
  "Cuvac Eslovaco",
  "San Bernardo",
  "Skye Terrier",
  "Perro Inuit del Norte",
  "Cazador Eslovaco / Slovenský Kopov",
  "Saluki",
  "Shikoku Inu / Kochi-ken",
  "Schipperke",
  "Shiba Inu",
  "Husky Siberiano",
  "Terrier Escocés",
  "Perro Tamaskan",
  "Dogo del Tíbet",
  "Spaniel Tibetano / Tibbie",
  "Terrier Tibetano",
  "Taigan / Galgo Kirguís",
  "Tazy Kazajo / Galgo de Asia Central",
  "Ridgeback Tailandés",
  "Bangkaew Tailandés",
  "Terrier de Tenterfield",
  "Perro Pastor de Tuva",
  "Perro de Montaña de Formosa",
  "Toy Terrier Americano",
  "Sabueso de Transilvania",
  "Tosa Inu",
  "Roosevelt Terrier",
  "Dachshund",
  "Perro Pastor Galés",
  "Cimarrón Uruguayo",
  "Whippet / Lebrel Norteño Inglés",
  "Porcelana",
  "Spaniel Francés",
  "Spitz Finlandés",
  "Fox Terrier",
  "Bichón Boloñés",
  "Spaniel de Campo",
  "Phalène",
  "Boyero de Flandes",
  "Lapphund Finlandés",
  "Sabueso Finlandés",
  "Pharaoh Hound",
  "Bulldog Francés",
  "Hovawart",
  "Hortaya Borzaya / Lebrel del Este",
  "Helleforshund",
  "Perro Pastor Croata",
  "Harrier / Sabueso Liebre Inglés",
  "Hokkaido / Ainu / Seta",
  "Schnauzer Miniatura",
  "Chow Сhow",
  "Retriever de Chesapeake",
  "Perro Lobo Checoslovaco",
  "Terrier Checo",
  "Perro Negro y Fuego Para la Caza del Mapache",
  "Perro de Trineo de Chukotka ",
  "Cirneco del Etna",
  "Chinook",
  "Pastor Bohemio / Chodenhund",
  "Chihuahua",
  "Shar Pei",
  "Shih Tzu",
  "Schapendoes",
  "Gordon Setter / Setter Escocés",
  "Elkhound Blanco Sueco",
  "Pastor Lapón de Suecia",
  "Pastor de Las Islas Shetland",
  "Vallhund Sueco",
  "Sabueso de Schwyz (Perro de Caza Suizo)",
  "Silken Windhound",
  "Airedale Terrier",
  "Cão da Serra da Estrela",
  "Perro Cazador de Estonia",
  "Boyero de Entlebuch",
  "Bruno del Jura (Perro de Caza Suizo)",
  "Pastor del Sur de Rusia / Pastor Ucraniano",
  "Laika de Yakutia",
  "Jämthund / Elkhound sueco",
  "Spitz Japonés",
  "Terrier Japonés / Nihon Teria",
  "Spaniel Japonés / Chin"
];

const breedsCat: string[] = [
      "Mestizo",
      "Gato Abisinio",
      "Misty Australiano",
      "Asian Tabby",
      "Akrinskaya Cat",
      "Gato Americano de Pelo Aspero",
      "Gato Americano de Pelo Corto ",
      "Bobtail Americano de Pelo Largo",
      "Bobtail Americano de Pelo Corto",
      "Curl Americano de Pelo Largo",
      "Curl Americano de Pelo Corto",
      "Gato Anatolio",
      "Mau Árabe / Mau Arábigo",
      "Gato Balinés",
      "Bengala",
      "Bombay",
      "Brasileño de Pelo Corto",
      "Británico de Pelo Largo",
      "Británico de Pelo Corto",
      "Burmés",
      "Burmilla de Pelo Largo",
      "Burmilla de Pelo Corto",
      "Habana Brown",
      "Gato Himalayo",
      "Devon Rex",
      "Gato Doméstico de Pelaje Corto",
      "Don Sphynx",
      "Mau Egipcio",
      "Gato York Chocolate",
      "California Spangled",
      "Felis Chaus / Gato de la Jungla",
      "Khao Manee",
      "Kanaani",
      "Sphynx / Gato Esfinge",
      "Gato Bobtail de Carelia de Pelo Largo",
      "Gato Bobtail de Carelia de Pelo Corto",
      "Gato Común Europeo",
      "Cymric",
      "Gato Color Point",
      "Korat",
      "Cornish Rex",
      "Bobtail Kuriliano de Pelo Largo",
      "Bobtail Kuriliano de Pelo Corto",
      "LaPerm de Pelo Largo",
      "LaPerm de Pelo Corto",
      "Munchkin de Pelo Largo",
      "Munchkin de Pelo Corto",
      "Maine Coon",
      "Bobtail Mekong",
      "Minskin",
      "Gato Manx",
      "Neva Masquerade",
      "German Rex",
      "Nebelung",
      "Bosque de Noruega",
      "Oregon Rex",
      "Gato Oriental de Pelo Largo",
      "Gato Oriental de Pelo Corto",
      "Ojos Azules de Pelo Largo",
      "Ojos Azules de Pelo Corto",
      "Ocicat / Ocigato",
      "Gato Persa",
      "Peterbald",
      "Pixie-bob de Pelo Largo",
      "Pixie-bob de Pelo Corto",
      "Ragamuffin",
      "Azul Ruso",
      "Ragdoll",
      "Savannah",
      "Sagrado de Birmania",
      "Gato Seychellois de Pelo Largo",
      "Gato Seychellois de Pelo Corto",
      "Selkirk Rex de Pelo Largo",
      "Selkirk Rex de Pelo Corto",
      "Serengeti",
      "Gato Siamés",
      "Gato Siberiano",
      "Gato Singapura",
      "Toybob",
      "Hetero Escocés",
      "Fold Escocés",
      "Snowshoe",
      "Sokoke",
      "Gato Somalí",
      "Siamés Tradicional",
      "Gato Toyger",
      "Gato Tonkinés",
      "Angora Turco",
      "Gato Van Turco",
      "Ukrainian Levkoy",
      "Ural Rex de Pelo Largo",
      "Ural Rex de Pelo Corto",
      "Forin White",
      "Chausie",
      "Gato de Ceilán",
      "Chantilly-Tiffany",
      "Cartujo",
      "Gato Egeo",
      "Gato Exótico",
      "Javanés",
      "Bobtail Japonés"
];
/**
 * Ищет в объекте значение поля независимо от регистра.
 * @param data - объект с данными.
 * @param fieldName - имя поля для поиска.
 * @returns значение найденного поля или undefined.
 */
const getFieldValue = (data: any, fieldName: string): any => {
  const lowerField = fieldName.toLowerCase();
  for (const key in data) {
    if (key.toLowerCase() === lowerField) {
      return data[key];
    }
  }
  return undefined;
};

/**
 * Formatea la fecha en el formato dd.mm.yyyy.
 * @param dateStr - cadena con la fecha.
 * @returns la fecha formateada.
 */
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

/**
 * Genera el código HTML para las etiquetas.
 * @param tagsArray - array de etiquetas.
 * @returns cadena con la estructura HTML de las etiquetas.
 */
const generateTags = (tagsArray: any[]): string =>
  tagsArray.map((tag) => `<span class='tag'>${tag}</span>`).join('');

/**
 * Genera la estructura HTML para los puntos de calificación.
 * @param rating - valor de la calificación.
 * @returns cadena con el código HTML de los puntos.
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

app.get('/pet/:petId', async (req: any, res: any) => {
  const petId = req.params.petId;

  try {
    // Obtenemos los datos de la mascota de la colección Firestore
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

    // Mapeos para valores numéricos
    const animalTypeMap: Record<number, string> = {
      0: 'Perro',
      1: 'Gato'
    };

    const genderMap: Record<number, string> = {
      0: 'Macho',
      1: 'Hembra'
    };

    // Usamos getFieldValue para acceder a los campos sin distinguir mayúsculas/minúsculas
    const petName = getFieldValue(petData, 'petName') || 'Desconocido';
    
    const animalTypeValue = getFieldValue(petData, 'animalType');
    const animalType =
      animalTypeValue !== undefined && animalTypeValue !== null
        ? animalTypeMap[animalTypeValue] || 'Tipo desconocido'
        : 'No especificado';

    const genderValue = getFieldValue(petData, 'gender');
    const gender =
      genderValue !== undefined && genderValue !== null
        ? genderMap[genderValue] || 'No especificado'
        : 'No especificado';

    // Procesamos el campo breed utilizando breedsDog para perros
    const breedField = getFieldValue(petData, 'breed');
    let breed: string = 'No especificada';
    if (breedField !== undefined && breedField !== null) {
      if (animalTypeValue === 0) { // Si la mascota es un perro
        const index = parseInt(breedField, 10);
        breed = !isNaN(index) ? (breedsDog[index] || 'Raza desconocida') : breedField;
      } else {
        const index = parseInt(breedField, 10);
        breed = !isNaN(index) ? (breedsCat[index] || 'Raza desconocida') : breedField;
      }
    }

    const birthDateValue = getFieldValue(petData, 'birthDate');
    const birthDate = birthDateValue ? formatDate(birthDateValue) : 'No especificada';

    const weightValue = getFieldValue(petData, 'weight');
    const weight = weightValue ? weightValue + ' kg' : '—';

    const sizeValue = getFieldValue(petData, 'size');
    const size = sizeValue ? sizeValue + ' cm' : '—';

    const additionalNotes = getFieldValue(petData, 'additionalNotes') || 'No hay información adicional.';

    // Para arrays
    const petHealthIssues = Array.isArray(getFieldValue(petData, 'petHealthIssues'))
      ? getFieldValue(petData, 'petHealthIssues')
      : [];
    const vaccinations = Array.isArray(getFieldValue(petData, 'vaccinations'))
      ? getFieldValue(petData, 'vaccinations')
      : [];
    const playPreferences = Array.isArray(getFieldValue(petData, 'playPreferences'))
      ? getFieldValue(petData, 'playPreferences')
      : [];

    // Para la imagen: si thumbnailUrl no está vacío, lo usamos; de lo contrario, imagen por defecto
    const thumbnailUrl = getFieldValue(petData, 'thumbnailUrl');
    const petImage =
      thumbnailUrl && thumbnailUrl.trim() !== ''
        ? thumbnailUrl
        : 'https://via.placeholder.com/360x360?text=Pet+Photo';

    // Calculamos la edad de la mascota (si se especifica la fecha de nacimiento)
    let ageText = '';
    if (birthDateValue) {
      const birthYear = new Date(birthDateValue).getFullYear();
      const currentYear = new Date().getFullYear();
      ageText = `, ${currentYear - birthYear} años`;
    }

    // Formamos la página HTML con los datos dinámicos
    const html = `
      <!DOCTYPE html>
      <html lang='es'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Perfil de la mascota - ${petName}</title>
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
                <img src='${petImage}' alt='Foto de la mascota' />
              </div>
            </div>
            <div class='info-card'>
              <h1 class='pet-name'>${petName}${ageText}</h1>
              <div class='section-title'>Información principal</div>
              <ul class='info-list'>
                <li>Tipo de mascota: ${animalType}</li>
                <li>Sexo: ${gender}</li>
                <li>Raza: ${breed}</li>
                <li>Fecha de nacimiento: ${birthDate}</li>
                <li>Peso / Altura: ${weight} / ${size}</li>
              </ul>
              <div class='divider'></div>
              <div class='section-title'>Acerca de la mascota</div>
              <p class='info-text'>${additionalNotes}</p>
              <div class='section-title'>Salud</div>
              ${
                petHealthIssues.length > 0
                  ? `<div class='tags'>${generateTags(petHealthIssues)}</div>`
                  : `<p class='info-text'>No se conocen problemas de salud.</p>`
              }
              ${
                vaccinations.length > 0
                  ? `<div class='tags'>${generateTags(vaccinations)}</div>`
                  : ''
              }
              <div class='divider'></div>
              ${
                getFieldValue(petData, 'temperament') !== null ||
                getFieldValue(petData, 'friendliness') !== null ||
                getFieldValue(petData, 'activityLevel') !== null
                  ? `<div class='section-title'>Indicadores</div>
                     <div class='rating-row'>
                       <div class='rating-label'>Temperamento</div>
                       <div class='rating-dots'>${generateRatingDots(getFieldValue(petData, 'temperament'))}</div>
                     </div>
                     <div class='rating-row'>
                       <div class='rating-label'>Amabilidad</div>
                       <div class='rating-dots'>${generateRatingDots(getFieldValue(petData, 'friendliness'))}</div>
                     </div>
                     <div class='rating-row'>
                       <div class='rating-label'>Actividad</div>
                       <div class='rating-dots'>${generateRatingDots(getFieldValue(petData, 'activityLevel'))}</div>
                     </div>
                     <div class='divider'></div>`
                  : ''
              }
              <div class='section-title'>Preferencias de juego</div>
              ${
                playPreferences.length > 0
                  ? `<div class='tags'>${generateTags(playPreferences)}</div>`
                  : `<p class='info-text'>No hay preferencias de juego.</p>`
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
    console.error('Error al obtener los datos de la mascota:', error);
    res.status(500).send('Error del servidor');
  }
});

export const petProfile = functions.https.onRequest(app);
