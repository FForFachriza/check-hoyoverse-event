interface IUrl {
  url: string;
  gameName: string;
}

interface ITemplateEvent {
  eventName: string;
  eventDate: string;
  typeEvent: string;
}

const links: IUrl[] = [
  {
    url: "https://genshin-impact.fandom.com/wiki/Event",
    gameName: "Genshin Impact",
  },
  {
    url: "https://honkai-star-rail.fandom.com/wiki/Events",
    gameName: "Honkai Star Rail",
  },
  {
    url: "https://zenless-zone-zero.fandom.com/wiki/Event",
    gameName: "Zenless Zone Zero",
  },
];

let templateEvent: ITemplateEvent[];

(async () => {
  //todo
})();
