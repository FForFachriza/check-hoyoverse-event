import { WebhookClient } from 'discord.js';
import type { EventSummary } from '../types/types';

let gameName:string

export function discordSender(event:EventSummary, type: "gi"|"hsr"|"zzz") {

  switch (type) {
        case "gi":
            gameName = "Genshin Impact"
            break;
        case "hsr":
            gameName = "Honkai Star Rail"
            break;
        case "zzz":
            gameName = "Zenless Zone Zero"
            break
        default:
            break;
    }

    const webhookClient =  new WebhookClient({
        url: Bun.env.DISCORD_WEBHOOK!
      });
      
      function formatEvent(eventDetail:any) {
        return `**Event Name:** [${eventDetail.event_name}](${eventDetail.event_link})\n**Date:** ${eventDetail.date}\n**Event Type:** ${eventDetail.event_type}\n`;
      }
      
      const formattedCurrentEvents = event.current_event.map(formatEvent).join('\n');
      const formattedUpcomingEvents = event.upcoming_event.map(formatEvent).join('\n');
      
      const message = `
      **${gameName}**\n**Current Events:**\n\n${formattedCurrentEvents}\n**Upcoming Events:**\n\n${formattedUpcomingEvents}
      `;
      
      webhookClient.send({
        content: message,
        username: 'Event Bot',
        avatarURL: 'https://i.imgur.com/KEungv8.png',
      });
}
