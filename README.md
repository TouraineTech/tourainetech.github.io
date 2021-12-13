Touraine Tech Website
=====================
[![Node.js CI](https://github.com/TouraineTech/tourainetech.github.io/actions/workflows/deployGHPages.yml/badge.svg)](https://github.com/TouraineTech/tourainetech.github.io/actions/workflows/deployGHPages.yml)

To work on the project checkout the `dev` branch.

Do not forget to install dependencies : `npm install`

To have a local live version use : `npm run dev`

To build use : `npm run generate`


## Generate planning
### Extract Conference Hall Data
1. Go to : https://conference-hall.io/organizer/event/${ID}/edit/integrations. Replace ID by the event ID. The ID can be found on the URL after choosing the right event on [conferenceHall](https://conference-hall.io/organizer)
2. Activate HTTP API
3. Copy the API KEY
4. Run `API_KEYS=${API_KEYS_FROM_CH} node tools/conferenceHallJsonExtractor.js`
5. Run `node tools/prePlanningBuilder.js`
6. The file `planning.json` is created. Now you need to fill it with times and rooms.
7. Times and rooms are array of int. You can find the correspondence in `times.json` and `rooms.json` files
