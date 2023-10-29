export default {
  inject: ["fetchApi", "movieInfo", "showActorInfo"],
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
                        <div class="comment-section">
                            <div class="comment">
                                <p>Username: <span>Aram Toshi</span> - Rating: <span>9</span></p>
                                <p>Title: <span> Title comment </span></p>
                                <p>This is his comment in here </p>
                                <p>Date: <span>19 August 2022</span></p>
                            </div>
                            <div class="comment">
                                <p>Username: <span>Aram Toshi</span> - Rating: <span>9</span></p>
                                <p>Title: <span> Title comment </span></p>
                                <p>This is his comment in here </p>
                                <p>Date: <span>19 August 2022</span></p>
                            </div>
                            <nav aria-label="Page navigation example" class="d-flex justify-content-center">
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
                </div>
                <h3 v-else>No data</h3>
    `,
};
