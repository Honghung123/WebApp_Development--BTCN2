export default {
  inject: ["actorInfos", "showMovieInfo", "movieActorJoined"],
  data() {
    const isExist = this.actorInfos != undefined;
    return {
      isExist,
    };
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
                        <div class="row row-gap-4">
                            <div class="col-sm-4 mb-3 mb-sm-0" v-for="cast in movieActorJoined"> 
                                <div class="card">
                                    <img :src="cast.image"
                                        class="card-img-top" alt="...">
                                    <div class="card-body text-center">
                                        <h5 class="card-title">{{cast.title}}</h5>
                                        <p class="card-text">{{cast}}</p>
                                    </div>
                                </div>
                            </div>                             
                        </div>
                        <nav aria-label="Page navigation example" class="d-flex justify-content-center mt-3">
                            <ul class="pagination">
                                <li class="page-item disabled">
                                    <span class="page-link">Previous</span>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item active" aria-current="page">
                                    <span class="page-link">2</span>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item">
                                    <a class="page-link" href="#">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            <h3 v-else>No actor info</h3>
    `,
};
