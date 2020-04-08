import axios from 'axios';

const OPEN_TABLE_OPEN_URL = 'https://opentable.herokuapp.com/api';

export default axios.create({
	baseURL: OPEN_TABLE_OPEN_URL
});
