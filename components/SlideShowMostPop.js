export default {
  inject: ["fetchTopIncomeMovieApi", "divideArrayObject", "showMovieInfo"],
  data() {
    // const topIncomeMovies = inject("topIncomeMovies");
    // console.log(topIncomeMovies);
    // const { page, per_page, total_pages, total, incomeMovies } =
    //   topIncomeMovies;
    return {
      page: 1,
      per_page: 6,
      total_pages: 1,
      total: 0,
      popMovies: {},
      size: 0,
    };
  },
  methods: {
    async getDataApi() {
      const dataApi = await this.fetchTopIncomeMovieApi(
        "get/mostpopular/?per_page=30&page=1"
      );
      this.popMovies = this.divideArrayObject(dataApi.items, 3);
      this.page = dataApi.page;
      this.total = dataApi.total;
      this.per_page = dataApi.per_page;
      this.total_pages = dataApi.total_pages;
      console.log(this.popMovies[0]);
      this.size = this.popMovies.length;
    },
  },
  created() {
    this.getDataApi();
  },
  template: `
         <div class="slides d-flex flex-column justify-content-center mb-5 bg-grays" >
                    <h3 class="align-self-start">Most popular</h3>
                    <div id="carouselMostPopular" class="carousel slide p-lr">
                        <div class="carousel-indicators">
                            <button v-for="idx in size" type="button" data-bs-target="#carouselMostPopular"
                            :data-bs-slide-to="idx-1" :class="{ active: idx == 1 }" :aria-current="idx == 1 ? 'true' : 'false'"
                            :aria-label="'Slide ' + (idx-1)"></button> 
                        </div>
                        <div class="carousel-inner overflow-visible">
                            <div class="carousel-item " v-for="(movieArr, idx) in popMovies" :class="{active : idx==0}">
                                <div class="courseItem " v-for="movie in movieArr" @click="showMovieInfo(movie.id)">
                                    <img :src="movie.image"
                                        class="d-block w-100 h-100" alt="...">
                                     <p
                                        class="position-absolute title-movie bg-black text-white w-100 text-center translate-top-100 d-none">
                                       <p>{{ movie.fullTitle }}</p>  <p>Rating: {{ movie.imDbRating }}  -  Year: {{movie.year}}</p></p>
                                </div> 
                            </div> 
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselMostPopular"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselMostPopular"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
    `,
};
