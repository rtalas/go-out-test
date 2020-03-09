<template>
  <div class="tile">
    <div v-if="validationPassed" class="tile is-parent is-8">
      <article class="tile is-child notification is-warning">
        <p v-if="userName" class="title">{{ userName }}</p>
        <p class="subtitle">{{ userLetters }}</p>
        <figure v-show="isImageLoaded" class="image">
          <img :src="imgSrc" @load="imageLoaded" />
        </figure>
        <div>
          <figure v-if="!isImageLoaded" class="image is-128x128 spinner-parent">
            <img class="loading-spinner" src="~assets/spinner.gif" />
          </figure>
        </div>
      </article>
    </div>
    <div v-else>
      <article class="tile is-child notification is-danger is-12">
        <p class="title">Unknown user</p>
        <p class="subtitle" />
        <figure class="image is-4by3">
          <img :src="null" />
        </figure>
      </article>
    </div>
  </div>
</template>

<script>
import _get from 'lodash/get'
const imgUrl = 'https://picsum.photos'
const userNameRegExp = /^[a-zA-ZáčďéěíňóřšťůúýžÁČĎÉĚÍŇÓŘŠŤŮÚÝŽ ]+$/

export default {
  name: 'User',
  data() {
    return {
      imgSrc: null,
      isImageLoaded: false,
      userLetters: null,
      userName: null,
      validationPassed: false
    }
  },
  created() {
    const params = _get(this, '$route.params', null)
    this.userName = this.setUserName(params)
    if (this.passValidation(this.userName)) {
      this.validationPassed = true
      this.setImgSource()
      this.setUserLetters()
    } else {
      this.validationPassed = false
    }
  },
  methods: {
    getRandomImageSize(x, y) {
      return Math.floor(Math.random() * (x - y + 1)) + y
    },
    imageLoaded() {
      this.isImageLoaded = true
    },
    passValidation(userName) {
      return userName && userName.match(userNameRegExp)
    },
    setImgSource() {
      this.imgSrc =
        `${imgUrl}/` +
        `${this.getRandomImageSize(480, 440)}/` +
        `${this.getRandomImageSize(680, 640)}`
    },
    setUserLetters() {
      this.userLetters = this.userName
        .toLowerCase()
        .replace(/ /g, '')
        .split('')
        .sort((a, b) => a.localeCompare(b))
    },
    setUserName(data) {
      if (data) {
        const userName = data.userName || data.id || ''
        return userName.replace(/-/g, ' ')
      }
      return null
    }
  }
}
</script>

<style>
.spinner-parent {
  position: relative;
}

.loading-spinner {
  position: absolute;
  margin-left: 150%;
}
</style>
