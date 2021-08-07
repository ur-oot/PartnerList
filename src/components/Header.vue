<template>
  <div class="header">
    <b-navbar toggleable="lg" fixed="top">
      <b-navbar-brand to="/">HOME</b-navbar-brand>
      <b-nav class="ml-auto" right>
        <!-- <b-nav-item to="/about">About</b-nav-item> -->
        <b-nav-item
          href="https://twitter.com/kausaus_"
          target="_blank"
          rel="noopener noreferrer"
        >
          <font-awesome-icon :icon="['fab', 'twitter']" />
        </b-nav-item>
      </b-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
};
</script>

<style scoped>
.navbar,
.navbar-brand,
.nav-link {
  background-color: #fff100 !important;
  color: #00203d !important;
  font-weight: 600;
  letter-spacing: 0.075em;
}
</style>