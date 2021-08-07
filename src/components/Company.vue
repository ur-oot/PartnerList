<template>
  <div class="company">
    <b-container>
      <b-row class="company-backbutton">
        <b-col>
          <b-button
            pill
            @click="$router.back()"
            style="background: #fff100; color: #00203d; border: none"
          >
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
            戻る
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mx-auto company-cardMain">
        <b-col>
          <b-card
            v-bind:img-src="$route.params.company.image"
            v-bind:img-alt="$route.params.company.name"
            class="mx-auto shadow"
          >
            <template #header>
              <b-card-title>
                {{ $route.params.company.name }}
              </b-card-title>
              <b-card-sub-title class="mb-2">
                {{ $route.params.company.category }}
              </b-card-sub-title>
            </template>

            <b-list-group flush>
              <b-list-group-item>
                <span class="company-cardMain-item-label text-secondary"
                  >業種</span
                >
                <br />
                <span class="company-cardMain-item-value">
                  {{ $route.params.company.industries }}
                </span>
              </b-list-group-item>
              <b-list-group-item>
                <span class="company-cardMain-item-label text-secondary"
                  >詳細</span
                >
                <br />
                <span class="company-cardMain-item-value">
                  {{ $route.params.company.detail }}
                </span>
              </b-list-group-item>
              <b-list-group-item>
                <span class="company-cardMain-item-label text-secondary">
                  オフィシャルサイト
                </span>
                <br />
                <span class="company-cardMain-item-value">
                  <a
                    v-bind:href="$route.params.company.officialsite"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ $route.params.company.officialsite }}
                  </a>
                </span>
              </b-list-group-item>
              <b-list-group-item>
                <span class="company-cardMain-item-label text-secondary">
                  SNS
                </span>
                <br />
                <span class="company-cardMain-item-value">
                  <span
                    class="company-cardMain-item-value-sns"
                    v-if="
                      typeof $route.params.company.twitter !== 'undefined' &&
                      $route.params.company.twitter !== ''
                    "
                  >
                    <a
                      v-bind:href="
                        'https://twitter.com/' + $route.params.company.twitter
                      "
                      target="_blank"
                      rel="noopener noreferrer"
                      style="color: #1DA1F2"
                    >
                      <font-awesome-icon :icon="['fab', 'twitter']" size="2x" />
                    </a>
                  </span>
                  <span
                    class="cardMain-item-value-sns"
                    v-if="
                      typeof $route.params.company.instagram !== 'undefined' &&
                      $route.params.company.instagram !== ''
                    "
                  >
                    <a
                      v-bind:href="
                        'https://instagram.com/' +
                        $route.params.company.instagram
                      "
                      target="_blank"
                      rel="noopener noreferrer"
                      style="color: #282828"
                    >
                      <font-awesome-icon
                        :icon="['fab', 'instagram']"
                        size="2x"
                      />
                    </a>
                  </span>
                </span>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.company {
  &-backbutton {
    text-align: left;
    margin: 2rem auto auto;
  }

  &-cardMain-item {
    &-label {
      font-size: 0.9rem;
    }
    &-value {
      &-sns {
        padding-right: 10px;
      }
    }
  }

  @media (min-width: 576px) {
    &-cardMain {
      width: 50%;
    }
    &-backbutton {
      width: 50%;
    }
  }
}

.card {
  margin: 20px 10px;
}

.card-img {
  padding: 1rem;
}

.card-body {
  text-align: left;
}
</style>