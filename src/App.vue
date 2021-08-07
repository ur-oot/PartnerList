<template>
  <div id="app" class="app">
    <div class="app-header">
      <Header />
    </div>
    <div class="app-body">
      <router-view :companies="companies" />
    </div>
    <div class="app-footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import companies from "./companies.json";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      companies: companies,
    };
  },
};
</script>
<style>
:root {
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>

<style scoped lang="scss">
.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  &-body {
    padding-top: 60px;
  }
}
</style>
