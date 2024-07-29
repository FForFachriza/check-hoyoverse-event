import * as cheerio from "cheerio";

interface IUrl {
  url: string;
  gameName: string;
}

interface ITemplateEvent {
  eventName: string;
  eventDate: string;
  typeEvent: string;
  eventLink: string;
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


async function fetcher(url: string): Promise<string> {
  const response = await fetch(url);
  const text: string = await response.text();
  return text;
}

async function getGenshinEvent() {
  try {
    const html = await fetcher(links[0].url);
    const $ = cheerio.load(html);
    
    const dates:string[] = []
    const eventNames:string[] = []
    const eventTypes:string[] = []
    const eventLinks:string[] = []

    // Date
    $(".sortable:nth-child(12) td:nth-child(2)").each((i, el) => {
      const element = $(el).text();
      dates.push(element) 
    });
    // Event Name
    $(".sortable:nth-child(12) br+ a").each((i, el) => {
      const element = $(el)
      eventNames.push(element.text()) 
      eventLinks.push(`https://genshin-impact.fandom.com${element.attr("href")!}`)
    });
    // Event Type
    $(".sortable:nth-child(12) td~ td+ td").each((i, el) => {
      const element = $(el).text();
      eventTypes.push(element) 
    });



    const currentEvent: ITemplateEvent[] = dates.map((val, i) => ({
      eventDate: val,
      eventName: eventNames[i],
      typeEvent: eventTypes[i],
      eventLink: eventLinks[i]
    }));

    console.log(currentEvent)

  } catch (error) {
    console.error('Error fetching Genshin event:', error);
  }
}

async function main() {
  await getGenshinEvent();
}

main()

