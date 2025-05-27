<script lang="js">
import { createApp, ref } from 'vue'
import axios from 'axios'
import { jsonp } from 'vue-jsonp'

import APP from './index.vue'
import webs from './web.vue'
const web = createApp(webs)

let i = 0
let s = 0

export default {
  name: 'mainpage',
  data() {
    return {
      not: '你不应该看到这条信息',
      id: '',
      tips: 1,
      dftitle: '',
      keytitle: '',
      text: '',
      tips: '',
      rawtip: [],
      sug: '',
      hei: '50',
    }
  },

  methods: {
    getips() {
      let key = this.text
      let jsonpScript = null
      window.jsonpCallback = (data) => {
        let tipword = []
        let sug = data.AS.Results
        if (key == '') {
          document.getElementById('tips').classList.add('nohight')
          document.getElementById('tips').classList.remove('hight')
          document.getElementById('so').classList.remove('hastip')
        } else {
          document.getElementById('so').classList.add('hastip')
          document.getElementById('tips').classList.remove('nohight')
          document.getElementById('tips').classList.add('hight')
        }
        try {
          for (i = 0; i < sug.length; i++) {
            for (s = 0; s < sug[i].Suggests.length; s++) {
              tipword.push(sug[i].Suggests[s].Txt)
              this.sug = tipword.length
              if (key == '') {
                this.rawtip = ''
              } else {
                this.keytitle = key
                this.rawtip = tipword
              }
            }
          }
        } catch (error) {
          console.log('ERROR')
        }
      }
      jsonpScript = document.createElement('script')
      jsonpScript.src =
        'https://sg1.api.bing.com/qsonhs.aspx?type=cb&cb=jsonpCallback&q=' +
        key +
        '&_=${Date.now()}'
      document.body.appendChild(jsonpScript)
      document.body.removeChild(jsonpScript)
    },

    blur(event) {
      const id = event.target.parentElement.parentElement.id
      document.getElementById(id).classList.remove('blur')
      document.getElementById('tips').classList.toggle('blur')
      this.getsaying()
      document.getElementById('title').classList.toggle('inp')
    },
    fcs(event) {
      const id = event.target.parentElement.parentElement.id
      document.getElementById(id).classList.add('blur')
      this.dftitle = '想知道什么？'
      document.getElementById('title').classList.add('inp')
      document.getElementById('tips').classList.add('blur')
    },
    async getsaying() {
      try {
        let sayin = await axios.get('https://v1.jinrishici.com/all.json')
        let saying = sayin.data.content
        this.dftitle = 'awa'
        this.dftitle = saying
      } catch (error) {
        console.log('error')
      }
    },
    save(key, item) {
      localStorage.setItem(key, item)
    },
    get(key) {
      localStorage.getItem(key)
    },
    remove(key, item) {
      localStorage.removeItem(key, item)
    },
    search() {
      let key = this.text
      if (key == '') {
        window.open(this.so.url + this.dftitle)
      } else {
        window.open(this.so.url + key)
      }
    },
    check() {
      if (localStorage.getItem('so') == null) {
        let bing = [{ url: 'https://www.bing.com/search?q=', img: '/so/bing.svg', id: 'bing' }]
        localStorage.setItem('so', JSON.stringify(bing))
      }
    },
  },
  computed: {
    title() {
      if (this.text == '') {
        return this.dftitle
      } else {
        return this.text
      }
    },
    classes() {
      return {
        '--height': this.sug * 4 + 3 + 'vh',
        '--textcolor': '#ffffff',
        '--input-width': 'auto',
        '--input-heigh': '4vh',
      }
    },
    so() {
      try {
        return JSON.parse(localStorage.getItem('so'))[0]
      } catch (error) {
        return { url: 'https://www.bing.com/search?q=', img: '/so/bing.svg', id: '1' }
      }
    },
  },
  mounted() {
    web.mount('#websites')
    this.getsaying()
    this.check()
  },
  height() {
    this.hei = this.sug
  },
}
</script>

