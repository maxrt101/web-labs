import axios from "axios"

const restUrl = "http://localhost:5000" 

export var getCars = () => axios.get(restUrl + "/api/car")
export var getCar = (id) => axios.get(restUrl + "/api/car", {params: {id: id}})
export var getFilteredBy = (by) => axios.get(restUrl + "/api/filter?by=" + by)
export var getSearched = (search) => axios.get(restUrl + "/api/search?" + search)
