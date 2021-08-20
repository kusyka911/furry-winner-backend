# furry-winner-backend

Backend app for [furry-winner](https://github.com/kusyka911/furry-winner)

Create config file named `.app-config.json` as in example bellow.

```json
{
    "PORT": 9090, // Frontend app configured to use port 9090 to proxy requests to backend
    "API_KEYS": {
        "YAHOO_FIN": "API_KEY for https://rapidapi.com/apidojo/api/yahoo-finance1",
        "SEND_GRID": "API_KEY for https://rapidapi.com/sendgrid/api/sendgrid"
    }
}
```

run `yarn start` to launch.