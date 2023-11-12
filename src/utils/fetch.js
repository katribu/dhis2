const API_URL = `https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5`


export async function getMainDashboardNames(){
    const response = await fetch(`${API_URL}/dashboards.json`)
    const data = await response.json()
    return data;
}

export async function getDashboardDetailsById(id){
    const response = await fetch(`${API_URL}/${id}.json`)
    const data = await response.json()
    return data;
}