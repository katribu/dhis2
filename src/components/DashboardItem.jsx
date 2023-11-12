import { useState,useEffect } from "react"
import { getMainDashboardNames, getDashboardDetailsById } from "../utils/fetch"
import { FaStar, FaSortDown, FaGlobe, FaListAlt, FaChartBar } from "react-icons/fa";

export default function DashboardItem({filter}){


    const [mainDashboardInfo, setMainDashboardInfo] = useState([])
    const [dashboardsDetails, setDashboardsDetails] = useState([])
    const [favoriteCategories, setFavoriteCategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);
    
    useEffect(() => {
        async function fetchData() {
        const dashboardObject = await getMainDashboardNames();
        const mainDashboardArray = dashboardObject.dashboards || [];
        setMainDashboardInfo(mainDashboardArray);
    
        //Retrieve favoriteCategories from local storage
          const retrievedFavorites = JSON.parse(localStorage.getItem('favoriteCategories')) || [];
          setFavoriteCategories(retrievedFavorites);
        }
        
        fetchData();
    }, []);
    
    // Fetch dashboard details when mainDashboardInfo updates
    useEffect(() => {
        async function dashboardDetails() {
          const dashboardIds = mainDashboardInfo?.map((item) => item.id);
          const detailsArray = [];
          
          for (let i = 0; i < dashboardIds.length; i++) {
              const details = await getDashboardDetailsById(dashboardIds[i]);
              detailsArray.push({
                  displayName: details.displayName,
                  id: details.id,
                  dashboardItems: details.dashboardItems,
            });
          }
    
          setDashboardsDetails(detailsArray);
        }
        
        // Call dashboardDetails() when mainDashboardInfo is available
        if (mainDashboardInfo.length > 0) {
            dashboardDetails();
        }
    }, [mainDashboardInfo]);

    const handleClick = (categoryId) => {
        if(expandedCategory === categoryId){
            setExpandedCategory(null)
        }else {
            setExpandedCategory(categoryId)
        }
        
    }

    
    const handleFavoriteCategory = (categoryId) => {
      if (favoriteCategories.includes(categoryId)) {
          // If the category is already a favorite, remove it
          setFavoriteCategories(favoriteCategories.filter((id) => id !== categoryId));
        } else {
            // Add the category to the favorites
            setFavoriteCategories([...favoriteCategories, categoryId]);
        }
        
        // localStorage.setItem('favoriteCategories', JSON.stringify(favoriteCategories));
    };
    
        
    useEffect(() => {
        let retrievedFavorites = JSON.parse(localStorage.getItem('favoriteCategories'))
        if (Array.isArray(retrievedFavorites)) {
            setFavoriteCategories(retrievedFavorites);
        }
    },[])
                
                
    useEffect(()=>{
        let savedFavorites = JSON.stringify(favoriteCategories)
        localStorage.setItem('favoriteCategories', savedFavorites);
    },[favoriteCategories])
                
    const renderDashboardDetails = dashboardsDetails?.map(category => {
    const items = category.dashboardItems?.map((item,i) => {
        if (!filter || item.type.toLowerCase().includes(filter.toLowerCase())){

            if(item.type === "VISUALIZATION"){
             return (
                 <p key={i} className="flex items-center m-5"><FaChartBar className="mr-4"/> {item.visualization.name.split(": ")[1]}</p>
             )
            }else if(item.type === "TEXT"){
             return (
                 <p key={i} className="ml-5"><FaListAlt className="mr-6"/>{item.text}</p>
             )
            }else if(item.type === "MAP"){
             return (
                 <p key={i} className="flex items-center m-5"><FaGlobe className="mr-4"/> {item.map.name.split(": ")[1]}</p>
             )
            }
        }
    })

   
    return (
        <div key={category.id}>
            <div className="flex items-center m-5 bg-zinc-600 p-4">
                <h3 className="text-xl grow font-semibold">{category.displayName}</h3>  
                <div onClick={() => handleFavoriteCategory(category.id)} className="grow-0 px-5 hover:cursor-pointer">
                    <FaStar style={{color: favoriteCategories.includes(category.id)? "yellow" : ""}} /> 
                </div>
                <div onClick={() => handleClick(category.id)} className="hover:cursor-pointer"><FaSortDown/> </div>
            </div>

            {expandedCategory === category.id &&
                <div>
                {items}
                </div>
            }
        </div>
    )
})

// ************* FINAL RETURN ******************** //
    return (
        <div className="lg:w-3/5 m-auto my-10 p-2 bg-zinc-800">
         {renderDashboardDetails}
        </div>
    )
}