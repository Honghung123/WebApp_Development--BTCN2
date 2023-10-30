export default {
  inject: ["showMovieInfo", "keySearchMovie", "fetchApi"],
  data() {
    return {
      isShown: false,
      listMovies: {},
    };
  },
  methods: {
    async getDataApi(key, page = 1) {
      //   this.listMovies = {};
      let query = `search/movie/${key}?per_page=6&page=${page}`;
      const dataApi = await this.fetchApi(query);
      this.listMovies = dataApi;
      this.isShown = this.listMovies.items.length > 0;
    },
  },
  created() {
    this.getDataApi(this.keySearchMovie);
  },
  template: `
    <div class="list-movie border-0 cs-pointer bg-grays" v-if="isShown">
            <div class="row row-gap-4">
                <div class="col-sm-4 mb-3" v-for="movie in listMovies.items" @click="showMovieInfo(movie.id)">
                    <div class="card min-height-custom h30">
                        <img :src="movie.image"
                            class="card-img-top" alt="...">
                        <div class="card-body text-center">
                            <h5 class="card-title">{{movie.fullTitle}}</h5>
                            <p class="card-text">Length: {{movie.runtimeStr}} - Ranking: {{movie.ratings.imDb}}</p>
                            <p class="card-text">Director: <span v-for="d in movie.directorList">{{d.name}}, </span></p>
                        </div>
                    </div>
                </div> 
                
            </div>
            <nav aria-label="Page navigation example" class="d-flex justify-content-center mt-3">
                <ul class="pagination">
                    <li class="page-item">
                        <span v-if="listMovies.page == 1" class="page-link">Previous</span>
                        <a v-else @click="getDataApi(keySearchMovie,listMovies.page-1)" class="page-link" href="#">Previous</a>                
                    </li> 
                    <li v-for="idx in listMovies.total_page" class="page-item" :class="{active : idx == listMovies.page}" >
                        <span class="page-link" v-if="idx == listMovies.page" :aria-current="idx === listMovies.page ? 'page' : null">{{idx}}</span>
                        <a @click="getDataApi(keySearchMovie,idx)" class="page-link" href="#" v-else>{{idx}}</a>
                    </li> 
                    <li class="page-item">
                        <span v-if="listMovies.page == listMovies.total_page" class="page-link">Next</span>
                        <a v-else @click="getDataApi(keySearchMovie,listMovies.page+1)" class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
        <h3 v-else>Không tìm thấy movie</h3>
    `,
};
