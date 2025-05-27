<template>
  <div id="not"></div>
  <div class="alert nodisplay" id="alerterror">
    <div class="content">
      <h1>OOPZ..</h1>
      <h2>我们发现了一个错误..</h2>
      <p>
        <a class="why">{{ errors }}</a>
      </p>
      <div class="sel">
        <button>问题反馈</button>
        <button @click="closed()">我已知晓</button>
      </div>
    </div>
  </div>
  <div class="alert nodisplay" id="alert">
    <div class="content">
      <h1>提示</h1>
      <p>
        <a class="why">{{ alertip }}</a>
      </p>
      <div class="sel">
        <button onclick="window.location.href='/'">返回主页</button>
        <button onclick="document.getElementById('alert').style.width = '0'">我已知晓</button>
      </div>
    </div>
  </div>
  <div class="costm" id="costm" @click="close($event)">
    <div class="title disp" id="ctitle">
      <h1>自定义搜索</h1>
    </div>
    <div class="input disp" id="cinput">
      <input placeholder="搜索链接" id="cinp" />

      <button @click="cstms2()">确定</button>
    </div>
    <div class="ti disp" id="ti"><p>示例：https://www.bing.com/search?q=</p></div>
  </div>
  <div class="setting">
    <div>
      <h1 style="color: #ffffff; text-shadow: #ff0000 2px 2px; font-size: 3rem">
        <a href="/" class="back">[返 回 主 页]</a>
      </h1>
      <h1>添加主页快捷网站</h1>
    </div>
    <div class="addwebs">
      <div class="add">
        <input id="name" placeholder="网站名" /><input placeholder="网站地址" id="url" />
      </div>
      <p>网站地址格式应填写完整：</p>
      <p>示例：https://sakurasen.cn</p>
      <button @click="upweb()">增加网站</button>
      <button @click="delmod()">切换删除模式</button>
    </div>
    <h1>搜索引擎选择</h1>
    <div class="selso">
      <div class="sos" v-for="search in search" :id="search.id" @click="selso(search.id)">
        <img :src="search.img" alt="" /><a>{{ search.id }}</a>
        <a v-if="so[0].id == search.id" style="color: red; font-weight: 600">当前使用</a>
      </div>
    </div>
    <h1>背景设置</h1>
    <div class="bg">
      <input type="file" placeholder="No" id="bgImage" accept="image/*" />
    </div>
    <button @click="useback">使用/清除背景</button><button @click="bin"><a>bing每日壁纸</a></button>
  </div>
</template>

