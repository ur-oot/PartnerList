<template>
  <div class="main">
    <b-container fluid="xl">
      <div class="main-search-form pt-3">
        <b-form inline>
          <b-input-group>
            <b-input-group-prepend is-text class="mb-2 mb-sm-0">
              <font-awesome-icon :icon="['fa', 'search']" />
            </b-input-group-prepend>
            <b-form-input
              id="search-keyword"
              placeholder="会社名"
              v-model="keyword"
              class="mb-2 mr-sm-2 mb-sm-0"
            ></b-form-input>
            <b-button class="mb-2 mr-sm-2 mb-sm-0" v-b-toggle.sidebar-1>
              <font-awesome-icon
                :icon="['fas', 'filter']"
                class="filter-icon"
              />
            </b-button>
          </b-input-group>
        </b-form>
      </div>

      <b-sidebar class="sidebar" id="sidebar-1" title="Filter" right shadow>
        <b-form class="main-sidebar-body">
          <b-form-group label="サポートメニュー">
            <b-form-checkbox-group
              v-model="catListSelected"
              :options="checkboxList.catList"
              v-on:change="checkUpdate"
              stacked
              switches
            ></b-form-checkbox-group>
          </b-form-group>
          <b-form-group label="業種">
            <b-form-checkbox-group
              v-model="industListSelected"
              :options="checkboxList.industList"
              v-on:change="checkUpdate"
              stacked
              switches
            ></b-form-checkbox-group>
          </b-form-group>
        </b-form>
      </b-sidebar>

      <div class="main-body">
        <b-card-group deck>
          <b-col
            sm="4"
            class="py-sm-2 px-sm-0"
            v-for="company in filteredCompanies"
            v-bind:key="company.id"
            v-show="company.checkFlag && company.wordFlag"
          >
            <b-card
              v-bind:img-src="company.image"
              v-bind:img-alt="company.name"
              class="shadow"
            >
              <template #header>
                <b-card-title>{{ company.name }}</b-card-title>
                <b-card-sub-title>
                  {{ company.category }}
                </b-card-sub-title>
              </template>

              <b-card-text>
                {{ company.description }}
              </b-card-text>

              <template #footer>
                <small
                  class="text-primary main-cardMain-footer"
                  v-on:click="detail(company)"
                >
                  詳細ページ
                </small>
              </template>
            </b-card>
          </b-col>
        </b-card-group>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  components: {},
  name: "Main",
  props: {
    companies: Array,
  },
  data() {
    return {
      keyword: "",
      checkboxList: {
        catList: [],
        industList: [],
      },
      catListSelected: [], // サポートメニューcheckbox
      industListSelected: [], // 業種checkbox
      checkboxSelected: [], // checkboxをまとめる用
      filteredCompanies: this.companies,
    };
  },
  created() {
    // 初期化
    for (var i in this.companies) {
      // 会社情報にcheckbox判定用のFlagを追加
      this.filteredCompanies[i]["checkFlag"] = true;
      // 会社情報にワード検索用のFlagを追加
      this.filteredCompanies[i]["wordFlag"] = true;
      // サポートメニューcheckboxの要素を作成
      this.checkboxList.catList.push(this.companies[i].category);
      // 業種checkboxの要素を作成
      this.checkboxList.industList.push(this.companies[i].industries);
    }
    this.checkboxList.catList = [...new Set(this.checkboxList.catList)];
    this.checkboxList.industList = [...new Set(this.checkboxList.industList)];
  },
  watch: {
    keyword: function () {
      // フリーワード検索
      var companies = Object.assign({}, this.filteredCompanies);
      for (var item in companies) {
        if (companies[item].name.indexOf(this.keyword) !== -1) {
          companies[item]["wordFlag"] = true;
        } else {
          companies[item]["wordFlag"] = false;
        }
      }
      this.filteredCompanies = companies;
    },
  },
  methods: {
    detail: function (company) {
      this.$router.push({
        name: "company",
        params: { company: company },
      });
    },
    checkUpdate: function () {
      // checkbox変更時に実行
      var checkboxSelected = [];
      // 選択されたチェックをcheckboxSelectedに格納
      for (var group in this.checkboxList) {
        if (this[group + "Selected"].length) {
          checkboxSelected.push(this[group + "Selected"]);
        }
      }
      // this.checkboxSelectedを初期化
      this.checkboxSelected.splice(0);
      if (checkboxSelected.length) {
        // this.checkboxSelectedに格納
        this.checkboxSelected = checkboxSelected;
      }
      this.checkJudge();
    },
    checkJudge: function () {
      // this.checkboxSelectedから判定用の正規表現パターンを生成
      this.cond = "";
      for (var cat in this.checkboxSelected) {
        this.cond += "&&" + this.checkboxSelected[cat];
      }

      this.cond = this.cond
        .replace(/&&/g, ")(?=.*")
        .replace(/,/g, "|.*")
        .slice(1);
      if (this.cond !== "") this.cond += ")";
      this.checkSort();
    },
    checkSort: function () {
      // 直接checkFlagを更新しても画面は更新されないため一度変数に退避
      var companies = Object.assign({}, this.filteredCompanies);
      for (var item in companies) {
        // checkbox判定用の要素のみを取り出してcatに格納
        var cat = [];
        cat.push(companies[item].category);
        cat.push(companies[item].industries);
        if (cat.toString().match(this.cond)) {
          companies[item]["checkFlag"] = true;
        } else {
          companies[item]["checkFlag"] = false;
        }
      }
      this.filteredCompanies = companies;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  &-sidebar-body {
    text-align: left;
    padding-left: 2rem;
  }
  &-cardMain-footer {
    text-decoration: underline;
    cursor: pointer;
  }
  @media (min-width: 576px) {
    &-body {
      margin: 2rem auto;
    }
  }
}

@media (max-width: 576px) {
  .card {
    margin: 10px auto;
  }
}

.card {
  height: 100%;
}

.card-img {
  padding: 1rem;
}
</style>
