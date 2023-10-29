import data from "./db/data.js";

export const DBProvider = {
  filterParams(paramsList, key, defaultValue) {
    let value = paramsList
      .filter((queryParam) => queryParam.startsWith(key))
      .map((queryParam) => queryParam.split("=")[1])[0];
    return value == undefined ? defaultValue : parseInt(value);
  },
  getListDanhThu(movieList) {
    let list = [];
    movieList.forEach((movie) => {
      list.push(movie.boxOffice.cumulativeWorldwideGross);
    });
    return list;
  },
  getMaxDanhThu(movieList, count) {
    const list = this.getListDanhThu(movieList);
    const validDollarStrings = list.filter((str) => str != "");
    // Bước 2: Chuyển các chuỗi đô la thành giá trị số
    const numericValues = validDollarStrings.map((str) =>
      parseFloat(str.replace("$", "").replaceAll(",", ""))
    );
    // Bước 3: Sắp xếp mảng số theo thứ tự giảm dần
    numericValues.sort((a, b) => b - a);
    // Bước 4: Lấy 3 giá trị lớn nhất
    const topDanhthu = numericValues.slice(0, count);
    let res = movieList.filter((movie) => {
      let str = movie.boxOffice.cumulativeWorldwideGross;
      return topDanhthu.includes(
        parseFloat(str.replace("$", "").replaceAll(",", ""))
      );
    });
    for (let i = 0; i < res.length - 1; i++) {
      for (let j = i; j < res.length; j++) {
        if (
          res[i].boxOffice.cumulativeWorldwideGross <
          res[j].boxOffice.cumulativeWorldwideGross
        ) {
          let swap = res[i];
          res[i] = res[j];
          res[j] = swap;
        }
      }
    }
    return res;
  },
  async fetch(query) {
    try {
      const movies = data.Movies;
      const reviews = data.Reviews;
      const names = data.Names;
      const top50 = data.Top50Movies;
      const mostpopularMovies = data.MostPopularMovies;
      // console.log(movies);
      // console.log(reviews);
      console.log(names);
      // console.log(top50);
      // console.log(mostpopularMovies);
      // Phân tách tham số vào các phần riêng lẻ.
      let page = 1;
      let per_page = 1;
      let total_page = 1;
      let total = 1;
      let items = [];
      let searchs;
      const [type, className, rest] = query.split("/");
      if (rest.includes("?")) {
        const [pattern, params] = rest.split("?");
        searchs = pattern;

        const paramsList = params.split("&");
        //  page: 1, per_page: 6, total_page: 13, total: 75, items: [ movie1, movie2,... ] }
        page = this.filterParams(paramsList, "page", 1);
        per_page = this.filterParams(paramsList, "per_page", 6);
        if (type === "search") {
          if (className === "movie") {
            items = movies.filter(
              (queryParam) =>
                queryParam.title
                  .toLowerCase()
                  .includes(pattern.toLowerCase()) ||
                queryParam.id.includes(pattern)
            );
          } else if (className === "name") {
            items = names.filter(
              (queryParam) =>
                queryParam.name.toLowerCase().includes(pattern.toLowerCase()) ||
                queryParam.id.toLowerCase().includes(pattern.toLowerCase())
            );
          } else if (className === "top50") {
            items = top50.filter(
              (queryParam) =>
                queryParam.title
                  .toLowerCase()
                  .includes(pattern.toLowerCase()) ||
                queryParam.id.toLowerCase().includes(pattern.toLowerCase()) ||
                queryParam.title.toLowerCase().includes(pattern.toLowerCase())
            );
          } else if (className === "mostpopular") {
            items = mostpopularMovies.filter(
              (queryParam) =>
                queryParam.title
                  .toLowerCase()
                  .includes(pattern.toLowerCase()) ||
                queryParam.id.toLowerCase().includes(pattern.toLowerCase())
            );
          } else if (className === "topboxoffice") {
            //   items = this.filterTitleMovie(reviews, pattern);
          }
          // Xử lý các loại khác tương tự cho tìm kiếm.
        } else if (type === "get") {
          if (className === "top50") {
            items = top50;
          }
          if (className === "review") {
            items = reviews.filter((queryParam) =>
              queryParam.movieId.toLowerCase().includes(pattern.toLowerCase())
            )[0].items;
          }
          if (className === "mostpopular") {
            items = mostpopularMovies;
          }
          if (className === "topboxoffice") {
            items = this.getMaxDanhThu(movies, 5);
          }
          // Xử lý các loại khác tương tự cho lấy danh sách.
        }
      }
      if (type === "detail") {
        if (className === "movie") {
          items = movies.filter((queryParam) => queryParam.id.includes(rest));
        } else if (className === "name") {
          items = names.filter((queryParam) => queryParam.id.includes(rest));
        } else if (className === "top50") {
          items = top50.filter((queryParam) =>
            queryParam.title.toLowerCase().includes(rest.toLowerCase())
          );
        } else if (className === "mostpopular") {
          items = mostpopularMovies.filter((queryParam) =>
            queryParam.title.toLowerCase().includes(rest.toLowerCase())
          );
        } else if (className === "topboxoffice") {
          //   items = this.filterTitleMovie(reviews, rest);
        }
        return {
          search: rest,
          page,
          per_page,
          total_page,
          total,
          items,
        };
      }
      total = items.length;
      total_page = parseInt(total / per_page) + (total % per_page == 0 ? 0 : 1);
      items = items.slice((page - 1) * per_page, page * per_page);
      return {
        search: searchs,
        page,
        per_page,
        total_page,
        total,
        items,
      };
      // Trả về kết quả mặc định hoặc xử lý lỗi nếu không khớp với bất kỳ trường hợp nào.
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};