<template>
  <div :style="classes" id="page">
    <div class="main">
      <div id="title">
        <h1>{{ title }}</h1>
      </div>
      <div class="searchsys">
        <div id="so">
          <div id="input">
            <input
              v-model="text"
              @input="getips"
              id="search"
              @focus="fcs"
              @blur="blur"
              :placeholder="dftitle"
            />
          </div>
          <div id="search">
            <button @click="search()"><img :src="so.img" class="sear" /></button>
          </div>
        </div>
        <div id="tips" class="nohight">
          <a v-for="(rawtip, index) in rawtip" :href="so.url + rawtip" target="_blank">{{
            rawtip
          }}</a>
        </div>
      </div>
    </div>
    <div class="cwebs" id="websites"></div>
  </div>
  <div class="infos" :style="classes">
    <div class="stt">
      <a href="https://github.com/SakuraSenQwQ/startpage">Github</a>
      <a href="setting.html">设置</a>
    </div>
    <p class="ba">
      <a href="https://beian.mps.gov.cn/#/query/webSearch?code=41040302000150" target="_blank"
        >豫公网安备41040302000150号</a
      ><a>&nbsp;|&nbsp;</a
      ><a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2024071946号</a>
    </p>
  </div>
</template>

<style>
.main {
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  width: fit-content;
}
.notic {
  justify-self: center;
  position: absolute;
  display: flex;
  margin: 0;
  top: 0;
  left: 0;
  background-color: rgb(243, 243, 243);
  height: 5vh;
  width: 100vw;
  justify-self: center;
  text-align: center;
  align-items: center;
  justify-content: center;
  h2 {
    color: #ff0000;
  }
}
.nohight {
  height: 0;
  overflow: hidden;
}
.hight {
  height: var(--height);
  overflow: hidden;
}
.cwebs {
  flex-wrap: nowrap;
  justify-content: center;
  display: flex;
  flex: 1;
  max-width: 60vw;
  visibility: visible;
  margin: 2vh;
  align-items: center;
  justify-self: center;
  justify-items: center;
  align-self: center;
}
.infos {
  .stt {
    a {
      color: var(--textcolor);
      margin: 0 2vw 0 2vw;
    }
  }
  a {
    font-size: 1.2vh;
    text-align: center;
    color: var(--textcolor);
  }
  justify-content: center;
  justify-items: center;
  margin-top: auto;
  align-items: center;
  align-self: center;
  z-index: 99;
  position: relative;
}

