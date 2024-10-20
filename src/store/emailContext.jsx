import { createContext, useReducer, useEffect, useMemo, useState } from "react";


export const EmailContext = createContext({
    emails: [],
    favorite: [],
    read: [],
    filter: undefined,
    updateEmails: () => {},
    updatefavoriteEmails: () => {},
    updateReadEmails: () => {},
    updateFilter: () => {}
})
  
 const emailReducer = (state, action) => {
    const { type, payload } = action;
  
    if(type === 'UPDATE_EMAILS'){
        return {
            ...state,
            emails: payload,
        }
    }

    
  if(action.type === 'UPDATE_FAVORITE_EMAILS'){


    let idExists = state.favorite.includes(payload);
        if(!idExists){
            const updatedFavoriteEmails = [...state.favorite, payload];
            return {
                ...state,
                favorite: updatedFavoriteEmails,
            };
        }
  }

    if(type === 'UPDATE_READ_EMAILS'){
        let idExists = state.read.includes(payload);
        if(!idExists){
            const updatedReadEmails = [...state.read, payload]
            return {
                ...state, 
                read: updatedReadEmails
            }
        }
    }

    if(type === 'UPDATE_FILTER'){
        return{
            ...state,
            filter: payload
        }
    }
    return state;
};
  

export const EmailsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(emailReducer, { emails: [], favorite: [], read: [], filter: undefined});
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://flipkart-email-mock.now.sh/');
                const data = await response.json();
                handleUpdateEmails(data.list);
                // dispatch({ type: 'UPDATE_EMAILS', payload: data.list});
            }catch (err) {
                console.log('Error fetching emails: ',err)
            }finally{
                setIsLoading(false)
            }
            
        }

        const loadStoredState = () => {
            const storedFavorite = localStorage.getItem('favorite');
            const storedRead = localStorage.getItem('read');

            if(storedFavorite && storedFavorite.length > 0){
                JSON.parse(storedFavorite).forEach(id => {
                    handleUpdateFavoriteEmails(id)
                })  
            }
            if(storedRead && storedRead.length > 0){
                JSON.parse(storedRead).forEach(id => {
                    handleUpdateReadEmails(id)
                })
            }
        }

        loadStoredState();
        fetchData();
    }, [])

    const handleUpdateEmails = async (emailList) => {

        console.log('updating emails');
        dispatch({
            type: 'UPDATE_EMAILS',
            payload: emailList ,
        })
    };

    const handleUpdateFavoriteEmails = async (id) => {
        dispatch({
            type: 'UPDATE_FAVORITE_EMAILS',
            payload: id
        })
        const updateFavorite = [...state.favorite];

        if(!updateFavorite.includes(id)) {
           updateFavorite.push(id);
        }   
        localStorage.setItem('favorite', JSON.stringify(updateFavorite)) 
    }

    const handleUpdateReadEmails = async (id) => {
        dispatch({
            type: 'UPDATE_READ_EMAILS',
            payload: id
        })
        const updateRead = [...state.read];
        if(!updateRead.includes(id)) {
            updateRead.push(id)
        }
        localStorage.setItem('read', JSON.stringify(updateRead))
       
    }

    const handleUpdateFilter = async (filter) => {
        dispatch({
            type: 'UPDATE_FILTER',
            payload: filter
        })
    }
  const contextValue = useMemo(() => ({
    emails: state.emails,
    favorite: state.favorite,
    read: state.read,
    filter: state.filter,
    updateEmails: handleUpdateEmails,
    updatefavoriteEmails: handleUpdateFavoriteEmails,
    updateReadEmails: handleUpdateReadEmails,
    updateFilter: handleUpdateFilter
}), [state.emails, isLoading, state.filter]);

  return <EmailContext.Provider value={contextValue}>
    {children}
    </EmailContext.Provider>;
};