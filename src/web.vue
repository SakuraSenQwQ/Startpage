<script lang="js">
import axios from 'axios'

export default {
  data() {
    return {
      h: '',
      imgurl: null,
      website: JSON.parse(localStorage.getItem('website')),
      count: '',
      del: 'false',
      not: '你不应看到这条消息，如果看到，请立即反馈',
    }
  },
  methods: {
    golink(website, index) {
      if (localStorage.getItem('del') == 'true') {
        let id = index
        this.delweb(id)
      } else {
        window.open(website.url)
      }
    },
    delweb(id) {
      let id1 = id
      let webs = JSON.parse(localStorage.getItem('website'))
      webs.splice(id1, 1)
      localStorage.setItem('website', JSON.stringify(webs))
      this.website = JSON.parse(localStorage.getItem('website'))
      this.check()
    },
    save(key, item) {
      localStorage.setItem(key, item)
    },
    get(key) {
      try {
        localStorage.getItem(key)
      } catch (error) {
        console.log(error)
      }
    },
    check() {
      this.website = JSON.parse(localStorage.getItem('website'))
      if (
        document.getElementById('webs').scrollHeight >
        document.getElementById('webpage').scrollHeight + 20
      ) {
        document.getElementById('more').classList.remove('none')
      } else {
        document.getElementById('more').classList.add('none')
      }
      if (localStorage.getItem('del') == 'true') {
        document.getElementById('notic').classList.remove('none')
        this.not = '删除模式已开启，点击链接后将会删除'
      }
    },
    remove(key, item) {
      localStorage.removeItem(key, item)
    },
    more() {
      this.h = document.getElementById('webs').scrollHeight + 'px'
      document.getElementById('webs').classList.toggle('more')
    },
  },
  computed: {
    notic() {
      return this.not
    },
    classe() {
      return {
        '--h': this.h,
      }
    },
    webs() {
      return this.website
    },
  },
  mounted() {
    this.check()
  },
}
</script>

<template>
  <div class="notic none" id="notic">
    <h2>{{ notic }}</h2>
  </div>
  <div :style="classe" class="webpage" id="webpage">
    <div class="webs" id="webs">
      <div
        v-for="(website, index) in webs"
        @click="golink(website, index)"
        class="website"
        :id="index"
      >
        <div id="info">
          <div id="text">
            <div class="tit">
              <div class="webimg">
                <img :src="website.url + '/favicon.ico'" onerror="this.src='/src/internet.svg'" />
              </div>
              <a id="t">{{ website.web }}</a>
            </div>
            <a id="u">{{ website.url }}</a>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button @click="more()" class="button none" id="more">
        <img src="/src/more.svg" />
      </button>
    </div>
  </div>
</template>

<style>
#text {
  width: fit-content;
  display: grid;
  flex-direction: column;
  a {
    width: fit-content;
    height: fit-content;
    margin: 0;
    padding: 0;
  }
  .tit {
    width: fit-content;
    .webimg {
      height: 100%;
    }
    overflow: hidden;
    display: flex;
    justify-content: start;
    align-items: flex-start;
    justify-items: start;
    img {
      border-radius: 0.5vw;
      margin: 0.2vh;
      align-self: flex-start;
      justify-self: flex-start;
      height: 100%;
      object-fit: contain;
    }
    #t {
      font-size: 2vh;
      text-overflow: ellipsis;
      font-weight: 900;
      color: rgb(255, 255, 255);
      text-shadow: #000000 0 0 5px;
    }
  }

  #u {
    padding: 0 0 0.1em 0.2em;
    font-size: 0.8vh;
    text-overflow: ellipsis;
    color: rgb(255, 255, 255);
    text-shadow: #000000 0 0 5px;
  }
}
.none {
  display: none;
}
.webpage {
  justify-content: start;
  justify-items: flex-start;
  width: fit-content;
  display: flex;
}
.button {
  border: 0;
  background-color: transparent;
  img {
    align-self: center;
    justify-self: center;
    text-align: center;
    width: 4vh;
  }
  height: fit-content;
  width: fit-content;
  margin: 0 0 0 0.5vw;
  justify-self: flex-start;
}
* {
  outline: none;
  transition: 1s;
}
.more {
  overflow: hidden;
  transition: 1s;
  max-height: var(--h) !important;
}
.none {
  display: none !important;
}
::-webkit-scrollbar {
  display: none;
}
.webs {
  justify-content: center !important;
  flex-wrap: wrap;
  overflow: hidden;
  max-height: 4.5vh;
  scrollbar-width: 0;
  justify-content: start;
  display: inline-flex;
  max-width: 90vw;
  overflow-x: scroll;
  overflow-y: hidden;
  .website {
    #text {
      padding: 0 0.2vw 0 0;
    }
    box-sizing: border-box;
    display: flex;
    width: fit-content;
    justify-content: center;
    align-items: center;
    justify-items: center;
    height: 4.5vh;
    #info {
      padding: 0.4em;
      height: 100%;
      overflow: hidden;
      width: fit-content;
      display: flex;
    }
    a {
      font-weight: 500;
      color: #000000;
      text-align: center;
      font-size: 2vh;
    }
    box-shadow: 0 0 0 1px inset;
    cursor: pointer;
    width: fit-content;
    margin: 0 0.5vh 0.5vh 0.5vh;
    backdrop-filter: blur(29px);
    background-color: transparent;
    border-radius: 12px;
  }
}

@media (max-width: 767px) {
}
</style>
