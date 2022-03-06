Vue.component('star-rating', VueStarRating.default);
let app = new Vue({
    el: '#app',
    data: {
    loading: true,
    addedName: '',
    addedComment: '',
    comments: {},
    ratings: {},
      number: '',
      max: '',
      current: {
        title: '',
        img: '',
        alt: ''
      },
    },
    created() {
        this.xkcd();
    },
    methods: {
        async xkcd() {
            try {
                this.loading = true;
                let url = "https://xkcd.now.sh/?comic=";
                if(this.number === '') {
                    url += "latest";
                } else {
                    url += this.number;
                }
                const response = await axios.get(url);
                this.current = response.data;
                this.loading = false;
                this.number = response.data.num;
            } catch (error) {
                console.log(error);
            }
        },
        firstComic() {
            this.number = 1;
        },
        previousComic() {
            this.number = this.current.num - 1;
        },
        nextComic() {
            this.number = this.current.num + 1;
        },
        lastComic(){
            this.number = this.max;
        },
        getRandom(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        randomComic() {
            this.number = this.getRandom(1, this.max);
        },
        addComment() {
            var moment = require('moment');
            
            if(!(this.number in this.comments)){
                Vue.set(app.comments, this.number, new Array);
            }
            this.comments[this.number].push({
                author: this.addedName, text: this.addedComment, time: this.addedTime
            });
            this.addedName = '';
            this.addedComment = '';
            this.addedTime = moment().format('MMMM Do YYYY, h:mm:ss a');

            console.log(this.comments);
        },
        setRating(rating) {
            // Check if object has a rating
            if(!(this.number in this.ratings)){
                Vue.set(this.ratings, this.number, {
                    sum: 0,
                    total:0
                });
            }
            this.ratings[this.number].sum += rating;
            this.ratings[this.number].total += 1;

        }
    },
    computed: {
        month() {
            var month = new Array;
            if(this.current.month === undefined) {
                return '';
            }

            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";

            return month[this.current.month - 1];
        }
    },
    watch: {
        // Called everytime two values are changed
        number(value, oldvalue) {
            if(oldvalue === '') {
                this.max = value;
            } else {
            
                this.xkcd();
            }
        }
    }
  })