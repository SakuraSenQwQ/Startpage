<script lang="js">
import axios from 'axios'
import { useIndexedDB } from './usedb'

const { saveBlob, getBlob } = useIndexedDB()
export default {
  data() {
    return {
      img: '',
    }
  },
  methods: {
    setimg(imgurl) {
      this.img = imgurl
    },
    async getdaily() {
      let bimg = await axios.get(
        'https://bing.biturl.top/?resolution=UHD&format=json&index=0&mkt=zh-CN',
      )
      console.log('成功获取每日图片' + bimg.data.url)
      console.log('每日图片版权来源' + bimg.data.copyright)
      this.img = bimg.data.url
    },
    start() {
      if (!localStorage.getItem('website')) {
        const webs = [
          { web: 'BiliBIli', url: 'https://www.bilibili.com/' },
          { web: 'Github', url: 'https://github.com/' },
          { web: 'Deepseek', url: 'https://www.deepseek.com/' },
          { web: '豆包', url: 'https://www.doubao.com/chat/' },
          { web: '腾讯元宝', url: 'https://yuanbao.tencent.com/chat/' },
          { web: 'SEN', url: 'https://sakurasen.cn/' },
        ]
        localStorage.setItem('website', JSON.stringify(webs))
      }
    },
  },
  mounted() {
    this.start()
    window.backimg = this.backimg
  },
  computed: {
    async backimg() {
      if (localStorage.getItem('bing')) {
        this.getdaily()
      } else {
        const blob = await getBlob()
        if (blob) {
          const blobUrl = URL.createObjectURL(blob)
          this.img = blobUrl
        } else {
          this.img = '/111261733_p0_compressed.jpg'
        }
      }
    },
    classes() {
      return ':root { --img: url("' + this.img + '")}'
    },
  },
}
</script>
<template>
  {{ classes }}
  <div>{{ classes }}</div>
</template>
