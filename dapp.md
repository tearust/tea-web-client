## Dapp ipfs cid

### Both deploy code and data Dapp
QmegNPysAxUwVX4YW7yixCv422vcRW5g8St18VjXuRJKeC

### Deploy code Dapp
QmaoGqAoXnD913HQtnW9YeWVuZYodg1R15eGREjLVvfu1A

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