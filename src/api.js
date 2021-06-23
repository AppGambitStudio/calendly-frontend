import { API } from 'aws-amplify';
import gql from 'graphql-tag'

export const getMyProfile = async () => {
    const result = await API.graphql({
      query: gql`
        query MyProfile {
            myProfile {
                id 
                email
                createdOn
                hasLink
                hasSchedule
                id
                link
                schedule {                                        
                    mon
                    tue
                    wed
                    thu
                    fri
                    sat
                    sun
                    startHour
                    endHour
                }
            }
        }
      `,
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })
    const profile = result.data.myProfile      
    return profile
}

export const getMyEvents = async () => {
    const result = await API.graphql({
      query: gql`
        query GetMyEvents {            
            myEvents {
                events {
                id
                eventName
                duration
                shortName
                }
            }            
        }
      `,
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })
    const events = result.data.myEvents.events
    return events
}

export const getMySessions = async (startDate, endDate) => {
  const result = await API.graphql({
    query: gql`
      query GetMySessions ($startDate: AWSDate, $endDate: AWSDate) {            
          mySessions (startDate: $startDate, endDate: $endDate) {
              sessions {
                duration
                sessionTime
                contactName
                contactEmail
                userTimezone
              }
          }
      }
    `,
    variables: {
      startDate,
      endDate
    },
    authMode: "AMAZON_COGNITO_USER_POOLS"
  })
  const events = result.data.mySessions.sessions
  return events
}

export const CreateEvent = async (event) => {
    const result = await API.graphql({
      query: gql`        
        mutation CreateEvent($eventName: String, $shortName: String, duration: $duration) {
            addEvent(eventName: $eventName, shortName: $shortName, duration: $duration) {
                duration
                eventName
                id
                shortName
            }
        }        
      `,
      variables: {
        eventName: event.eventName,
        shortName: event.shortName,
        duration: event.duration
      },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })
    const newEvent = result.data.CreateEvent      
    return newEvent
}

export const setMySchedule = async (schedule) => {
    const result = await API.graphql({
      query: gql`        
        mutation SetUserSchedule(schedule: $schedule) {
            setWorkingDays(schedule: $schedule){
                hasSchedule
            }
        }     
      `,
      variables: {
        schedule
      },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })
    const updatedSchedule = result.data.setWorkingDays      
    return updatedSchedule
}

export const setUniqueLink = async (link) => {
    const result = await API.graphql({
      query: gql`        
        mutation SetUserLink {
           setUserLink(link: $link) 
        }        
      `,
      variables: {
        link
      },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })
    return result;
}