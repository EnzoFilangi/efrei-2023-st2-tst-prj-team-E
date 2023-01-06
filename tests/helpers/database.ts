import axios from "axios";

export async function resetDatabase(){
    await axios.post('https://e.hr.dmerej.info/reset_db');
}