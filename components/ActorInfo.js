export default {
  inject: ["actorInfos", "showMovieInfo", "movieActorJoined", "fetchApi"],
  data() {
    const isExist = this.actorInfos != undefined;
    return {
      isExist,
      incomeMovies: [],
      isMovieJoined: false,
    };
  },
  methods: {
    async getDataApi(array) {
      array.forEach(async (mId) => {
        const dataApi = await this.fetchApi(`detail/movie/${mId}`);
        console.log(dataApi);
        if (dataApi.items[0] != undefined) {
          this.incomeMovies.push(dataApi.items[0]);
          this.isMovieJoined = true;
        }
      });
    },
  },
  created() {
    this.getDataApi(this.movieActorJoined);
  },
  template: `
    <div class="actorInfo-detail bg-toggle" v-if="isExist" >
                    <h3 class="text-center p-2">Chi tiết Diễn viên </h3>
                    <div class="card border-0 w-100 bg-toggle">
                        <img :src="actorInfos.image"
                            class="card-img-top w-30 d-block m-auto" alt="...">
                        <div class="card-body text-center bg-toggle border-0">
                            <h5 class="card-title">Tên diễn viên: <span>{{actorInfos.name}}</span></h5>
                            <p class="card-text">Tiểu sử: <span>{{actorInfos.summary}}</span></p>
                        </div>
                    </div>
                    <div class="attendList">
                        <h4>Các phim đã tham gia:</h4>
                        <div class="row row-gap-4" v-if="isMovieJoined">
                            <div class="col-sm-4 mb-3 cursor" v-for="movie in incomeMovies" @click=showMovieInfo(movie.id)> 
                                <div class="card min-height-custom h18">
                                    <img :src="movie.image"
                                        class="card-img-top" alt="...">
                                    <div class="card-body text-center">
                                        <h5 class="card-title">{{movie.fullTitle}}</h5>
                                        <p class="card-text">Year: {{movie.year}} - Rating: {{movie.ratings.imDb}} - Length: {{movie.runtimeStr}}</p>
                                        <p class="card-text">{{movie.plot}}</p>
                                        <p class="card-text">Awards:{{movie.awards}}</p>
                                    </div>
                                </div>
                            </div>                              
                        </div>
                        <h4 v-else>No movie</h4>
                    </div>
                </div>
            <h3 v-else>No actor info</h3>
    `,
};
