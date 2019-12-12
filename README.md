# get-calendar-events

### Getting Started

Start here: https://developers.google.com/calendar/quickstart/nodejs

Get the app credential: https://console.cloud.google.com/apis/credentials?project=distracted-3cf0e 

Save it to api.credentials.json

Generate token for the account by running: npm run generate-token

### Running

```
npm run build

npm run release

get-calendar-events --credential=api.credentials.json --token=token.js

 - jq -f clean-filter | jq '{message: (.title + " - " + .hangoutLink)}' | jq  -r .message | slack-illuminate
 - jq -c -f clean-filter  | slack-illuminate
```
