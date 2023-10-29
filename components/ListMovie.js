export default {
  inject: ["viewListMovie"],
  setup() {},
  created() {},
  template: `
    <div class="list-movie border-0 cs-pointer bg-grays" v-if="viewListMovie">
                    <div class="row row-gap-4">
                        <div class="col-sm-4 mb-3 mb-sm-0">
                            <div class="card">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQySKgCBeFtsTkMyGvsjeWqc5xYra5CKWl9ZQ&usqp=CAU"
                                    class="card-img-top" alt="...">
                                <div class="card-body text-center">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional
                                        content.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="card">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQySKgCBeFtsTkMyGvsjeWqc5xYra5CKWl9ZQ&usqp=CAU"
                                    class="card-img-top" alt="...">
                                <div class="card-body text-center">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional
                                        content.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="card">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQySKgCBeFtsTkMyGvsjeWqc5xYra5CKWl9ZQ&usqp=CAU"
                                    class="card-img-top" alt="...">
                                <div class="card-body text-center">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional
                                        content.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="card">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa2o1di7Adx4oSYo-FrCxpceWgP8IfT7Grtw&usqp=CAU"
                                    class="card-img-top" alt="...">
                                <div class="card-body text-center">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional
                                        content.</p>
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
    `,
};
