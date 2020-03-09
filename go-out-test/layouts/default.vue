<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="~assets/goout.png" alt="GoOut" height="28" />
        </a>
      </div>
    </nav>

    <section class="main-content columns">
      <aside class="column is-4 section">
        <b-menu>
          <b-menu-list label="Menu">
            <b-menu-item
              icon="earth"
              label="Hello world"
              tag="nuxt-link"
              to="/"
            />
            <b-menu-item
              ref="profileItem"
              :expanded="isOpen"
              icon="account"
              label="Profiles"
              @mouseover.native="isOpen = true"
              @mouseleave.native="isOpen = false"
              @click="profilesItemClick"
            >
              <b-menu-item
                v-for="(user, index) of users"
                :key="index"
                :label="user.name"
                tag="nuxt-link"
                :to="{
                  name: 'users-id',
                  params: { id: user.userId, userName: user.name }
                }"
              />
            </b-menu-item>
          </b-menu-list>
        </b-menu>
      </aside>

      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
const users = [
  {
    name: 'Roman Talaš',
    userId: 'roman-talas'
  },
  {
    name: 'Tomáš Garrigue Masaryk',
    userId: 'tomas-garrigue-masaryk'
  },
  {
    name: 'Václav Havel',
    userId: 'vaclav-havel'
  }
]

export default {
  name: 'Default',
  data() {
    return {
      isOpen: false,
      users
    }
  },
  methods: {
    profilesItemClick() {
      this.$nextTick(() => {
        this.$refs.profileItem.$el
          .querySelector('li a')
          .classList.remove('is-active')
      })
    }
  }
}
</script>
