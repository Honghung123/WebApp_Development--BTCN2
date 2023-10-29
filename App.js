// Import Component
import vHeader from "./components/Header.js";
import vNavbar from "./components/Navbar.js";
import vListMovie from "./components/ListMovie.js";
import vMovieInfo from "./components/MovieInfo.js";
import vActorInfo from "./components/ActorInfo.js";
import vMain from "./components/Main.js";
import vFooter from "./components/Footer.js";

// Using ultility
import { DBProvider } from "./DB_Provider.js";
import { provide, computed } from "vue";

export default {
  data() {
    return {
      movies: [],
      pages: {},
      movieInfo: {},
      actorInfos: {},
      movieActorJoined: [],
      componentName: "vMain",
    };
  },
  components: {
    vHeader,
    vNavbar,
    vMain,
    vListMovie,
    vMovieInfo,
    vActorInfo,
    vFooter,
  },
  methods: {
    async fetchApi(queryApi) {
      let dataApi = await DBProvider.fetch(queryApi);
      return JSON.parse(JSON.stringify(dataApi));
    },
    async fetchPopularMovieApi(queryApi) {
      const data = await this.fetchApi(queryApi);
      return data;
    },
    async fetchTopRankedMovieApi(queryApi) {
      const data = await this.fetchApi(queryApi);
      return data;
    },
    async fetchTopIncomeMovieApi(queryApi) {
      const data = await this.fetchApi(queryApi);
      return data;
    },
    async fetchMovieInfoApi(queryApi) {
      const data = await this.fetchApi(queryApi);
      return data;
    },
    viewMovieInfoFunc() {
      this.componentName = "vMovieInfo";
    },
    viewActorInfoFunc() {
      this.componentName = "vActorInfo";
    },
    viewHomePage() {
      this.componentName = "vMain";
    },
    showListMovie() {
      this.componentName = "vListMovie";
    },
    searchKey(key = "", page = 1) {
      let query = `search/movie/${key}?per_page=6&page=${page}`;
    },
    divideArrayObject(arr, size) {
      const result = [];
      for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
      }
      return result;
    },
    async showMovieInfo(movieId) {
      this.viewMovieInfoFunc();
      let query = `detail/movie/${movieId}`;
      this.movieInfo = await this.fetchApi(query);
      this.movieInfo = this.movieInfo.items[0];
      console.log(this.movieInfo);
    },
    async showActorInfo(actorId) {
      let query = `detail/name/${actorId}`;
      this.actorInfos = await this.fetchApi(query);
      this.actorInfos = this.actorInfos.items[0];
      this.getMovieJoined(this.actorInfos.castMovies);
      this.viewActorInfoFunc();
    },
    async getMovieJoined(movies) {
      let idList = [];
      let movieIdList = [];
      movies.forEach((movie) => {
        idList.push(movie.id);
      });
      idList.forEach(async (movie) => {
        let query = `detail/movie/${movie}`;
        const data = await this.fetchApi(query);
        if (data.items[0] != undefined) {
          movieIdList.push(data.items[0]);
        }
      });
      this.movieActorJoined = movieIdList;
      console.log(this.movieActorJoined);
    },
  },
  created() {
    // this.fetchTopRankedMovieApi("get/top50/?per_page=24&page=1");
    // this.fetchPopularMovieApi("get/mostpopular/?per_page=30&page=1");
    // this.fetchTopIncomeMovieApi("get/topboxoffice/?per_page=5");
  },
  provide() {
    return {
      fetchApi: computed(() => this.fetchApi),
      fetchPopularMovieApi: computed(() => this.fetchPopularMovieApi),
      fetchTopRankedMovieApi: computed(() => this.fetchTopRankedMovieApi),
      fetchTopIncomeMovieApi: computed(() => this.fetchTopIncomeMovieApi),

      searchKey: computed(() => this.searchKey),
      viewHomePage: computed(() => this.viewHomePage),
      viewMovieInfoFunc: computed(() => this.viewMovieInfoFunc),
      viewActorInfoFunc: computed(() => this.viewActorInfoFunc),
      showListMovie: computed(() => this.showListMovie),

      showMovieInfo: computed(() => this.showMovieInfo),
      showActorInfo: computed(() => this.showActorInfo),

      divideArrayObject: computed(() => this.divideArrayObject),
      movieInfo: computed(() => this.movieInfo),
      actorInfos: computed(() => this.actorInfos),
      movieActorJoined: computed(() => this.movieActorJoined),
    };
  },

  template: ` 
    <vHeader />
    <vNavbar />
    <div class="wrappers mb-2">
        <main>
            <component :is="componentName" />
        </main>
    </div>
    <vFooter/> 
    `,
};