<style>
.back:visited {
  color: #ffffff;
}
.bg {
  overflow: hidden;
  width: fit-content;
  display: flex;
  background-color: #ffffff;
  height: fit-content;
  button {
    margin: 0 0 0 1vw;
    border: none;
    background-color: #000000;
    color: #ffffff;
  }
}
#bgImage {
  align-self: flex-end;
  justify-self: center;

  background-color: #ffffff;
}
.add {
  input {
    border: none;
    width: 12vh;
    margin: 0 1vh 0 0;
    height: 2vh;
  }
}
.addwebs {
  p {
    font-size: 1.5rem;
    color: #ff4d4d;
    text-shadow: #000000 0 2px;
  }
  button {
    border-radius: 12px;
    cursor: pointer;
    margin: 0 2vw 0 0;
    border: none;
    background-color: #ffffff;
    width: fit-content;
    height: 3vh;
  }
}
.setting {
  h1 {
    color: rgb(255, 255, 255);
    text-shadow: #000000 0 0 5px;
  }
}
.costm {
  pointer-events: none;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  align-items: center;
  .title {
    margin-top: 15vh;
  }
  .input {
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    input {
      margin: 0;
      padding: 0;
      border: none;
      width: 20vh;
      height: 100%;
    }
    button {
      font-size: 1.2rem;
      padding: 0.5vh;
      margin: 0;
      border: none;
      height: 100%;
      align-self: center;
    }
  }
}
* {
  flex-wrap: wrap;
}
.selso {
  cursor: pointer;
  display: flex;
}
.sos {
  margin: 0 1vw 1vh 0;
  width: fit-content;
  box-sizing: border-box;
  padding: 0 0.2vw 0 0;
  display: flex;
  background-color: aliceblue;
  border-radius: 1em;
  img {
    width: 5vh;
  }
  a {
    text-align: center;
    justify-self: center;
    align-self: center;
  }
}
.none {
  display: none;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
body {
  box-sizing: border-box;
  padding: 2vh;
  background-image: var(--img);
  background-size: cover;
  background-position: center;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.alert {
  transition: 1s;
  overflow: hidden;
  position: absolute;
  display: flex;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  backdrop-filter: blur(22px);
  justify-content: center;
  .why {
    text-shadow: #000000 0 0 6px;
    color: #ff4d4d;
    font-size: 2.5vh;
    font-weight: 800;
    box-shadow: 0 0.2vw;
  }
  .content {
    flex: 1;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 15vh;
    h1 {
      text-shadow: #000000 0 0 6px;
      margin: 0;
      color: #ff4d4d;

      font-size: 10vh;
      align-self: center;
    }
    h2 {
      margin: 0;
      color: var(--textcolor);
      font-size: 2.5vh;
      align-self: center;
    }
    .sel {
      flex: 1;
      width: 20vh;
      align-items: center;
      justify-self: center;
      align-self: center;
      justify-content: center;
      display: flex;
      button {
        flex: 1;
        border-radius: 12px;
        text-align: center;
        padding: 0;
        border: none;
        width: 2vh;
        margin: 0.2vw;
        font-size: 1vh;
        height: 3vh;
      }
    }
  }
}
.nodisplay {
  transition: 0.5s;
  width: 0;
  justify-self: center;
  align-self: center;
  overflow: hidden;
}
.tr {
  backdrop-filter: blur(12px);
  pointer-events: all;
}
.disp {
  display: none !important;
}
</style>
<script lang="js">
import { createApp } from 'vue'
import { useIndexedDB } from './usedb'

const { saveBlob, getBlob, deleteBlob } = useIndexedDB()
import { ref } from 'vue'
export default {
  data() {
    return {
      soinfo: JSON.parse(localStorage.getItem('so')) || [
        { url: 'https://www.bing.com/search?q=', img: '/so/bing.svg', id: 'bing' },
      ],
      why: '如果看到此条消息，请立即反馈..这本不应该出现在这里',
      tip: '',
      costmurl: '',
      search: [
        { url: 'https://www.bing.com/search?q=', img: '/so/bing.svg', id: 'bing' },
        { url: 'https://www.baidu.com/s?wd=', img: '/so/baidu.svg', id: 'Baidu' },
        { url: 'https://www.sogou.com/web?query=', img: '/so/sogou.svg', id: 'sogou' },
        { url: 'https://duckduckgo.com/?q=', img: '/so/duckduckgo.svg', id: 'duckduckgo' },
        { url: 'https://www.google.com.hk/search?q=', img: '/so/google.svg', id: 'google' },
        { url: 'https://yandex.com/search/?text=', img: '/so/yandex.svg', id: 'yandex' },
        { url: this.costmurl, img: '/so/search.svg', id: '自定义' },
      ],
    }
  },
  methods: {
    bin() {
      if (localStorage.getItem('bing')) {
        this.delbg()
        localStorage.removeItem('bing')
      } else {
        localStorage.setItem('bing', '1')
      }
      setTimeout(() => {
        location.reload()
      }, 1000)
    },
    getid() {
      return JSON.parse(localStorage.getItem('so'))[0].id
    },
    save(key, item) {
      localStorage.setItem(key, item)
    },
    saveweb(web, url) {
      if (localStorage.getItem('website') == null) {
        let adweb = [{ web, url }]
        this.save('website', JSON.stringify(adweb))
      } else {
        let adweb = [{ web, url }]
        let old = JSON.parse(localStorage.getItem('website'))
        old.push(adweb[0])
        let news = old
        localStorage.setItem('website', JSON.stringify(news))
      }
    },
    async useback() {
      const fileInput = document.querySelector('input[type="file"]')
      const file = fileInput.files[0]
      if (!file) {
        this.delbg()
      } else {
        if (localStorage.getItem('bing')) {
          localStorage.removeItem('bing')
        }
        await saveBlob(file)
        setTimeout(() => {
          location.reload()
        }, 1000)
      }
    },
    async delbg() {
      await deleteBlob()
      if (localStorage.getItem('bing')) {
        localStorage.removeItem('bing')
      }
      this.alertips('背景已清除')
      setTimeout(() => {
        location.reload()
      }, 1000)
    },
    upweb() {
      let name = document.getElementById('name').value
      let url = document.getElementById('url').value
      if (name == '') {
        this.aler('名字不可为空')
      } else {
        if (url == '') {
          this.aler('链接不可为空')
        } else {
          this.saveweb(name, url)
          document.getElementById('name').value = ''
          document.getElementById('url').value = ''
        }
      }
    },
    delmod() {
      if (localStorage.getItem('del') == 'true') {
        localStorage.setItem('del', 'false')
        this.alertips('删除模式已关闭')
      } else {
        localStorage.setItem('del', 'true')
        this.alertips('删除模式已开启，请返回主页点击链接删除')
      }
    },
    aler(why) {
      this.why = why
      document.getElementById('alerterror').style.width = '100%'
    },
    alertips(tip) {
      this.tip = tip
      document.getElementById('alert').style.width = '100%'
    },
    closed() {
      document.getElementById('alerterror').style.width = '0'
    },
    selso(event) {
      let i = null
      let sos = this.search
      for (i = 0; i < sos.length; i++) {
        if (sos[i].id == event) {
          if (sos[i].id == '自定义') {
            this.cstmso()
            break
          } else {
            this.soinfo = [sos[i]]
            localStorage.setItem('so', JSON.stringify([sos[i]]))
            break
          }
        }
      }
    },
    nts() {
      this.$refs.noticRef.nt_cl('TEST', '5s')
    },
    start() {
      if (localStorage.getItem('so') == null) {
        let bing = [{ url: 'https://www.bing.com/search?q=', img: '/so/bing.svg', id: 'bing' }]
        localStorage.setItem('so', JSON.stringify(bing))
      }
      let id = JSON.parse(localStorage.getItem('so'))[0].id
    },
    cstmso() {
      document.getElementById('ctitle').classList.toggle('disp')
      document.getElementById('cinput').classList.toggle('disp')
      document.getElementById('ti').classList.toggle('disp')
      document.getElementById('costm').classList.toggle('tr')
    },
    cstms2() {
      this.cstmso()
      let val = document.getElementById('cinp').value
      if (val == '') {
      } else {
        let cst = [{ url: val, img: '/so/search.svg', id: '自定义' }]
        localStorage.setItem('so', JSON.stringify(cst))
        this.soinfo = cst
      }
    },
    close(eve) {
      if (eve.target.id == 'costm') {
        this.cstmso()
      }
    },
  },
  computed: {
    errors() {
      return this.why
    },
    alertip() {
      return this.tip
    },
    so() {
      return this.soinfo
    },
  },
  mounted() {
    this.start()
  },
}
</script>
