import { compareAsc } from 'date-fns';
import { useLayoutEffect, useState } from 'react';
import { Schedule } from '../../interfaces/Schedule';

export const schedule: Schedule[] = [
  {
    key: 1,
    title: '📝Registration',
    hours: '08',
    minutes: '30',
    happening: true,
    happened: true
  },
  {
    key: 2,
    title: 'Opening remarks',
    hours: '09',
    minutes: '00',
    happening: true,
    happened: false
  },
  {
    key: 3,
    title: 'A journey of building large-scale reusable web components',
    speaker: 'Varayut Lerdkanlayanawat',
    hours: '09',
    minutes: '10',
    position: 'Software Development Engineer @ Amazon',
    image: 'https://javascriptbangkok.com/speaker-images/05.jpg',
    url: 'https://github.com/lvarayut',
    email: 'l.varayut@gmail.com',
    about:
      'I’m Varayut Lerdkanlayanawat.\nI’m currently working as a Software Development Engineer at Amazon based in Berlin, Germany.\nI\'ve officially been in the web development industry for around 9 years.\nI love to share what I know by giving private training sessions to companies,\nworking on open-source projects on <a target="_blank" href="https://github.com/lvarayut">GitHub</a>,\nmaking programming videos on <a target="_blank" href="https://www.youtube.com/c/PasaComputer">YouTube</a>,\nanswering <a target="_blank" href="https://stackoverflow.com/users/1998136/lvarayut">StackOverflow</a> questions,\nand writing tutorials on <a target="_blank" href="https://medium.com/@lvarayut">Medium</a>.\n',
    description:
      'Have you ever wondered what the process of building reusable web components that are used by 200+ developer teams looks like? In this talk, you will be walked through all aspects that need to be considered while designing and implementing reusable web components along with fun real-world examples.\n',
    happening: false,
    happened: false
  },
  {
    key: 4,
    title: 'Optimization design patterns - from games to web',
    speaker: 'Yonatan Kra',
    hours: '09',
    minutes: '40',
    position: 'Staff Engineer @ WalkMe',
    image: 'https://javascriptbangkok.com/speaker-images/02.jpg',
    url: 'https://bit.ly/yk_blog',
    email: 'kra.yonatan@gmail.com',
    about:
      'Yonatan has been involved in some awesome projects in the academy and the industry - from C/C++ through Matlab to PHP and javascript. Former CTO at Webiks. Currently he is a Software Architect at WalkMe and an egghead instructor.\n',
    description:
      'Gamers expect a flawless real-like experience. So do your applications users. Utilizing techniques that are heavily used in games, can help you boost your app’s performance and also save you money in cloud expanses. We’ll see how you can save on CPU, memory and bandwidth with these techniques.\n',
    happening: false,
    happened: false
  },
  {
    key: 5,
    title: 'The Art of Crafting Codemods',
    speaker: 'Rajasegar Chandran',
    hours: '10',
    minutes: '10',
    position: 'Front-end Developer @ Freshworks Inc.',
    image: 'https://javascriptbangkok.com/speaker-images/04.jpg',
    url: 'http://hangaroundtheweb.com/',
    email: 'rajasegar.c@gmail.com',
    about:
      'Rajasegar works with Freshworks as a front-end developer. He is passionate about open-source software and currently writes codemods for the Ember community.\n',
    description:
      'Codemod is a mechanism to make sweeping changes across your code with ease and effectiveness, assisting in large-scale migrations of the code-base. This can be performed through automated tools such as jscodeshift.\n',
    happening: false,
    happened: false
  },
  {
    key: 6,
    title: 'Our lovely sponsor: KBTG',
    speaker: 'Varayut Lerdkanlayanawat',
    hours: '10',
    minutes: '50',
    happening: false,
    happened: false
  },
  {
    key: 7,
    title: 'How I met my superset of Javascript ',
    speaker: 'Sirirat Rungpetcharat',
    hours: '11',
    minutes: '10',
    position: 'CTO @ Builk One Group Co., Ltd.',
    image: 'https://javascriptbangkok.com/speaker-images/14.jpg',
    url: 'https://medium.com/@coalapaparazzi',
    email: 'kra.yonatan@gmail.com',
    about:
      'Sirirat Rungpetcharat (Yui) Chief Technology Officer of Builk One Group Co., Ltd.\nWith 10 years experience in technology field. From mere programmer to CTO with Lead UX Designer position. Cat lady w/ 6 cats under my care.\nWhat’s more to sell? ;)\n',
    description:
      'My love for TypeScript is what people call “destiny”. With strongly-typed, OOP concept and how familiar we’ve been with Angular, etc. But it’s taken me awhile to hop in since changing technology require heavily researching, convincing both my team and the board. I’m here to tell you how my love life be.\n',
    happening: false,
    happened: false
  },
  {
    key: 8,
    title: 'What happens when you cancel an HTTP request?',
    speaker: 'Younes Jaaidi',
    hours: '11',
    minutes: '40',
    position: 'Developer & eXtreme Programming Coach @ Marmicode Wishtack',
    image: 'https://javascriptbangkok.com/speaker-images/08.jpg',
    url: 'https://marmicode.io',
    email: 'yjaaidi@gmail.com',
    about:
      'Younes is a Google Developer Expert for Angular & Web Technologies.\nHe is a trainer, consultant & eXtreme Programming coach who loves the challenge of boosting teams efficiency and helping everyone enjoy every part of their job.\nHis experience convinced him that the key to making quality products is collective ownership, kindness and knowledge sharing.\nOn his spare time, you will find him contributing to open-source software, writing articles or speaking at meetups or conferences… and sometimes sailing.\nHis favorite trick? Adding features by removing code.\n',
    description:
      'Reactive libraries like RxJS allow us to easily cancel HTTP requests but is that really efficient? What really happens on the back-end? Is it possible to propagate the cancelation from the front-end through our microservices and cancel the database query?\n',
    happening: false,
    happened: false
  },
  {
    key: 9,
    title:
      'Talking about “Scale”: Takeaways from our attempt on scaling a small system in the Gojek Universe',
    speaker: 'Tino Thamjarat',
    hours: '12',
    minutes: '00',
    position: 'Product Engineer @ Gojek',
    image: 'https://javascriptbangkok.com/speaker-images/07.jpg',
    url: 'https://vtno.me/',
    email: 'tino@vtno.me',
    about:
      "Tino is a product engineer at Gojek and currently works in the GoFinance team.\nHe loves building products that solve people's problems from random Starbucks in Bangkok,\ncoaching and telling sort of useful stories at conferences.\nHe also loves playing music!\nHe will be super happy to chat about all sort of software engineering topics especially clean code and DevOps.\nTino loves efficiency on every level.\n",
    description:
      'The year is 2019 and every engineer must have been asked once to build a “scalable” system. I will be telling the story of our team journey in building a financial system that serves 20X traffic in less than a year. Engineering practices, wrong (and right!) decisions, process improvement and more!\n',
    happening: false,
    happened: false
  },
  {
    key: 10,
    title: 'Lunch Break',
    hours: '12',
    minutes: '25',
    happening: false,
    happened: false
  },
  {
    key: 11,
    title: 'Adventures with the Event Loop',
    speaker: 'Erin Zimmer',
    hours: '13',
    minutes: '25',
    position: 'Senior Engineer & Thought Leader @ Shine Solutions',
    image: 'https://javascriptbangkok.com/speaker-images/09.jpg',
    url: 'https://ez.codes',
    email: 'ejzimmer@gmail.com',
    about:
      'Erin is a software developer with over ten years experience in a variety of languages,\nfrom JavaScript to Model204 (don’t worry, nobody else has heard of it either).\nShe is currently a senior web developer at Shine Solutions.\nShe is an active member of the Melbourne JavaScript and Angular communities,\nand has spoken at conferences around the world.\nIf you see her at a conference, she’ll probably have knitting needles in hand.\n',
    description:
      'The event loop completely underpins everything that happens in the browser. Yet many developers know very little about it. This talk will help them better understand the nitty-gritty of what’s really going on when you create a Promise, add an event listener, or request an animation frame.\n',
    happening: false,
    happened: false
  },
  {
    key: 12,
    title: 'End-to-end Type-Safe GraphQL Apps',
    speaker: 'Carlos Rufo',
    hours: '13',
    minutes: '55',
    position: 'Organizer @ GraphQL Hong Kong',
    image: 'https://javascriptbangkok.com/speaker-images/10.jpg',
    url: 'https://medium.com/@swcarlosrj',
    email: 'info@carlosrj.com',
    about:
      'Carlos is a passionate developer and speaker aficionado.\nWhile he codes with different B/FE techs, his go-to for every project is his crush: GraphQL.\nHe is very active in the GraphQL ecosystem where he has collaborated with across numerous internal & external projects,\nsuch as SpaceX GraphQL API and recently, co-organizing GraphQL Hong Kong & GraphQL Shenzhen.\nIn his free time he loves stargazing & rocket science, but mostly, help to build a community where everyone could learn about everything!\n',
    description:
      'Discover all the benefits of using GraphQL adding End-to-end Type-Safety to your app with this live-coding talk. At the end of such, you’ll want to refactor your codebase in order to take all the advantages of TypeScript, GraphQL & React working together on a SpaceX demo 🚀\n',
    happening: false,
    happened: false
  },
  {
    key: 13,
    title: 'Our lovely sponsor: Oozou',
    speaker: 'Varayut Lerdkanlayanawat',
    hours: '14',
    minutes: '25',
    happening: false,
    happened: false
  },
  {
    key: 14,
    title: 'Applying SOLID principle in JavaScript without Class and Object',
    speaker: 'Chakrit Likitkhajorn',
    hours: '14',
    minutes: '35',
    position: 'Senior Software Engineer @ Omise',
    image: 'https://javascriptbangkok.com/speaker-images/06.png',
    url: 'https://medium.com/@chrisza',
    email: 'chakrit.lj@gmail.com',
    about:
      'Once VP engineering at Taskworld, now consulting with multiples companies. I am a developer passionate about how to build software as a team and modeling problem inside code.\n',
    description:
      'The SOLID principle is well-known in our industry. However, most of the articles, books, and examples are based on traditional Object-oriented language constructs.\nThis talk will show how can we apply these principles in Javascript where classes are not necessary nor encouraged.\n',
    happening: false,
    happened: false
  },
  {
    key: 15,
    title: 'DevTools, the CSS advocate in your browser',
    speaker: 'Chen Hui Jing',
    hours: '15',
    minutes: '05',
    position: 'Developer Advocate @ Nexmo',
    image: 'https://javascriptbangkok.com/speaker-images/12.jpg',
    url: 'https://www.chenhuijing.com',
    email: 'kakyou_tensai@yahoo.com',
    about:
      'Chen Hui Jing is a self-taught designer and developer living in Singapore, with an inordinate love for CSS, as evidenced by her blog, that is mostly about CSS, and her tweets, which are largely about typography and the web.\nShe used to play basketball full-time and launched her web career during downtime between training sessions.\nHui Jing is currently a Developer Advocate for Nexmo, focusing on growing developer engagement around the APAC region.\n',
    description:
      'New CSS features, like Flexbox, Grid or Shapes, introduce new properties that can sometimes be complicated to people who are encountering them for the first time. This talk will introduce DevTools features that can help us understand what’s going on, and make it less intimidating to try out new CSS.\n',
    happening: false,
    happened: false
  },
  {
    key: 16,
    title: 'Our lovely sponsor: ODDS',
    hours: '15',
    minutes: '35',
    happening: false,
    happened: false
  },
  {
    key: 17,
    title:
      "Poor Man's Patcher: A game modder's adventure through serverless sea without money",
    speaker: 'Atthaporn Thanongkiatisak',
    hours: '15',
    minutes: '45',
    position: 'Application Architect @ EGG Digital, Ascend Group',
    image: 'https://javascriptbangkok.com/speaker-images/13.jpg',
    url: 'https://www.atp-tha.com/',
    email: 'atp.tha77@gmail.com',
    about:
      'Application Architect @ EGG Digital, Ascend Group.\nI cannot stop rambling about Serverless and DevOps.\nMy favorite food is Angular, .NET Core and AWS.\nGame Design enthusiast,\nSelf-proclaimed Music Producer,\nTea &gt; Coffee, still caffeine.\n',
    description:
      'Before the words “DevOps” and “Serverless” even become well-known, I, as a hobbyist Game Modder, was trying to achieve these 2 things using JavaScript and a lot of free services for my mod distribution patcher app. In this talk, I’ll walk you through how I did it and what’s my thinking behind.\n',
    happening: false,
    happened: false
  },
  {
    key: 18,
    title: 'Building your first malicious chrome extension 😈',
    speaker: 'Alon Kiriati',
    hours: '16',
    minutes: '15',
    position: 'Tech Lead @ Dropbox',
    image: 'https://javascriptbangkok.com/speaker-images/11.jpg',
    url: 'https://www.linkedin.com/in/akiriati/',
    email: 'akiriati@hotmail.com',
    about:
      'A tech lead and a full stack developer at Dropbox.\nDuring the last 15 years I’ve been working with companies from any size and shapes - 3 people start ups, 50 medium companies, and 1,000+ corporates, and learned precious lessons from each position I had.\nI’ve been using with a vast variety of languages and frameworks from the very low level of RT/Embedded and all the way "up" to react.js.\nI’m enthusiastic about culture, tech, product and ping pong.\nI believe everything in the world can be expressed with emojis, and one day they will replace all languages 👻\n',
    description:
      'In this talk I will explain the basics of building your first chrome extension, in just a couple of minutes! It takes few more lines to turn it into a malicious one. The main purpose here is not to turn you into a hacker, but to increase awareness to these “small” and “harmless” plugins.\n',
    happening: false,
    happened: false
  },
  {
    key: 19,
    title: 'Our lovely sponsor: ExxonMobil',
    hours: '16',
    minutes: '45',
    happening: false,
    happened: false
  },
  {
    key: 20,
    title: 'Just go for it: The story of dance-mat.js ',
    speaker: 'Ramón Huidobro',
    hours: '16',
    minutes: '55',
    position: 'Freelancer',
    image: 'https://javascriptbangkok.com/speaker-images/03.jpg',
    url: 'https://ramonh.dev',
    email: 'hola@ramonh.dev',
    about:
      'Freelance software dev, avid community member, kitten herder, kids’ coding instructor.\n',
    description:
      'Side projects can be daunting. It takes discipline to get started, and even more so to finish.\nIn this talk, I’ll introduce dance-mat.js, the project for making a Dance Dance Revolution controller with a yoga mat, a Raspberry Pi, conductive paint, and Node.js.\n',
    happening: false,
    happened: false
  },
  {
    key: 21,
    title: 'Speed up heavy data visualization with Rust and WebAssembly',
    speaker: 'Rujira Aksornsin',
    hours: '17',
    minutes: '25',
    position: 'Frontend Developer Team Lead @ AppMan',
    image: 'https://javascriptbangkok.com/speaker-images/15.jpg',
    url: null,
    email: null,
    about: null,
    description:
      'When we need to perform a large data calculation and a large data visualization on the website, performance issues always came as an old familiar friend. This talk will share my experiment on using Rust and WebAssembly to solve this problem base on old project limitations and conditions.\n',
    happening: false,
    happened: false
  },
  {
    key: 22,
    title: 'A love story written in JavaScript',
    speaker: 'Ramón Guijarro',
    hours: '17',
    minutes: '55',
    position: 'Software Engineer @ Undefined Labs',
    image: 'https://javascriptbangkok.com/speaker-images/01.jpg',
    url: 'https://speakerdex.co/soyguijarro',
    email: 'hola@soyguijarro.com',
    about:
      'Ramón is a product-focused web engineer and all-around web lover.\nHe enjoys building user interfaces with JavaScript and React, speaking at conferences, moving fast and learning new things (tech-related or otherwise).\nHe also likes using JavaScript to build stuff beyond the browser and finding out about unexpected uses for the web in general.\nHe cares about community, diversity and inclusion as well.\nMaking up silly personal needs in order to solve them with equally silly code projects is another of his questionable virtues.\n',
    description:
      'Dating apps can feel tedious and like a waste of time.\nIs there a way to skip the grunt work?\nThat’s what I asked myself six months ago when I built Swipr, a tool written in JavaScript that does the swiping for you.\nIn this talk we’ll see how it works and how to built CLIs with Node along the way.\n',
    happening: false,
    happened: false
  },
  {
    key: 23,
    title: 'Closing remarks',
    hours: '18',
    minutes: '25',
    happening: false,
    happened: false
  },
  {
    key: 24,
    title: '🎉Networking party',
    hours: '18',
    minutes: '35',
    happening: false,
    happened: false
  }
];

const checkScheduleTime = (result: Schedule[]) => {
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

const useSchedule = () => {
  const [_schedule, setSchedule] = useState(schedule);

  useLayoutEffect(() => {
    setSchedule(checkScheduleTime(_schedule));
  }, []);

  return _schedule;
};

export default useSchedule;
