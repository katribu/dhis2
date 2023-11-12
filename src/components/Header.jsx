export default function Header({onFilter}){

    function handleFilter(e){
        onFilter(e.target.value)
    }
    
    return (
        <header className="flex justify-around p-3 border-b-white border-b-solid border-b-2 w-4/5 content-center text-center m-auto">
            <div>
                <h1 className="text-5xl font-extrabold"> DHIS2 Dashboard</h1>
            </div>

            <div>
            <p className="text-lg"> Choose Type: </p>
                <select
                onChange={handleFilter}
                placeholder="Choose Type"
                className="text-stone-950 mt-2 p-2 hover:cursor-pointer"
                >
                <option value="">All</option>
                <option value="visualization">Visualization</option>
                <option value="text">Text</option>
                <option value="map">Map</option>
                </select>
            </div>
        </header>

    )

}