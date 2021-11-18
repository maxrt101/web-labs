import axios from "axios"

const restUrl = "http://localhost:5000" 

export var getCars = () => axios.get(restUrl + "/api/car")
export var getCar = (id) => axios.get(restUrl + "/api/car", {params: {id: id}})
