<template>
  <div class="footer-basic">
    <footer>
      <div class="social">
        <a
          href="https://twitter.com/kausaus_"
          target="_blank"
          rel="noopener noreferrer"
        >
          <font-awesome-icon :icon="['fab', 'twitter']" />
        </a>
      </div>
      <ul class="list-inline">
        <li class="list-inline-item">
          <router-link to="/">Home</router-link>
        </li>
        <!-- <li class="list-inline-item">
          <router-link to="/about">About</router-link>
        </li> -->
      </ul>
      <p class="copyright">
        Copyright @2021 | Designed With by
        <a
          href="https://twitter.com/kausaus_"
          target="_blank"
          rel="noopener noreferrer"
        >
          @kausaus_
        </a>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.footer-basic {
  padding: 40px 0;
  color: #4b4c4d;
  border-top: 1px solid #f1ede9;
}

.footer-basic ul {
  padding: 0;
  list-style: none;
  text-align: center;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 0;
}

.footer-basic li {
  padding: 0 10px;
}

.footer-basic ul a {
  color: inherit;
  text-decoration: none;
  opacity: 0.8;
}

.footer-basic ul a:hover {
  opacity: 1;
}

.footer-basic .social {
  text-align: center;
  padding-bottom: 25px;
}

.footer-basic .social > a {
  font-size: 24px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  text-align: center;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin: 0 8px;
  color: inherit;
  opacity: 0.75;
}

.footer-basic .social > a:hover {
  opacity: 0.9;
}

.footer-basic .copyright {
  margin-top: 15px;
  text-align: center;
  font-size: 13px;
  color: #aaa;
  margin-bottom: 0;
}

/* Credit to https://epicbootstrap.com/snippets/footer-basic */
</style>