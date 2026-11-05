export interface StoryChapter {
  id: number;
  quote: string;
  subtext: string;
  tag: string;
  dateBadge?: string;
}

export interface GardenFlower {
  id: number;
  name: string;
  color: string;
  bloomColor: string;
  title: string;
  message: string;
  meaning: string;
  position: [number, number, number];
}

export interface MemoryItem {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  imageUrl: string;
  caption: string;
  reflection: string;
  likes: number;
}

export const ROMANTIC_DATA = {
  partnerName: "Mardal",
  creatorName: "Nee Baava",
  birthdayTagline: "Something beautiful was born on this day...",
  heroMainTitle: "Happy Birthday, My Queen ❤️",
  heroSubtitle: "Ee prapancham lo entho mandhi unnaaru, kaani naa gundeki maatram nuvvante entho ishtam mardal.",
  birthdayGirlImage: "/birthday_girl.jpg", // Full website background
  circlePortraitImage: "/birthday_girl_2.jpg", // Small circle place image
  
  // Section 4: Love Story Section (Inner words in Telugu English)
  loveStoryChapters: [
    {
      id: 1,
      quote: "Ninnu edipinchadam naaku entha ishtamo... nuvvu aligithe bathimaaladam anthe ishtam.",
      subtext: "Chinappati nunchi ippatidaaka mana madhya enno godavalu, enno allarlu. Kaani nuvvu chinna kopam tho moothi thippukunte chaalu, naa pranam aagipoyinattu untundhi.",
      tag: "Chapter I · Timeless Bond",
      dateBadge: "Mana Modhati Parichayam"
    },
    {
      id: 2,
      quote: "Nee navvu chusthe chaalu mardal... naa badhalu, thala noppi anni maayam aypothaayi.",
      subtext: "Prathi roju nuvvu chese allari, aa muddu muddhuga matlade matalu vintene naa roju poorthi avthundhi. Nuvvu leni roju asalu roje kaadhu telusa?",
      tag: "Chapter II · Healing Light",
      dateBadge: "Prathi Roju Oka Pandaga"
    },
    {
      id: 3,
      quote: "Malli malli janma antu unte... prathi janmalonu ninnu edipinche baava la nene pudathaa.",
      subtext: "Devudu nannu em korukuntav ani adigithe, 'naa mardal eppudu santhosham ga, naa pakkane undali' ani okkamaate aduguthanu.",
      tag: "Chapter III · Sacred Promise",
      dateBadge: "Koti Janmala Bandham"
    },
    {
      id: 4,
      quote: "Nuvvu naa jeevitham lo oka bhagam kaadhu mardal... nuvve naa motham jeevitham.",
      subtext: "Nuvvu pakkana unte vacche dairyam, aa santhosham ee prapancham lo inkekkadiki vellina dhorakadhu. Nuvve naa pranam, naa lokam.",
      tag: "Chapter IV · Forever & Always",
      dateBadge: "Naa Gunde Chappudu"
    }
  ] as StoryChapter[],

  // Section 5: Interactive Garden Flowers (Inner words in Telugu English)
  gardenFlowers: [
    {
      id: 1,
      name: "The Velvet Rose of Devotion",
      color: "#FF2A6D",
      bloomColor: "#FF6B9D",
      title: "Naa Manasulo Maata",
      message: "Ninnu ishtapadadam naaku evaroo nerpaledhu mardal... adhi naa gunde lo unna praanam tho paate modalayindhi.",
      meaning: "Nijamaina Prema & Ishtam",
      position: [-2.4, -0.4, 0.8]
    },
    {
      id: 2,
      name: "The Golden Blossom of Grace",
      color: "#D4AF37",
      bloomColor: "#F3E5AB",
      title: "Chilipi Navvula Mardal",
      message: "Ee prapancham lo unna puvvulakanna nee pedhavula meedha unde chinna navve laksha retlu andhamga untundhi telusa?",
      meaning: "Santhosham & Velugu",
      position: [-1.2, -0.2, -1.2]
    },
    {
      id: 3,
      name: "The Aurora Blossom of Dreams",
      color: "#C77DFF",
      bloomColor: "#E0AAFF",
      title: "Mana Kalalu",
      message: "Neetho kalisi nadavali, neetho kalisi navvali... jeevitham lo prathi kshanam neetho paate gadapali anedhe naa peddha korika.",
      meaning: "Bhavishyathu & Aasalu",
      position: [0.2, -0.3, 1.4]
    },
    {
      id: 4,
      name: "The White Jasmine of Serenity",
      color: "#FFB3C6",
      bloomColor: "#FFF0F3",
      title: "Naa Manasuku Santhi",
      message: "Baitiki entha allari chesina, nee kannullo chusthe maatram naa manasuki koti devalla thodu unnantha prashantham ga untundhi.",
      meaning: "Nammakam & Sneham",
      position: [1.6, -0.1, -0.6]
    },
    {
      id: 5,
      name: "The Crimson Rose of Passion",
      color: "#E60049",
      bloomColor: "#FF4D80",
      title: "Mana Chilipi Godavalu",
      message: "Nuvvu kopamga moothi thippukunnapudu, 'baaava podhuko' annappudu ninnu chusthe inkaa inkaa muddhosthundhi mardal!",
      meaning: "Muddhula Allari",
      position: [2.5, -0.4, 0.9]
    },
    {
      id: 6,
      name: "The Celestial Lotus of Infinity",
      color: "#FF85A1",
      bloomColor: "#FFD6E0",
      title: "Eppatiki Neethone",
      message: "Aakasam lo nakshathraalu raalipoyina parledhu kaani... mana madhya unna ee prema eppatiki karigiypodhu.",
      meaning: "Tharam Tharam Prema",
      position: [0.0, -0.5, -2.0]
    }
  ] as GardenFlower[],

  // Section 6: Birthday Cake & Wish Options
  cakeSurprise: {
    title: "Make a Birthday Wish, My Queen ✨",
    subtitle: "Kallu rendu moosuko, gundello unna aasa taluchuko... ee candles aarpedham!",
    wishes: [
      "✨ Nee jeevitham antha eppudu navvulu, aahladham tho nindipovali",
      "💫 Nee gundello unna prathi chinna aasa kooda nijam avvali",
      "🌟 Neeku eppudu edhaina kashtam vasthe, daaniki mundhu nee baava nilabadali",
      "❤️ Mana allari, premalu jeevithantham ilage rendu retlu peragali"
    ],
    revealedMessageTitle: "Your Birthday Wish Has Been Heard by the Stars!",
    revealedMessageBody: "Puttinaroju Pandaga Subhakankshalu naa muddula mardal! Nuvvu ee prapancham lo unna andharikanna ekkuvaga santhosham ga undali. Neeku eppudu em kaavalanna ee baava unnadani eppatiki marchipoku. Happy Birthday to my favorite person forever!"
  },

  // Section 7: Love Letter Experience (Heartfelt Telugu English letter from Bava to Mardal)
  loveLetter: {
    date: "A Sacred Birthday Message",
    salutation: "Naa Muddhula Mardal,",
    paragraphs: [
      "Evaraina nannu 'nee jeevitham lo jarigina athi peddha adhrushtam enti?' ani adigithe... kshanam kooda aalochinchakunda 'naa mardal naa jeevitham loki raavadam' ani chepthanu.",
      "Chinnappati nunchi ninnu chusthunna... ninnu edipinchadam, nee jada laagi paripovadam, nuvvu 'baaava undu nanna ki cheptha' ani edusthunte chusi nenu navvukodam... ivi anni ippatiki naa gundello entho theepi gnapakaalu.",
      "Kaani eppudu thelidhu, aa allari pilla eppudu naa gundeloki vachi inta peddha sthaanam sampaadinchukundho. Nuvvu lekapothe asalu naa roju ela untundho kooda nenu oohinchukolenu mardal. Nuvvu navvithe naaku pandaga, nuvvu koncham dull ga unna naaku manasulo edo gaabara.",
      "Ee puttinaroju rojuna nenu neeku oka maata isthunna... nuvvu entha allari chesina, entha thippalu pettina, enni sarlu naatho godava padda—nenu ninnu eppatiki vadulukonu. Ninnu kallallo pettukoni chusukuntanu.",
      "Nee moham meedha unna ee andhamaina navvu eppatiki ilage undali. Puttinaroju Subhakankshalu naa bangaram... I will always be there for you!"
    ],
    closing: "Eppatiki neethone unde,",
    signature: "Nee Allari Baava ❤️"
  },

  // Section 8: Memory Gallery (Headings in English, Inner captions & reflections in authentic Telugu English)
  memories: [
    {
      id: 1,
      title: "Goddess in Crimson Saree",
      category: "Traditional Grace",
      date: "An Unforgettable Vision",
      location: "Mana Illu",
      imageUrl: "/birthday_girl.jpg",
      caption: "Erra cheera kattukuni, thalalo mallepoolu pettukuni chusthunte... nijamga devatha digi vachinatte undhi.",
      reflection: "Nee ee andham chusinappudu naa manasulo okkate maata anipinchindhi... ee ammayi naa mardal avvadam naa poorva janma sukrutham ani.",
      likes: 108
    },
    {
      id: 2,
      title: "Together Forever · Bava & Mardal",
      category: "Together Forever",
      date: "Two Souls, One Bond",
      location: "Pakkane Nuvvu",
      imageUrl: "/memory_together_bava_maradalu.jpg",
      caption: "Naa bhujam meedha cheyyi vesi, iddharam kalisi navvukunna aa madhura kshanam.",
      reflection: "Ee prapancham lo entha mandhi unna... nee pakkana kurchuni, nee cheyyi naa meedha unnapudu vacche santhosham veru mardal. Naaku athi ishtamaina photo idhi.",
      likes: 245
    },
    {
      id: 3,
      title: "Golden Hour Half-Saree Elegance",
      category: "Traditional Grace",
      date: "Terrace Sunset Memories",
      location: "Meda Paina",
      imageUrl: "/memory_cream_lehenga.jpg",
      caption: "Half saree kattukuni terrace meedha gaddam meedha cheyyi pettukuni navvina aa muddhu kshanam.",
      reflection: "Nee sahajamaina andham chusthe maatalu raavu. Bangaram laanti nee manasu, aa chinna navvu koti velugula tho samanam.",
      likes: 142
    },
    {
      id: 4,
      title: "The Shy & Playful Glance",
      category: "Cute & Playful",
      date: "Caught in the Moment",
      location: "Gundello Daachukunna Chotu",
      imageUrl: "/birthday_girl_2.jpg",
      caption: "Edho matladuthu, siggupadi pakkaki chusina aa kshanam.",
      reflection: "Nuvvu siggupadinappudu nee buggallo vacche aa erradanam chusthe... naa manasu pilla gaalila thelipothundhi.",
      likes: 129
    },
    {
      id: 5,
      title: "Purple Silk Royalty & Shy Charm",
      category: "Traditional Grace",
      date: "Festival Evening",
      location: "Adorned in Jasmine",
      imageUrl: "/memory_purple_shy.jpg",
      caption: "Pattu cheera kattukuni, jada meedha poolu petti, mehendi chethulatho siggupadina roju.",
      reflection: "Mana sampradhayam lo nuvvu chala paddhathiga, entho andhamga unnavu. Ninnu chusinappudu naa gunde kshanam aagipoyinatte anipinchindhi.",
      likes: 176
    },
    {
      id: 6,
      title: "Playful Puppy Filter Mischief",
      category: "Cute & Playful",
      date: "Silly Moments of Joy",
      location: "Pure Allari Times",
      imageUrl: "/memory_puppy_filter.jpg",
      caption: "Puppy filter pettukuni allari ga naluka baita petti chesina thuntari selfie!",
      reflection: "Baitiki entha paddhathiga unna... lopaliki maatram nuvvu naa allari pilla vi! Nee ee thuntari allari ante naaku pranam mardal!",
      likes: 198
    },
    {
      id: 7,
      title: "Sunset Garden Serenade",
      category: "Romantic Radiance",
      date: "Golden Sunset Hour",
      location: "Among Blooming Flowers",
      imageUrl: "/memory_sunset_garden.jpg",
      caption: "Sanje velugulo poola madhya nunchuni chethulatho thalani thadumuthunna aa kshanam.",
      reflection: "Aakasam lo suryudu munigipoye velugulo kooda, nee andhame veligipothundhi. Nuvvu unte chuttu unna prathi chotu oka andhamaina thota la maaripothundhi.",
      likes: 164
    }
  ] as MemoryItem[],

  // Section 9: Final Surprise
  finalSurprise: {
    quotePrimary: "Ee prapancham lo unna andhamaina vishayaalanni oka vaipu... naa mardal navvu inkoka vaipu!",
    quoteSecondary: "Happy Birthday, My Forever Love ❤️",
    subtext: "Enni samvathsaraalu marina, enni janmalu vachina... ninnu ilage chusukunta mardal.",
    stats: [
      { label: "Reasons I Adore You", value: "Lekkallenanni" },
      { label: "My Heart's Favorite Person", value: "Always You" },
      { label: "Days I Want to Spend With You", value: "All of Them" },
      { label: "My Sacred Birthday Wish", value: "Your Smile" }
    ]
  }
};
