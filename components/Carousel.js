import { inject } from "vue";
export default {
  inject: ["fetchTopIncomeMovieApi", "showMovieInfo"],
  data() {
    return {
      total: 0,
      incomeMovies: {},
    };
  },
  methods: {
    async getDataApi() {
      const dataApi = await this.fetchTopIncomeMovieApi(
        "get/topboxoffice/?per_page=5"
      );
      this.incomeMovies = dataApi.items;
      this.total = dataApi.total;
    },
  },
  created() {
    this.getDataApi();
  },
  template: `
        <div class="carousels d-flex justify-content-center mb-4 "  >
        <div id="carouselNewestMovie" class="carousel slide w-30">
            <div class="carousel-indicators">
                <button v-for="idx in total" type="button" data-bs-target="#carouselNewestMovie"
                :data-bs-slide-to="idx-1" :class="{ active: idx == 1 }" :aria-current="idx == 1 ? 'true' : 'false'"
                :aria-label="'Slide ' + idx"></button> 
            </div>
            <div class="carousel-inner">
                <div v-for="(movie,idx) in incomeMovies" class="carousel-item" :class="{ active : idx == 0}" @click="showMovieInfo(movie.id)">
                    <img :src="movie.image"
                        class="d-block w-100" alt="..." width="200" height="500">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>{{movie.title}}</h5>
                        <p>Length: <span>{{movie.runtimeStr}}</span>  -  Rating: <span>{{movie.ratings.imDb}}</span></p>
                    </div>
                </div> 
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselNewestMovie"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselNewestMovie"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
                </div>
    `,
};
