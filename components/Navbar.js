export default {
  inject: ["viewHomePage", "searchKey"],
  data() {
    return {
      searchValue: "",
    };
  },
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bg-toggle mb-2 rounded-1">
            <div class="container-fluid">
                <a class="navbar-brand bg-toggle border-0" href="#" @click="viewHomePage">Home</a>
                <form class="d-flex float-end" @submit.prevent="searchKey(searchValue)">
                    <input v-model="searchValue" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>
    `,
};
