import React from "react";
import { useEffect, useState } from "react";

const SearchContext = React.createContext()

function SearchContextProvider(props){

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState()
    const [mainListData, setMainListData] = useState()
    const [currentPage, setCurrentPage] = useState(0)

    function nextPage(){
        setCurrentPage(prevPage=>prevPage+1)
    }
    function prevPage(){
        setCurrentPage(prevPage=>prevPage-1)
    }

    useEffect(()=>{
        async function fetchData(){
            setIsLoading(true)
            fetch(`https://hn.algolia.com/api/v1/search?query=&page=${currentPage}`).then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error('Something went wrong');
                }
              })
              .then((data) => {
                setMainListData(data)
                setIsLoading(false)
              })
              .catch((error) => {
                setIsError(true)
              });
            // setIsLoading(true)
            // const response = await fetch(`https://hn.algolia.com/api/v1/search?query=&page=${currentPage}`)

            // if(response.ok){
            //     const data = await response.json()
            //     setMainListData(data)
            //     setIsLoading(false)
            //     console.log(response)
            // }
            
            // else{
            //     console.log(response)
            //     setIsError(true)
            // }
        }
        fetchData();
    },[currentPage])

    return(
        <SearchContext.Provider value={{mainListData,
                                        isLoading,
                                        isError,
                                        nextPage, 
                                        prevPage,
                                        currentPage}}>
            {props.children}
        </SearchContext.Provider>
    )
}

export {SearchContextProvider, SearchContext}