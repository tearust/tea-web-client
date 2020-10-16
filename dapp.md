## Dapp ipfs cid

### GOV
[China](http://81.70.96.136:8080/ipfs/Qma9QN2EhbbgmwmubzYWjrB5debwHfZGqFKZ7KvhWL9pYe)

[US](http://159.203.170.228:8080/ipfs/Qma9QN2EhbbgmwmubzYWjrB5debwHfZGqFKZ7KvhWL9pYe)

### Deploy-code
[China](http://81.70.96.136:8080/ipfs/QmNhF9cijRWMkoGuQ4YWac5y19sLV4sE21Mjf9TBTAxya4)

[US](http://159.203.170.228:8080/ipfs/QmNhF9cijRWMkoGuQ4YWac5y19sLV4sE21Mjf9TBTAxya4)

### Deploy-data
[China](http://81.70.96.136:8080/ipfs/QmRt6VjBDM6AR3neWDTddBJ4gFj9u1j68kf5WpHeaaau2k)

[US](http://159.203.170.228:8080/ipfs/QmRt6VjBDM6AR3neWDTddBJ4gFj9u1j68kf5WpHeaaau2k)

### Both deploy code and data Dapp
[China](http://81.70.96.136:8080/ipfs/QmT5bPeA3CGjKHG1uwRD8WdbeQNrdCc49QC2mcPGPobsHz)

[US](http://159.203.170.228:8080/ipfs/QmT5bPeA3CGjKHG1uwRD8WdbeQNrdCc49QC2mcPGPobsHz)

### Deploy code Dapp
[China](http://81.70.96.136:8080/ipfs/QmTAkCtBHzukXVptpVUpuJXw1hN17dwYuLFstaMV66dYZS)

[US](http://159.203.170.228:8080/ipfs/QmTAkCtBHzukXVptpVUpuJXw1hN17dwYuLFstaMV66dYZS)

### Deploy data Dapp
[China](http://81.70.96.136:8080/ipfs/QmWhjP45x7N76nLaCRUdB4MDFL7DMX7KGrAU2hFxgG3vJm)

[US](http://159.203.170.228:8080/ipfs/QmWhjP45x7N76nLaCRUdB4MDFL7DMX7KGrAU2hFxgG3vJm)

-------



## Build and Deploy

### Build dapp
* Copy **.env.dapp.sample** and rename to **.env.dapp** and edit it for your local.
* Run **npm run build:dapp**

### Deploy dapp
* Make sure ipfs command was already in your local.
* Run **npm run deploy:ipfs** and will get as below

```
added QmYASeUiFkjywQb41bMva8Lwro1Ub1MzK7ZVvPECDyuwXz dist/css/app.7ffe8b50.css
added QmNWHg1kuBgNQnfyY1H3ogpvrqySmTQnY8w737ChwSk4N3 dist/css/chunk-vendors.5eb4a479.css
added QmaSyMrhp7Y1bgw5hRDCzwLMgf6piNhawkkVpwUgZ94d3Q dist/favicon.ico
added QmdW4SyD1nRaTVNDghGuUExaFGfTqo77YkC2BzTaueSZSY dist/fonts/element-icons.535877f5.woff
added QmTK9ub7Qz1Am6owBKLMEPXEeq9indNLXBqbo1vLraw3Ct dist/fonts/element-icons.732389de.ttf
added QmbGMWjtG4B1LJvmG7YGr8NzXyTuGRUS81GcUR86pRgfMc dist/index.html
added QmfW4KzmZrY69epur29zu8DD8ntyXvxrqPstTbUoddGRT5 dist/js/app.js
added QmPn5Z4i2sHZeUp1RPS9UZfRygGxp47naCPgcwCvyxmFaa dist/js/chunk-vendors.js
added QmSZMFdUUuJjjN5taXuAkdG9zcmN3ufev6fZpXEv1gMPwB dist/css
added QmbbYe6zixkBsjVzCPwk9Q78QNQuZnXF8LgNZXfuKiLeFq dist/fonts
added QmP5zsFSycmbPNw2WGx6LhmsGuPWZkcqcVCFtzzoVUUynm dist/js
added QmY4jewu1oga5JwhyVJmRvbEcE3WqeGfA7U1WcbRyKxaKV dist
```

* Use your local ipfs gateway to visit the latest cid.
e.g. [http://127.0.0.1:8080/ipfs/QmY4jewu1oga5JwhyVJmRvbEcE3WqeGfA7U1WcbRyKxaKV](http://127.0.0.1:8080/ipfs/QmY4jewu1oga5JwhyVJmRvbEcE3WqeGfA7U1WcbRyKxaKV)

/ip4/81.70.96.136/tcp/4001/p2p/12D3KooWSGik59nn8CSXWL2WprsbKbRmYforZ6ZTuhVCWznBJdYF