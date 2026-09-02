import jb2020 from "@/assets/jb-2020.jpg";
import jb1919 from "@/assets/jb-1919.jpg";
import jb1890 from "@/assets/jb-1890.jpg";
import hampi2020 from "@/assets/hampi-2020.jpg";
import hampi1800 from "@/assets/hampi-1800.jpg";
import hampi1500 from "@/assets/hampi-1500.jpg";
import rf2020 from "@/assets/redfort-2020.jpg";
import rf1857 from "@/assets/redfort-1857.jpg";
import rf1650 from "@/assets/redfort-1650.jpg";

export type Era = {
  year: number;
  label: string;
  image: string;
  caption: string;
  state: "reconstructed" | "archival" | "present";
};

export type Scene = {
  time: string;
  title: string;
  narration: string;
  image: string;
};

export type Monument = {
  id: string;
  name: string;
  location: string;
  built: string;
  tagline: string;
  hero: string;
  confidence: number;
  summary: string;
  significance: string[];
  timeline: { year: string; event: string }[];
  facts: { label: string; value: string }[];
  focus: { label: string; note: string }[];
  simulation: {
    title: string;
    subtitle: string;
    scenes: Scene[];
  };
  eras: Era[];
};

export const monuments: Monument[] = [
  {
    id: "jallianwala-bagh",
    name: "Jallianwala Bagh",
    location: "Amritsar, Punjab",
    built: "Public garden, pre-1900",
    tagline: "The garden that turned a nation",
    hero: jb2020,
    confidence: 97.4,
    summary:
      "A walled public garden beside the Golden Temple. On 13 April 1919, Baisakhi day, thousands gathered here for a peaceful assembly. Colonial troops sealed the single narrow exit and opened fire for roughly ten minutes. The massacre became the moral turning point of India's freedom movement.",
    significance: [
      "The single narrow lane was the only way in or out — the walls you are pointing at still carry bullet marks, preserved exactly where they struck.",
      "The well in the north corner became a mass grave as people leapt in to escape the firing.",
      "News of the massacre pushed Mahatma Gandhi to launch the Non-Cooperation Movement and made independence a mass demand rather than an elite petition.",
      "Rabindranath Tagore renounced his knighthood in protest, one of the first global condemnations of colonial violence in India.",
    ],
    timeline: [
      { year: "1890s", event: "An unremarkable walled garden owned by local families." },
      { year: "13 Apr 1919", event: "Baisakhi gathering; troops fire on an unarmed crowd." },
      { year: "1920", event: "Congress buys the land through public subscription." },
      { year: "1951", event: "Flame of Liberty memorial inaugurated." },
      { year: "2021", event: "Restored complex with a museum and sound-and-light gallery." },
    ],
    facts: [
      { label: "Duration of firing", value: "~10 minutes" },
      { label: "Rounds fired", value: "1,650" },
      { label: "Exits available", value: "1 narrow lane" },
      { label: "Protected since", value: "1920" },
    ],
    focus: [
      { label: "Bullet-marked wall", note: "36 preserved impact marks, north-west wall." },
      { label: "Martyrs' Well", note: "Bodies recovered from within after 13 April." },
      { label: "Flame of Liberty", note: "Red sandstone pylon, added 1951." },
    ],
    simulation: {
      title: "13 April 1919 — 17:15 IST",
      subtitle: "Reconstructed from survivor testimony and the Hunter Commission record",
      scenes: [
        {
          time: "16:30",
          title: "The Baisakhi crowd",
          narration:
            "Families arrive from surrounding villages for the harvest festival. Traders, pilgrims and protestors mix in the dust of the enclosure. Nobody knows a public assembly ban was declared that morning.",
          image: jb1890,
        },
        {
          time: "17:15",
          title: "The lane is sealed",
          narration:
            "Ninety soldiers march in through the only passage and take position on the raised ground. Armoured cars are left outside — the lane is too narrow for them.",
          image: jb1919,
        },
        {
          time: "17:17",
          title: "Ten minutes of firing",
          narration:
            "No warning is given. Firing is directed at the densest parts of the crowd and at the walls people try to climb. 1,650 rounds are spent before the ammunition runs low.",
          image: jb1919,
        },
        {
          time: "Nightfall",
          title: "A curfew over the wounded",
          narration:
            "The city is placed under curfew; the wounded cannot be moved. By morning the garden's dust is a national memory that will not settle for a century.",
          image: jb2020,
        },
      ],
    },
    eras: [
      {
        year: 1890,
        label: "Before",
        image: jb1890,
        caption: "A dusty private garden with a well and a single access lane.",
        state: "archival",
      },
      {
        year: 1919,
        label: "The massacre",
        image: jb1919,
        caption: "13 April 1919 — the assembly, moments before the firing.",
        state: "reconstructed",
      },
      {
        year: 2020,
        label: "Memorial today",
        image: jb2020,
        caption: "Restored memorial gardens with the Flame of Liberty at the centre.",
        state: "present",
      },
    ],
  },
  {
    id: "hampi",
    name: "Hampi — Vijayanagara",
    location: "Ballari, Karnataka",
    built: "c. 1336 CE",
    tagline: "A capital of half a million, in ruins",
    hero: hampi2020,
    confidence: 94.1,
    summary:
      "Capital of the Vijayanagara Empire and, in the 16th century, one of the largest cities on earth. Portuguese travellers described bazaars where diamonds were sold by the measure. After the battle of Talikota in 1565 the city was sacked over months and never reoccupied.",
    significance: [
      "The stone you are pointing at was a colonnaded market street — the Vijayanagara bazaars ran for over a kilometre in front of the temple gopurams.",
      "Water engineering here fed a city of half a million through aqueducts and stepped tanks carved from granite.",
      "The 1565 sack after Talikota is the reason the site is a ruin rather than a living city.",
      "Today a UNESCO World Heritage Site with over 1,600 surviving structures across 4,100 hectares.",
    ],
    timeline: [
      { year: "1336", event: "Vijayanagara founded on the Tungabhadra." },
      { year: "1509–29", event: "Peak under Krishnadevaraya; temples and bazaars expand." },
      { year: "1565", event: "Defeat at Talikota; the capital is sacked and abandoned." },
      { year: "1800", event: "Colonial surveyors record overgrown ruins." },
      { year: "1986", event: "Declared a UNESCO World Heritage Site." },
    ],
    facts: [
      { label: "Peak population", value: "~500,000" },
      { label: "Site area", value: "4,100 hectares" },
      { label: "Standing monuments", value: "1,600+" },
      { label: "Abandoned", value: "1565 CE" },
    ],
    focus: [
      { label: "Mandapa colonnade", note: "Market hall of the Krishna Bazaar." },
      { label: "Stone chariot", note: "Vitthala temple shrine on wheels." },
      { label: "Aqueduct channel", note: "Granite water line to the royal enclosure." },
    ],
    simulation: {
      title: "1520 CE — Market morning at the Krishna Bazaar",
      subtitle: "Reconstructed from Domingo Paes' account and archaeological survey data",
      scenes: [
        {
          time: "Dawn",
          title: "The bazaar wakes",
          narration:
            "Traders unroll cloth under the colonnade you are standing in. Horses from Arabia, pearls from the Gulf and diamonds from Golconda change hands before the heat arrives.",
          image: hampi1500,
        },
        {
          time: "Midday",
          title: "Procession of the king",
          narration:
            "Krishnadevaraya's elephants move down the temple street between painted gopurams — the plaster and pigment now weathered off the stone in front of you.",
          image: hampi1500,
        },
        {
          time: "1565",
          title: "After Talikota",
          narration:
            "The confederate armies enter the undefended capital. Fire and iron work through the bazaars for months; the empire's court flees south and never returns.",
          image: hampi1800,
        },
        {
          time: "Now",
          title: "What the stone kept",
          narration:
            "Only granite survived — the timber upper floors and painted stucco are gone. What you see is the skeleton of a city that once traded with three continents.",
          image: hampi2020,
        },
      ],
    },
    eras: [
      {
        year: 1500,
        label: "Golden age",
        image: hampi1500,
        caption: "AI reconstruction: intact gopurams, painted stucco, living bazaars.",
        state: "reconstructed",
      },
      {
        year: 1800,
        label: "Colonial survey",
        image: hampi1800,
        caption: "Collapsed mandapas overtaken by scrub, recorded by surveyors.",
        state: "archival",
      },
      {
        year: 2020,
        label: "Heritage site",
        image: hampi2020,
        caption: "Conserved ruins under UNESCO protection.",
        state: "present",
      },
    ],
  },
  {
    id: "diwan-i-khas",
    name: "Diwan-i-Khas Throne",
    location: "Red Fort, Delhi",
    built: "1648 CE",
    tagline: "Where the Peacock Throne stood",
    hero: rf2020,
    confidence: 91.8,
    summary:
      "The Hall of Private Audience at Shahjahanabad. The marble platform in front of you once carried the Peacock Throne — a canopy of gem-set gold that took seven years to build. It was carried away by Nadir Shah in 1739 and dismantled.",
    significance: [
      "The empty marble plinth is the exact footprint of the Peacock Throne, the most valuable single object of the 17th century.",
      "Inscribed above the arches: 'If there is a paradise on earth, it is this, it is this, it is this.'",
      "In 1739 Nadir Shah's sack of Delhi removed the throne and the fort's silver ceiling — the beginning of Mughal decline.",
      "In 1857 the last emperor, Bahadur Shah Zafar, held his final court here before exile to Rangoon.",
    ],
    timeline: [
      { year: "1648", event: "Shahjahanabad and the Diwan-i-Khas completed." },
      { year: "1739", event: "Nadir Shah carries off the Peacock Throne." },
      { year: "1857", event: "Bahadur Shah Zafar's last court; the fort is occupied." },
      { year: "1911", event: "Delhi Durbar; the fort becomes an imperial stage." },
      { year: "2007", event: "Red Fort inscribed as a UNESCO World Heritage Site." },
    ],
    facts: [
      { label: "Throne build time", value: "7 years" },
      { label: "Gemstones set", value: "~230 kg of gems" },
      { label: "Looted", value: "1739 CE" },
      { label: "Last court held", value: "1857 CE" },
    ],
    focus: [
      { label: "Marble plinth", note: "Original throne footprint, inlaid pietra dura." },
      { label: "Arch inscription", note: "Amir Khusrau couplet in gilded Persian." },
      { label: "Silver ceiling line", note: "Removed 1739; replaced in copper." },
    ],
    simulation: {
      title: "1650 CE — Court in the Hall of Private Audience",
      subtitle: "Reconstructed from Mughal court chronicles and Bernier's travel record",
      scenes: [
        {
          time: "Morning court",
          title: "The emperor takes the throne",
          narration:
            "Nobles enter by rank and stand in silence. The canopy above the throne is worked in enamel and set with rubies, emeralds and the Koh-i-Noor.",
          image: rf1650,
        },
        {
          time: "Petitions",
          title: "The jury of nobles",
          narration:
            "Provincial governors present accounts, disputes are ruled on within the hour, and imperial orders are sealed at the foot of the platform you are pointing at.",
          image: rf1650,
        },
        {
          time: "1857",
          title: "The last court",
          narration:
            "Two centuries later the same hall is stripped of silver. Bahadur Shah Zafar holds his final audience before the fort becomes a garrison.",
          image: rf1857,
        },
        {
          time: "Now",
          title: "An empty platform",
          narration:
            "The marble remains, the throne does not. What you see is a negative space — the outline of an empire measured by what was carried away.",
          image: rf2020,
        },
      ],
    },
    eras: [
      {
        year: 1650,
        label: "Peacock Throne",
        image: rf1650,
        caption: "AI reconstruction of the hall with the gem-set throne in place.",
        state: "reconstructed",
      },
      {
        year: 1857,
        label: "Rebellion",
        image: rf1857,
        caption: "Stripped and garrisoned after the uprising.",
        state: "archival",
      },
      {
        year: 2020,
        label: "Today",
        image: rf2020,
        caption: "Conserved marble hall, throne platform empty.",
        state: "present",
      },
    ],
  },
];

export const getMonument = (id: string) => monuments.find((m) => m.id === id);
