# PubSubHubMock

A Node.js mock server for local testing of PubSubHubBub subscriptions.

## To use

* Clone repo
* Create 'feeds' folder within repo
* Add files you want to publish within 'feeds' folder
* run app.js (defaults to port 9000 unless given a process.env.PORT)
* Open http://localhost:9000 in a browser, you should see a link for each file in your feeds folder

Now you can subscribe to to the mock as you would a normal PubSubHubServer. Your subscription callback can have a port attached and the mock will work it out. i.e.

```
{ callback: 'localhost:1337' }
```

Once you have a subscriber simply click on a link one of your feed files and it will be published.

**N.B.** Your subscription request will be stored in a plain text file called database.txt at root. Don't use a real secret in here.

**TODO**

Subscription verification is not yet in place.

Other things too.
