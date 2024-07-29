export interface IUrl {
    url: string;
    gameName: string;
  }
  
  
export interface EventTypes {
    dates:string[] 
    eventNames:string[] 
    eventTypes:string[] 
    eventLinks:string[] 
  }
  
export interface EventPacked {
    date: string
    event_name: string
    event_type: string
    event_link: string
  }
  
export interface EventSummary {
    current_event: EventPacked[]
    upcoming_event: EventPacked[]
  }