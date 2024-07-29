import * as cheerio from "cheerio";
import type { EventPacked, EventSummary, EventTypes, IUrl } from "./types/types";
import { discordSender } from "./utils/discord-sender";

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
    
    const currentEvent: EventTypes = {
      dates: [],
      eventNames: [],
      eventTypes: [],
      eventLinks: []
    };

    const upcommingEvent: EventTypes = {
      dates: [],
      eventNames: [],
      eventTypes: [],
      eventLinks: []
    }

    // ============= CURRENT EVENT =============
    // Date
    $(".sortable:nth-child(12) td:nth-child(2)").each((i, el) => {
      const element = $(el).text();
      currentEvent["dates"].push(element) 
    });
    // Event Name
    $(".sortable:nth-child(12) br+ a").each((i, el) => {
      const element = $(el)
      currentEvent["eventNames"].push(element.text()) 
      currentEvent["eventLinks"].push(`https://genshin-impact.fandom.com${element.attr("href")!}`)
    });
    // Event Type
    $(".sortable:nth-child(12) td~ td+ td").each((i, el) => {
      const element = $(el).text();
      currentEvent["eventTypes"].push(element) 
    });


    // ============= UPCOMING EVENT =============
    // Date
    $(".sortable:nth-child(14) td:nth-child(2)").each((i, el) => {
      const element = $(el).text();
      upcommingEvent["dates"].push(element) 
    });
    // Event Name
    $(".sortable~ .sortable br+ a").each((i, el) => {
      const element = $(el)
      upcommingEvent["eventNames"].push(element.text()) 
      upcommingEvent["eventLinks"].push(`https://genshin-impact.fandom.com${element.attr("href")!}`)
    });
    // Event Type
    $(".sortable:nth-child(14) td~ td+ td").each((i, el) => {
      const element = $(el).text();
      upcommingEvent["eventTypes"].push(element) 
    });

    
    const currentEventPacked:EventPacked[] = currentEvent["dates"].map((val,i)=>({
      date: val,
      event_name: currentEvent["eventNames"][i],
      event_type: currentEvent["eventTypes"][i],
      event_link: currentEvent["eventLinks"][i]
    }))
    const upcomingEventPacked:EventPacked[] = upcommingEvent["dates"].map((val,i)=>({
      date: val,
      event_name: upcommingEvent["eventNames"][i],
      event_type: upcommingEvent["eventTypes"][i],
      event_link: upcommingEvent["eventLinks"][i]
    }))

    const genshinEventSummary:EventSummary = {
      current_event: currentEventPacked,
      upcoming_event: upcomingEventPacked
    };

    return genshinEventSummary;
  
  } catch (error) {
    console.error('Error fetching Genshin event:', error);
  }
}

async function main() {
  const genshinText = await getGenshinEvent();

  discordSender(genshinText!, "gi")
  
}

main()

