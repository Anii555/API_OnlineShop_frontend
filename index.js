const axios = require('axios').default;

/* axios
.get('https://fortnite-api.com/v1/map')
.then((response) => {
    console.log(response.data)
})
.catch((error) => {
    console.error(error);
}); */

/*     

fetch(e) {

    e.preventDefault();
    
const axiosConfiguration = {
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
                 'Accept': 'application/json'
             }
         }
 */
axios.get('http://localhost:5090/product/').then( response => {
    console.log(response)
})
.catch(e => {
   console.error(e)
});
