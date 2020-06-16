import axios from 'axios';

const axiosInstance = axios.create({
                            baseURL: "https://burgerbuilder-369a2.firebaseio.com/"
                        });


export default axiosInstance;