export default {
  inject: ["fetchTopRankedMovieApi", "divideArrayObject", "showMovieInfo"],
  data() {
    return {
      page: 1,
      per_page: 6,
      total_pages: 1,
      total: 0,
      topMovies: {},
      size: 0,
    };
  },
  methods: {
    async getDataApi() {
      const dataApi = await this.fetchTopRankedMovieApi(
        "get/top50/?per_page=24&page=1"
      );
      this.topMovies = this.divideArrayObject(dataApi.items, 3);
      console.log(this.topMovies[0]);
      this.page = dataApi.page;
      this.total = dataApi.total;
      this.per_page = dataApi.per_page;
      this.total_pages = dataApi.total_pages;
      this.size = this.topMovies.length;
    },
  },
  created() {
    this.getDataApi();
  },
  template: `
       <div class="slides d-flex flex-column justify-content-center mb-5 bg-grays " >
                    <h3 class="align-self-start">Top rating</h3>
                    <div id="carouselTopRating" class="carousel slide p-lr">
                        <div class="carousel-indicators">
                            <button v-for="idx in size" type="button" data-bs-target="#carouselTopRating"
                            :data-bs-slide-to="idx-1" :class="{ active: idx == 1 }" :aria-current="idx == 0 ? 'true' : 'false'"
                            :aria-label="'Slide ' + idx"></button> 
                        </div>
                        <div class="carousel-inner overflow-visible">
                            <div class="carousel-item " v-for="(movieArr, idx) in topMovies" :class="{active : idx ==0}">
                                <div class="courseItem position-relative" v-for="movie in movieArr" @click="showMovieInfo(movie.id)">
                                    <img :src="movie.image"
                                        class="d-block w-100 h-100" alt="...">
                                    <p
                                        class="position-absolute title-movie bg-black text-white w-100 text-center translate-top-100 d-none">
                                        <p>{{ movie.fullTitle }}</p>  <p>Rating: {{ movie.imDbRating }}  -  Year: {{movie.year}}</p></p>
                                </div> 
                            </div>
                             
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselTopRating"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselTopRating"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
    `,
};
