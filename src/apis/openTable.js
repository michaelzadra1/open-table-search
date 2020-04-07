import axios from 'axios';

const OPEN_TABLE_OPEN_URL = 'http://opentable.herokuapp.com/api';

export default axios.create({
	baseURL: OPEN_TABLE_OPEN_URL
});
