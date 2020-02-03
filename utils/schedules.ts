import { compareAsc } from 'date-fns';
import { Schedule } from '../interfaces/Schedule';

const getSchedules = (): Schedule[] => {
  const result: Schedule[] = [
    {
      key: 1,
      topics: '📝Registration',
      speakers: null,
      hours: '08',
      minutes: '30',
      description: null,
      happening: true,
      happened: true
    },
    {
      key: 2,
      topics: 'Opening remarks',
      speakers: null,
      hours: '09',
      minutes: '00',
      description: null,
      happening: true,
      happened: false
    },
    {
      key: 3,
      topics: 'A journey of building large-scale reusable web components',
      speakers: '🗣️Varayut Lerdkanlayanawat 🇩🇪Germany',
      hours: '09',
      minutes: '10',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 4,
      topics: 'Optimization design patterns - from games to web ',
      speakers: '🗣️Yonatan Kra 🇮🇱Israel',
      hours: '09',
      minutes: '40',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 5,
      topics: 'The Art of Crafting Codemods',
      speakers: '🗣️Varayut Lerdkanlayanawat 🇩🇪Germany',
      hours: '10',
      minutes: '10',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 6,
      topics: '👑Our lovely sponsor: KBTG',
      speakers: '🗣️Varayut Lerdkanlayanawat 🇩🇪Germany',
      hours: '10',
      minutes: '40',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 7,
      topics: 'How I met my superset of Javascript ',
      speakers: '🗣️Sirirat Rungpetcharat 🇹🇭Thailand',
      hours: '10',
      minutes: '55',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 8,
      topics: 'What happens when you cancel an HTTP request?',
      speakers: '🗣️Varayut Lerdkanlayanawat 🇩🇪Germany',
      hours: '11',
      minutes: '25',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 9,
      topics:
        'Talking about “Scale”: Takeaways from our attempt on scaling a small system in the Gojek Universe ',
      speakers: '🗣️Tino Thamjarat 🇹🇭Thailand',
      hours: '11',
      minutes: '55',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 10,
      topics: 'Lunch Break',
      speakers: null,
      hours: '12',
      minutes: '25',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 11,
      topics: 'Adventures with the Event Loop ',
      speakers: '🗣️Erin Zimmer 🇦🇺Australia',
      hours: '13',
      minutes: '25',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 12,
      topics: 'End-to-end Type-Safe GraphQL Apps ',
      speakers: '🗣️Carlos Rufo 🇪🇸Spain',
      hours: '13',
      minutes: '55',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 13,
      topics: '👑Our lovely sponsor: Oozou',
      speakers: '🗣️Varayut Lerdkanlayanawat 🇩🇪Germany',
      hours: '14',
      minutes: '25',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 14,
      topics:
        'Applying SOLID principle in JavaScript without Class and Object ',
      speakers: '🗣️Chakrit Likitkhajorn 🇹🇭Thailand',
      hours: '14',
      minutes: '35',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 15,
      topics: 'DevTools, the CSS advocate in your browser ',
      speakers: '🗣️Chen Hui Jing 🇸🇬Singapore',
      hours: '15',
      minutes: '05',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 16,
      topics: '👑Our lovely sponsor: ODDS',
      speakers: null,
      hours: '15',
      minutes: '35',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 17,
      topics:
        "Poor Man's Patcher: A game modder's adventure through serverless sea without money",
      speakers: '🗣️Atthaporn Thanongkiatisak 🇹🇭Thailand',
      hours: '15',
      minutes: '45',
      description: null,
      happening: false,
      happened: false
    },

    {
      key: 18,
      topics: 'Building your first malicious chrome extension 😈',
      speakers: '🗣️Alon Kiriati 🇮🇱Israel',
      hours: '16',
      minutes: '15',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 19,
      topics: '👑Our lovely sponsor: ExxonMobil',
      speakers: null,
      hours: '16',
      minutes: '45',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 20,
      topics: 'Just go for it: The story of dance-mat.js ',
      speakers: '🗣️Ramón Huidobro 🇦🇹Austria',
      hours: '16',
      minutes: '55',
      description: '👑Our lovely sponsor: Oozou ',
      happening: false,
      happened: false
    },
    {
      key: 21,
      topics:
        '[TBD] Speed up heavy data visualization with Rust and WebAssembly ',
      speakers: '🗣️Rujira Aksornsin 🇹🇭Thailand',
      hours: '17',
      minutes: '25',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 22,
      topics: 'A love story written in JavaScript ',
      speakers: '🗣️Ramón Guijarro 🇪🇸Spain',
      hours: '17',
      minutes: '55',
      description: '👑Our lovely sponsor: Oozou ',
      happening: false,
      happened: false
    },
    {
      key: 23,
      topics: 'Closing remarks',
      speakers: null,
      hours: '18',
      minutes: '25',
      description: null,
      happening: false,
      happened: false
    },
    {
      key: 24,
      topics: '🎉Networking party',
      speakers: null,
      hours: '18',
      minutes: '35',
      description: null,
      happening: false,
      happened: false
    }
  ];
  for (let i: number = 0; i < result.length - 1; i += 1) {
    result[i].happened =
      compareAsc(
        new Date(),
        new Date(`2020-02-08T${result[i].hours}:${result[i].minutes}:00+07:00`)
      ) === 1;
    result[i].happening =
      compareAsc(
        new Date(),
        new Date(`2020-02-08T${result[i].hours}:${result[i].minutes}:00+07:00`)
      ) !== -1 &&
      compareAsc(
        new Date(),
        new Date(
          `2020-02-08T${result[i + 1].hours}:${result[i + 1].minutes}:00+07:00`
        )
      ) === -1;
  }
  return result;
};

export default getSchedules;
