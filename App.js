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
      keySearchMovie: "",
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
    async searchKey(key = "", page = 1) {
      // alert(key);
      //this.quey = `search/movie/${key}?per_page=6&page=${page}`;
      this.keySearchMovie = key;
      this.showListMovie();
    },
    divideArrayObject(arr, size) {
      const result = [];
      for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
      }
      return result;
    },
    async showMovieInfo(movieId) {
      let query = `detail/movie/${movieId}`;
      this.movieInfo = await this.fetchApi(query);
      this.movieInfo = this.movieInfo.items[0];
      this.viewMovieInfoFunc();
      console.log(this.movieInfo);
    },
    async showActorInfo(actorId) {
      let query = `detail/name/${actorId}`;
      this.actorInfos = await this.fetchApi(query);
      this.actorInfos = this.actorInfos.items[0];
      try {
        this.getMovieJoined(this.actorInfos.castMovies);
      } catch (e) {
        this.movieActorJoined = [];
      }
      this.viewActorInfoFunc();
    },
    async getMovieJoined(movies) {
      let idList = [];
      movies.forEach((movie) => {
        idList.push(movie.id);
      });
      this.movieActorJoined = idList;
    },
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
      keySearchMovie: computed(() => this.keySearchMovie),
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