a {
  text-decoration: none;
}
* {
  outline: none;
  transition: 1s;
}
.inp {
  h1 {
    font-size: 3.5vh !important;
    transition: 0.5s;
  }
}
.hastip {
  border-radius: 2vh 2vh 0 0 !important;
}
.blur {
  backdrop-filter: blur(5px) !important;
}
body {
  background-color: #6b6b6b;
  padding: 0;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  max-height: 100vh;
  background-image: var(--img);
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  #app {
    overflow: hidden;
    display: inline-flex;
    flex-direction: column;
    max-width: 100vw;
    max-height: 100vh;
    height: 100vh;
    flex-direction: column;
  }
  div {
    #title {
      align-self: center;
      width: fit-content;
      justify-self: center;
      align-items: center;
      text-align: center;
      justify-content: center;
      display: flex;
      max-width: 100%;
      overflow: hidden;
      h1 {
        text-align: center;
        align-self: center;
        color: #f4f6ff;
        font-weight: 500;
        text-shadow: #000000 0 0 5px;
        transition: 0.6s;
        text-wrap-mode: nowrap;
        margin: 10vh 0 0.5em 0;
        font-size: 3vh;
        text-align: center;
      }
    }
    .searchsys {
      transition: 1s;
      align-self: center;
      justify-content: center;
      justify-self: center;
      width: 100%;
      margin: 0 1.5vw 0 1.5vw;
      flex-direction: column;
    }
    #so {
      margin: 0 1vw 0 1vw;
      flex: 1;
      height: 3.5vh;
      overflow: hidden;
      background-color: transparent;
      border-radius: 2em;
      display: flex;
      text-align: center;
      flex-direction: row;
      backdrop-filter: blur(1px);
      box-shadow: 0 0 2px;
      #input {
        flex: 1;
        min-width: 0;
        display: flex;
        height: 100%;
        margin: 0;
        align-self: center;
        align-items: center;
        justify-content: center;
        justify-items: center;

        input {
          flex: 1;
          color: var(--textcolor);
          padding: 0.5vw;
          font-size: 2.5vh;
          background-color: transparent;
          border: none;
          border-radius: 2em;
          color: #ffffff;
          text-shadow: #000000 0 0 5px;
        }
        input::placeholder {
          font-size: 0.5em;
          color: #ffffff;
          text-shadow: #000000 0 0 5px;

          bottom: 0.2vh;
        }
      }

      #search {
        margin-left: auto;
        width: fit-content;
        button {
          width: fit-content;
          margin: 0;
          padding: 0;
          width: 5vh;
          height: 100%;
          border: none;
          background-color: transparent;
          .sear {
            justify-self: center;
            align-self: center;
            display: flex;
            width: auto;
            height: 100%;
          }
        }
      }
    }
    #tips {
      flex: 1;
      flex: 1;
      backdrop-filter: blur(1px);
      transition: 1s;
      background-color: transparent;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: start;
      padding: 0 1vh 0 1vh;
      margin: 0 1vw 0 1vw;
      box-sizing: border-box;
      box-shadow: 0 0 5px;
      a {
        width: 100%;
        margin: 0.6vh;
        flex: 1;
        color: #ffffff;
        text-shadow: #000000 0 0 5px;
        font-size: 2vh;
        text-decoration: none;
      }
    }
  }
}
@media (max-width: 767px) {
  .infos {
    margin: 0 0 5vh 0;
    .stt {
      a {
        color: var(--textcolor);
        margin: 0 1vw 0 1vw;
      }
    }
    a {
      font-size: 3vw;
      text-align: center;
      color: var(--textcolor);
    }
    justify-content: center;
    justify-items: center;
    margin-top: auto;
    align-items: center;
    align-self: center;
    z-index: 99;
    position: relative;
  }
  .cwebs {
    max-width: 95vw;
  }
  .inp {
    h1 {
      font-size: 7vw !important;
      transition: 0.5s;
    }
  }
  body {
    padding: 0;
    #app {
      overflow: hidden;
      width: 100vw;
      height: 100vh;
    }
    div {
      #title {
        h1 {
          transition: 0.6s;
          font-size: 2vh;
        }
      }
    }
  }
  #so {
    flex: 1;
    overflow: hidden;
    margin: 0;
    background-color: transparent;
    border-radius: 2em;
    display: flex;
    text-align: center;
    flex-direction: row;
    backdrop-filter: blur(2px);
    box-shadow: 0 0 2px;
    #input {
      flex: 1;
      min-width: 0;
      display: flex;
      height: 100%;
      margin: 0;
      align-self: center;

      input {
        height: 100%;
        flex: 1;
        color: var(--textcolor);
        padding: 0.5vw;
        font-size: 2.5vh;
        background-color: transparent;
        border: none;
        border-radius: 2em;
      }
    }

    #search {
      margin-left: auto;
      width: fit-content;
      button {
        width: fit-content;
        margin: 0 0.2em 0 0;
        width: 5vh;
        height: 100%;
        border: none;
        background-color: transparent;
        .sear {
          justify-self: center;
          align-self: center;
          display: flex;
          width: auto;
          height: 48px;
        }
      }
    }
  }
}
</style>
