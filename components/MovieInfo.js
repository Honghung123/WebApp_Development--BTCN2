export default {
  inject: ["fetchApi", "movieInfo", "showActorInfo", "movieReviewId"],
  data() {
    return {
      listReviews: {},
      isHasReview: false,
    };
  },
  methods: {
    async getDataApi(key, page = 1) {
      this.listReviews = {};
      let query = `get/review/${key}?per_page=7&page=${page}`;
      const dataApi = await this.fetchApi(query);
      this.listReviews = dataApi;
      this.isHasReview = this.listReviews.items.length > 0 ? true : false;
    },
  },
  created() {
    this.getDataApi(this.movieReviewId);
  },
  template: `
         <div class="videoInfo-detail bg-toggle" v-if="movieInfo">
                    <h3 class="text-center p-2">Chi tiết movie </h3>
                    <div class="card border-0 w-100 bg-toggle">
                        <img :src="movieInfo.image"
                            class="card-img-top w-30 d-block m-auto" alt="...">
                        <div class="card-body text-center bg-toggle border-0">
                            <h5 class="card-title">Tiêu đề: <span>{{movieInfo.title}}</span></h5>
                            <h6 class="card-title">Năm sản xuất: <span>{{movieInfo.year}}</span></h6>
                            <h6 class="card-title">Thể loại: <span>{{movieInfo.type}}</span></h6>
                            <p class="card-text">Tóm tắt: <span>{{movieInfo.plot}}</span></p>
                            <h6 class="card-title">Đạo diễn:
                                <span v-for="director in movieInfo.directorList" class="custom-text" @click="showActorInfo(director.id)">{{director.name}}, </span>
                            </h6>
                            <h6 class="card-title">Thông tin diễn viên:
                                <div class="attendList mb-2">
                                    <div class="row row-gap-4">
                                        <div class="col-sm-2" v-for="actor in movieInfo.actorList" @click="showActorInfo(actor.id)">
                                            <div class="card min-height-custom">
                                                <img :src="actor.image"
                                                    class="card-img-top" alt="...">
                                                <div class="card-body text-center">
                                                    <h5 class="card-title">{{actor.name}}</h5>
                                                    <p class="card-text">Vị trí: {{actor.asCharacter}}</p>
                                                </div>
                                            </div>
                                        </div>                                         
                                    </div>
                                </div>
                            </h6>                            
                        </div>
                    </div>
                    <div class="review p-lr bg-toggle">
                        <h4 class="text-start">Reviews</h4>
                        <div class="comment-section" v-if="isHasReview">
                            <div class="comment" v-for="user in listReviews.items">
                                <p>Username: <span>{{user.username}}</span> - Rating: <span>{{user.rate}}</span></p>
                                <p>Title: <span>{{user.title}}</span></p>
                                <p>{{user.content}} </p>
                                <p>Date: <span>{{user.date}}</span></p>
                            </div> 
                            <nav aria-label="Page navigation example" class="d-flex justify-content-center">
                                <ul class="pagination">
                                    <li class="page-item">
                        <span v-if="listReviews.page == 1" class="page-link">Previous</span>
                        <a v-else @click="getDataApi(movieReviewId,listReviews.page-1)" class="page-link" href="#">Previous</a>                
                    </li> 
                    <li v-for="idx in listReviews.total_page" class="page-item" :class="{active : idx == listReviews.page}" >
                        <span class="page-link" v-if="idx == listReviews.page" :aria-current="idx === listReviews.page ? 'page' : null">{{idx}}</span>
                        <a @click="getDataApi(movieReviewId,idx)" class="page-link" href="#" v-else>{{idx}}</a>
                    </li> 
                    <li class="page-item">
                        <span v-if="listReviews.page == listReviews.total_page" class="page-link">Next</span>
                        <a v-else @click="getDataApi(movieReviewId,listReviews.page+1)" class="page-link" href="#">Next</a>
                    </li>
                                </ul>
                            </nav>
                        </div>
                        <h3 v-else>Không có comment nào</h3>
                    </div>
                </div>
                <h3 v-else>No data</h3>
    `,
};
