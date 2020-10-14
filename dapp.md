## Dapp ipfs cid

### GOV
[China](http://81.70.96.136:8080/ipfs/Qmf3W7EptHXkJBk8Xe2LR4R5k3qFZKEu1Rq7J7wR1pmU9i)

[US](http://159.203.170.228:8080/ipfs/Qmf3W7EptHXkJBk8Xe2LR4R5k3qFZKEu1Rq7J7wR1pmU9i)

### Deploy-code
[China](http://81.70.96.136:8080/ipfs/QmWrw8BQ7AKgVocs826GsD3QoSN1qLSJrBysScydeuZf7B)

[US](http://159.203.170.228:8080/ipfs/QmWrw8BQ7AKgVocs826GsD3QoSN1qLSJrBysScydeuZf7B)

### Deploy-data
[China-todo](http://81.70.96.136:8080/ipfs/QmWrw8BQ7AKgVocs826GsD3QoSN1qLSJrBysScydeuZf7B)

[US-todo](http://159.203.170.228:8080/ipfs/QmWrw8BQ7AKgVocs826GsD3QoSN1qLSJrBysScydeuZf7B)

### Both deploy code and data Dapp
[China-todo](http://81.70.96.136:8080/ipfs/QmfN8jUUqddZbE7K1w5AG84GnYJtkC33LtzhDr9mEmWVYT/)

[US-todo](http://159.203.170.228:8080/ipfs/QmZ9SYocTSUjD5uZX1vvQ5UHS5qHKviiBCw74qyzBEhPsk)

### Deploy code Dapp
[China-todo](http://81.70.96.136:8080/ipfs/QmeUDxyZZ9djsd5YH7ncJmvKeX1t7M2dJyoYeTekDHV1ic/)

[US-todo](http://159.203.170.228:8080/ipfs/QmT6RZobGNWosvC7899YUqwUzBZcGXoJ6df4QZ6FmUyinr)

### Deploy data Dapp
QmTUAJUpqpCyWziGH9YSSVZLQnnPT34UtVdtAZFtZ4UTEk



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